<script lang="ts">
	import Axios, { type AxiosProgressEvent } from 'axios';
	import Carousel from '$lib/components/Carousel.svelte';
	import RemoveIcon from '$lib/assets/icons/Remove.svg?raw';
	import LogoIcon from '$lib/assets/icons/logo1.svg?raw';
	import { generatePresignedLink } from '$lib/generatePresignedUrl';
	import { generateIdFromEntropySize } from 'lucia';
	import { dummyData, type DummyData } from '$lib/dummyData';
	import NewFileUpload from '$lib/components/NewFileUpload.svelte';
	import FilterForm from '$lib/components/FilterForm.svelte';
	import { filterObjects } from '../../../utils/filterData';
	import { toastStore } from '$lib/stores/toastStores';
	import { state as headerState } from '$lib/stores/headerStore';
	// const arr = [1, 2, 3]; //will be replaced by data from ai-model api

	let progress = 0;
	let state: '' | 'uploading' | 'analysing' | 'success' | 'error' = '';
	let inputText = '';
	let file: File | null;

	const sessionId = generateIdFromEntropySize(6);
	// let arr: DummyData[] = dummyData;
	// let backUpData: DummyData[] = dummyData;
	let arr: DummyData[] = [];
	let backUpData: DummyData[] = [];

	const handleFileInput = async (e: Event | DragEvent) => {
		e.preventDefault();

		const files =
			'dataTransfer' in e
				? (e as DragEvent).dataTransfer?.files
				: (e.target as HTMLInputElement)?.files;

		if (!files || !files.length) return;
		const selectedFiles = Array.from(files) as File[];
		file = selectedFiles[0];
	};

	const submit = async () => {
		console.log('submitting');
		if (!file) return;
		try {
			//* file upload phase *//
			state = 'uploading';
			const presignedUrl = await generatePresignedLink(file, sessionId);
			// console.log('url', presignedUrl)
			if (!presignedUrl || !presignedUrl.length) {
				state = '';
				return;
			}
			const uploadResponse = await Axios.put(presignedUrl, file, {
				signal: AbortSignal.timeout(20000),
				onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					const { loaded, total } = progressEvent;
					const loadingProgress = Math.floor((loaded * 100) / (total || 10));
					progress = loadingProgress;
				}
			});

			// console.log(
			// 	'file uploaded',
			// 	uploadResponse?.config?.url && uploadResponse.config.url.split('?')[0]
			// );

			if (!uploadResponse?.config?.url) return;
			//* fetch download url and make ai call?*//
			state = 'analysing';
			const res = await fetch('api/download-url', {
				method: 'POST',
				body: JSON.stringify({
					filename: file.name,
					inputText,
					s3Url: uploadResponse.config.url.split('?')[0],
					sessionId,
					expiresIn: 2000
				})
			});

			//*
			const fullRes = (await res.json()) as DummyData[];
			// console.log('body', fullRes);
			// fullRes.sort((a, b) => Date.parse(b.published_date) - Date.parse(a.published_date));
			if (Array.isArray(fullRes)) {
				arr = fullRes;
				backUpData = fullRes;
				headerState.setState('uploaded');
				state = 'success';
				toastStore.alert(`Found ${arr.length} matches! Swipe to view more`, {
					position: 'bottom-end'
				});
				// console.log('user files', arr);
			} else state = 'error';
		} catch (error) {
			state = 'error';
			console.log('error', error);
		}
		progress = 0; //reset progress
	};

	const handleTextChange = (text: string) => {
		inputText = text;
	};

	const triggerModal = () => {
		(document.getElementById('filter-modal') as HTMLDialogElement).showModal();
	};

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		if (!e.target) return;
		const formData = new FormData(e.target as HTMLFormElement);
		const filterForm = Object.fromEntries(formData);
		// console.log('e', filterForm);
		const newFilter = {
			clearance_required: filterForm.clearance === 'true' ? true : false,
			has_remote: filterForm.has_remote === 'true' ? true : false,
			experience: filterForm.experience.toString(),
			min_salary: filterForm.min_salary.toString()
		};
		// console.log('new filter', newFilter);
		const filteredData = filterObjects(backUpData, newFilter);
		// console.log('filtered data', filteredData);
		if (!filteredData.length) {
			toastStore.alert(`Found ${filteredData.length} matches! Please reset`, {
				position: 'bottom-end'
			});
		} else toastStore.alert(`Found ${filteredData.length} matches!`, { position: 'bottom-end' });

		arr = filteredData;
		(document.getElementById('filter-modal') as HTMLDialogElement).close();
	};

	const handleReset = () => {
		arr = backUpData;
	};
</script>

<div class="relative flex flex-col p-2">
	{#if state === ''}
		<NewFileUpload {handleFileInput} {inputText} {handleTextChange} />
		<!-- <FileUpload {handleFileInput} {inputText} {handleTextChange} /> -->
		{#if file}
			<div
				class="flex md:mx-auto w-full md:w-2/3 md:p-6 p-2 bg-white shadow-xl rounded-xl justify-between items-center mt-4"
			>
				<p class="text-ellipsis overflow-hidden">
					{file?.name}
				</p>
				<button
					class="btn bg-red-400 hover:bg-red-500 btn-circle btn-sm ml-auto"
					on:click={() => (file = null)}
				>
					{@html RemoveIcon}
				</button>
			</div>
			<button class="btn btn-primary mx-auto mt-4" on:click={submit}>Submit</button>
		{/if}
	{:else if state === 'uploading'}
		<div class="flex flex-col mt-44">
			<progress class="progress progress-warning w-2/3 mx-auto flex" value={progress} max="100" />
			<p class="mx-auto text-ellipsis overflow-hidden text-lg">Uploading {file?.name}</p>
		</div>
	{:else if state === 'analysing'}
		<img src="/logo1.svg" alt="analysing" class="animate-bounce w-52 h-52 mx-auto mt-12" />
		<p class="text-center text-2xl font-bold animate-pulse">Analysing...</p>
	{:else if state === 'success'}
		{#if !arr.length}
			<p class="text-3xl text-center mt-16">No matches found</p>
			<button class="btn btn-secondary mx-auto mt-2" on:click={() => (state = '')}
				>Try Again?</button
			>
		{:else}
			<Carousel {arr} {triggerModal} {handleReset} />
			<FilterForm {handleSubmit} />
		{/if}
	{:else if state === 'error'}
		<p class="text-3xl text-center mt-16">Something went wrong</p>
		<button class="btn btn-secondary mx-auto mt-4" on:click={() => (state = '')}
			>Try Again?
		</button>
		<p class="text-xl text-center mt-2">Please upload a valid pdf</p>
	{/if}
	<!-- <Carousel {arr} {triggerModal} {handleReset} />
	<FilterForm {handleSubmit} /> -->
</div>

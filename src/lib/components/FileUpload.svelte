<script lang="ts">
	import UploadIcon from './Icons/UploadIcon.svelte';
	export let handleFileInput: (e: any) => void;
	export let inputText: string;
	export let handleTextChange: (text: string) => void;

	$: handleTextChange(inputText);

	let minRows = 1;
	let maxRows = 20;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="flex flex-col">
	<div class="container">
		<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{inputText +
				'\n'}</pre>

		<textarea placeholder="Add additional details about yourself here" bind:value={inputText}
		></textarea>
		<label
			class="btn btn-sm md:flex hidden btn-primary absolute top-0 right-0 m-2.5"
			for="fileUpload"
		>
			<input type="file" class="hidden" id="fileUpload" on:change={handleFileInput} />
			<UploadIcon />
			Upload Resume PDF
		</label>
	</div>
	<label class="btn btn-sm flex md:hidden btn-primary mx-auto mt-4" for="fileUpload">
		<input type="file" class="hidden" id="fileUpload" on:change={handleFileInput} />
		<UploadIcon />
		Upload Resume PDF
	</label>
</div>

<!-- <div class="container">
		<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{inputText +
				'\n'}</pre>

		<textarea placeholder="Add additional details about yourself here" bind:value={inputText}
		></textarea>
		<label
			class="btn btn-sm md:flex hidden btn-primary absolute top-0 right-0 m-2.5"
			for="fileUpload"
		>
			<input type="file" class="hidden" id="fileUpload" on:change={handleFileInput} />
			<UploadIcon />
			Upload Resume PDF
		</label>
	</div> -->
<!-- <div
	class="flex flex-1 items-center justify-center md:w-2/3 p-4 mx-auto"
	role="button"
	aria-label="File Drop Area. Press Enter to activate"
	tabindex="0"
	on:drop={handleFileInput}
	on:dragover={handleDragOver}
	on:dragleave={handleDragOver}
>
	<label
		for="dropzone-file"
		class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
	>
		<div class="flex flex-col items-center justify-center pt-5 pb-6">
			<svg
				class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 16"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
				/>
			</svg>
			<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click/Tap to upload</span> or drag and drop your resume
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">PDF</p>
		</div>
		<input id="dropzone-file" type="file" class="hidden" on:change={handleFileInput} />
	</label>
</div> -->

<style>
	.container {
		position: relative;
		width: 100%;
		display: flex;
		margin: auto;
		padding: 0em;
		margin-top: 6em;
	}

	pre,
	textarea {
		font-family: inherit;
		padding: 1em;
		box-sizing: border-box;
		border: 1px solid #eee;
		line-height: 1.2;
		overflow-y: scroll;
	}

	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
	}
</style>

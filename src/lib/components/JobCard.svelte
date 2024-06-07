<script lang="ts">
	import type { DummyData } from '$lib/dummyData';
	import sanitizeHtml from 'sanitize-html';

	export let slide: DummyData;

	$: job_description = sanitizeHtml(slide.job_description);
	$: clearance = slide?.clearance_required ? 'Yes' : 'No';

	// let humanReadable: string;
	$: humanReadable = slide.published_date
		? new Date(slide.published_date).toLocaleString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour12: true
			})
		: 'Not specified';
</script>

<div class="embla__slide">
	<div class="bg-white shadow-md rounded-2xl max-w-4xl w-full mx-auto p-6 md:flex">
		<!-- paste here -->
		<div class="p-2 md:flex justify-center gap-4 w-full hidden">
			<div class="flex flex-col prose md:w-1/2">
				<h2 class="text-lg font-semibold text-gray-800">
					{slide.title}
					<span class="badge badge-secondary">{slide.has_remote ? 'Remote' : 'On-site'}</span>
				</h2>

				{#if slide?.max_salary && slide?.max_salary !== null && slide?.min_salary !== null}
					<p class="my-0">
						Salary: {slide.min_salary.toLocaleString()} - {slide.max_salary.toLocaleString()}
						{slide.salary_currency}
					</p>
				{:else}
					<p class="my-0">Salary: Not specified</p>
				{/if}

				{#if slide?.experience}
					<p class="my-0">Experience: {slide.experience}</p>
				{:else}
					<p class="my-0">Experience: Not specified</p>
				{/if}
				<!-- {#if slide.has_remote}
					<p class="my-0">{slide.has_remote ? 'Remote' : 'On-site'}</p>
				{/if} -->
				{#if slide?.published_date}
					<p class="my-0">Date published: {humanReadable}</p>
				{/if}

				<p class="my-0">Location: {slide.location}</p>
				{#if slide?.clearance_required}
					<p class="my-0">Clearance Required: {clearance}</p>
				{/if}
				{#if slide?.company_linkedin_url}
					<a class="my-0" href={slide.company_linkedin_url} target="_blank"> LinkedIn </a>
				{/if}
				{#if slide?.job_posting_url}
					<a
						class="btn btn-primary my-2 rounded-xl hidden md:flex"
						href={slide.job_posting_url}
						target="_blank"
					>
						Apply now
					</a>
				{/if}
			</div>

			<!-- <div class="divider divider-horizontal" /> -->

			<div class="flex flex-col md:w-1/2">
				{#if slide?.company_logo}
					<a href={slide.company_website_url} target="_blank">
						<img
							alt="company logo"
							src={slide.company_logo}
							class="hidden md:block mx-auto my-0 max-h-48 outline outline-slate-200 p-2"
						/>
					</a>
				{/if}
				<p class="my-0 mx-auto">
					<a class="text-gray-600" href={slide.company_website_url} target="_blank"
						>{slide.company_name}</a
					>
				</p>
			</div>
		</div>
		<div class="md:hidden">
			<div class="flex">
				<div class="flex flex-col">
					<h2 class="text-lg font-semibold text-gray-800">
						{slide.title}
						<span class="badge badge-secondary">{slide.has_remote ? 'Remote' : 'On-site'}</span>
					</h2>
					{#if slide?.max_salary && slide?.max_salary !== null && slide?.min_salary !== null}
						<p class="my-0">
							Salary: {slide.min_salary.toLocaleString()} - {slide.max_salary.toLocaleString()}
							{slide.salary_currency}
						</p>
					{:else}
						<p class="my-0">Salary: Not specified</p>
					{/if}

					{#if slide?.experience}
						<p class="my-0">Experience: {slide.experience}</p>
					{:else}
						<p class="my-0">Experience: Not specified</p>
					{/if}
					<!-- {#if slide.has_remote}
						<p class="my-0">{slide.has_remote ? 'Remote' : 'On-site'}</p>
					{/if} -->
					{#if slide?.published_date}
						<p class="my-0">Date published: {humanReadable}</p>
					{/if}
					<p class="my-0">
						Company:
						<a class="text-gray-600" href={slide.company_website_url} target="_blank"
							>{slide.company_name}</a
						>
					</p>
					<p class="my-0">Location: {slide.location}</p>
					{#if slide?.clearance_required}
						<p class="my-0">Clearance Required: {clearance}</p>
					{/if}
					{#if slide?.company_linkedin_url}
						<a class="my-0" href={slide.company_linkedin_url} target="_blank"> LinkedIn </a>
					{/if}
				</div>
				{#if slide?.company_logo}
					<a href={slide.company_website_url} target="_blank">
						<img
							alt="company logo"
							src={slide.company_logo}
							class="mx-auto my-0 outline outline-slate-100 p-1 max-h-48"
						/>
					</a>
				{/if}
			</div>
			{#if slide?.job_posting_url}
				<div class="w-full flex">
					<a class="btn btn-primary my-2 mx-auto" href={slide.job_posting_url} target="_blank">
						Apply now
					</a>
				</div>
			{/if}
		</div>

		<!-- paste here -->
	</div>
	<div class=" shadow-md rounded-xl max-w-4xl w-full mx-auto p-6 md:flex prose bg-amber-50 mt-4">
		<div class="flex-1 p-4 max-h-screen overflow-scroll">
			{@html job_description}
		</div>
	</div>
</div>

<style>
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}
	/* :root {
		--shadow: #e7a304;
		--scrollbarBG: #eee;
		--thumbBG: #f0f0f0;
	}
	::-webkit-scrollbar {
		width: 16px;
	}
	::-webkit-scrollbar-track {
		background: var(--scrollbarBG);
	}
	::-webkit-scrollbar-thumb {
		background-color: var(--thumbBG);
		box-shadow:
			0 -100vh 0 100vh var(--shadow),
			0 0 15px 5px black;
	} */
</style>

<script lang="ts">
	import type { EmblaCarouselType } from 'embla-carousel';
	import embla from '$lib/index';
	import JobCard from './JobCard.svelte';
	import ChevronLeftIcon from '$lib/assets/icons/ChevronLeftIcon.svg?raw';
	import ChevronRightIcon from '$lib/assets/icons/ChevronRightIcon.svg?raw';
	import FilterIcon from '$lib/assets/icons/Filter.svg?raw';
	import RestoreIcon from '$lib/assets/icons/RestoreIcon.svg?raw';
	import type { DummyData } from '$lib/dummyData';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let arr: DummyData[];
	export let triggerModal: () => void;
	export let handleReset: () => void;

	const carousel = writable<EmblaCarouselType>();

	let selected: number = 0;

	function nextCard() {
		$carousel?.canScrollNext() && $carousel?.scrollNext();
	}
	function previousCard() {
		$carousel?.canScrollPrev() && $carousel?.scrollPrev();
	}
	const select = (index: number | string) => () => {
		if (typeof index === 'number') $carousel?.scrollTo(index);
	};

	const onSelect = () => {
		selected = $carousel?.selectedScrollSnap();
	};

	// $: {
	// 	console.log('carousel', selected);
	// }

	let displayValues = [0, 1, 2, 3, 4, 5, 6, '...', arr.length];

	$: {
		// Only update displayValues based on arr.length and selected index
		if (arr.length < 10) {
			displayValues = [...Array(arr.length).keys()];
		} else if (selected < 6) {
			displayValues = [0, 1, 2, 3, 4, 5, 6, '...', arr.length - 1];
		} else if (selected >= 6 && selected <= arr.length - 5) {
			// Simplify logic to update displayValues only once if condition is met
			const needsUpdate =
				displayValues[2] === selected || selected === displayValues[displayValues.length - 3];
			if (needsUpdate || displayValues.filter((i) => i === '...').length <= 1) {
				displayValues = [
					0,
					'...',
					selected - 1,
					selected,
					selected + 1,
					selected + 2,
					selected + 3,
					selected + 4,
					selected + 5,
					'...',
					arr.length - 1
				];
			}
		} else if (selected >= arr.length - 5) {
			displayValues = [
				0,
				'...',
				arr.length - 5,
				arr.length - 4,
				arr.length - 3,
				arr.length - 2,
				arr.length - 1
			];
		}
	}
</script>

<div class="flex w-full mt-4">
	<div class="md:hidden">
		<button class="btn btn-circle btn-primary" on:click={previousCard}>
			<div class="pl-0">
				{@html ChevronLeftIcon}
			</div>
		</button>
		<button class="btn btn-circle btn-primary" on:click={nextCard}>
			{@html ChevronRightIcon}
		</button>
	</div>
	<div class="ml-auto md:mx-auto">
		<button class=" btn btn-primary" on:click={handleReset}>
			{@html RestoreIcon}
			Reset
		</button>
		<div class="tooltip tooltip-top" data-tip="filter">
			<button class=" btn btn-primary" on:click={triggerModal}>
				{@html FilterIcon}
			</button>
		</div>
	</div>
</div>

<div class="relative py-4" transition:fade>
	<div class={`hidden md:block`}>
		<button
			class={`left-10 btn btn-primary btn-circle p-0 m-0 absolute top-36 z-10 ${selected === 0 ? 'hidden' : 'md:block'}`}
			on:click={previousCard}
		>
			<!-- <ChevronLeft class="h-8 w-8 pl-2" on:click={previousCard} /> -->
			<div class="pl-2">
				{@html ChevronLeftIcon}
			</div>
		</button>
		<button
			class={`btn btn-primary btn-circle absolute right-10 top-36 z-10 ${selected === arr.length - 1 ? 'hidden' : 'md:block'}`}
			on:click={nextCard}
		>
			<div class="pl-2.5">
				{@html ChevronRightIcon}
			</div>
			<!-- <ChevronRightIcon /> -->
			<!-- <ChevronRight class="h-9 w-9 pl-3" /> -->
		</button>
	</div>
	<div class="embla">
		<!-- // @ts-nocheck -->
		<div class="embla__viewport" use:embla={{ store: carousel }} on:e-select={onSelect}>
			<div class="embla__container">
				{#each arr as slide}
					<JobCard {slide} />
				{/each}
			</div>
		</div>
	</div>
	<div class=" px-8 flex justify-center items-center md:gap-4 gap-2">
		{#if displayValues !== undefined}
			{#each displayValues as item, index}
				{#if item === '...'}
					<p>...</p>
				{:else}
					<button
						class={`btn md:btn-md btn-xs btn-circle btn-secondary grid place-items-center ${selected === item && 'bg-gradient-to-br from-orange-500 to-orange-300'}`}
						on:click={select(item)}
					>
						{item}
					</button>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
	.pagination button {
		margin: 0 2px;
	}
	.pagination .active {
		font-weight: bold;
	}
	.embla {
		overflow: hidden;
		position: relative;
		z-index: 0;
	}
	.embla__container {
		display: flex;
	}
	/* .embla__dots {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: center;
		margin-right: calc((2.6rem - 1.4rem) / 2 * -1);
	}
	.embla__dot {
		-webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
		-webkit-appearance: none;
		appearance: none;
		background-color: transparent;
		touch-action: manipulation;
		display: inline-flex;
		text-decoration: none;
		cursor: pointer;
		border: 0;
		padding: 0;
		margin: 0;
		width: 2.6rem;
		height: 2.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}
	.embla__dot:after {
		box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		content: '';
	}
	.embla__dot--selected:after {
		box-shadow: inset 0 0 0 0.2rem var(--text-body);
	} */
</style>

<script lang="ts">
	import { state } from '../stores/headerStore';

	export let userData;
	// console.log('user data', userData);
</script>

<header
	class="px-4 py-2 dark:bg-gray-800 h-full w-full bg-secondary-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 border border-gray-100 navbar relative"
>
	<div class="navbar-start">
		<div class="dropdown">
			<!-- <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
			</div> -->
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- <ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/">Item 1</a></li>
				<li>
					<a href="/">Parent</a>
					<ul class="p-2">
						<li><a href="/">Submenu 1</a></li>
						<li><a href="/">Submenu 2</a></li>
					</ul>
				</li>
				<li><a href="/">Item 3</a></li>
			</ul> -->
		</div>

		<a class="btn btn-ghost text-xl w-16" href="/">
			<img src="/soon (1).png" alt="new logo" class="absolute w-16 h-16 p-0" />
			<!-- <div class="h-10 w-10">
				{@html ChakraIcon}
			</div> -->
			<!-- <img src="/chakraImage.png" alt="new logo" class=" w-10 h-10 p-0 rounded-xl" /> -->
		</a>
	</div>

	<div class="navbar-center lg:flex">
		<ul class="menu menu-horizontal px-1">
			<div class="md:text-3xl text-xl">Career Chakra</div>
			<!-- <img src="./textImage.png" alt="career chakra" class="w-full h-6" /> -->
		</ul>
	</div>
	<div class="navbar-end">
		<a class="btn btn-primary rounded-xl mr-4 hidden md:flex" href="/google"
			>{$state === 'uploaded' ? 'New Upload' : 'Try us now'}</a
		>
		{#if !userData?.picture}
			<a class="btn rounded-xl btn-primary" href="/google">Login</a>
		{:else}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-circle btn-secondary">
					<div class="text-xl">{userData.name[0]}</div>
					<!-- <img class="w-10 h-10 rounded-full" src={userData?.picture} alt="avatar" /> -->
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a href="/upload">Upload Resume/CV PDF</a></li>
					<li><a href="/api/sign-out">Log out</a></li>
				</ul>
			</div>
		{/if}
	</div>
</header>
<!-- <div
	class="flex justify-between items-center h-full w-full bg-secondary-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-100"
>

	<a href="/" class="md:w-full md:flex md:justify-center">
		<div class="flex md:place-content-center items-center my-2">

			<p class="text-3xl font-semibold md:text-center font-mono" data-testid="stream-bin">
				Chakra
			</p>
		</div>
	</a>
	<IconHeart />

	<button name="information-button" class="btn md:hidden block text-lg">
		<iconify-icon icon="mdi:home"></iconify-icon>
	</button>
</div> -->

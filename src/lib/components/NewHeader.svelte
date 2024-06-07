<script lang="ts">
	// import logo from '$lib/assets/icons/logo.svg?raw';
	// import logoOne from '$lib/assets/icons/logo1.svg?raw';

	export let userData;
	// console.log('user data', userData.picture);
</script>

<header class="text-gray-600 body-font">
	<div
		class="container mx-auto flex flex-wrap py-5 px-4 md:px-20 flex-col md:flex-row items-center"
	>
		<!-- Navigation links -->
		<nav
			class="lg:w-2/5 md:mb-0 sm:mb-0 mb-5 flex-wrap items-center text-base md:ml-auto hidden md:flex"
		>
			<!-- <a class="mr-5 hover:text-gray-900" href="/">Terms and Conditions</a> -->
			<!-- <a class="mr-5 hover:text-gray-900" href="help@careerchakra.com">Support</a> -->
			<a
				class="mr-5 hover:text-gray-900"
				on:click|preventDefault
				href="mailto:help@careerchakra.com">Support</a
			>
		</nav>
		<!-- Logo -->
		<a
			class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
			href="/"
		>
			<!-- <div class="max-h-14 max-w-14"> -->
			<!-- {@html logo} -->
			<!-- </div> -->
			<img src="/logo.svg" class="h-20 w-20" alt="logo" />
			<span class=" text-xl">Career chakra</span>
		</a>
		<!-- Button -->
		<div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
			{#if !userData?.picture}
				<a href="/google">
					<button
						class="inline-flex text-white bg-yellow-500 border-0 items-center py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-md"
					>
						Login
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-4 h-4 ml-1"
							viewBox="0 0 24 24"
						>
							<path d="M5 12h14M12 5l7 7-7 7"></path>
						</svg>
					</button>
				</a>
			{:else}
				<div class="dropdown md:dropdown-end dropdown-bottom dropdown-center">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<div class="border-0 py-2 px-6" tabindex="0">
						<img
							class="chat-image w-10 h-10 rounded-full cursor-pointer"
							src={userData?.picture}
							alt="avatar"
						/>
					</div>
					<!-- <div
					tabindex="0"
					role="button"
					class="inline-flex text-white bg-yellow-500 border-0 items-center py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-md"
				>
					Login
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="w-4 h-4 ml-1"
						viewBox="0 0 24 24"
					>
						<path d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				</div> -->
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul
						tabindex="0"
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li><a href="/upload">Upload Resume</a></li>
						<li><a href="/api/sign-out">Sign out</a></li>
					</ul>
				</div>
			{/if}
		</div>
		<!-- <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
			<a href="/upload">
				<button
					class="inline-flex text-white bg-yellow-500 border-0 items-center py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-md"
					>Login
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="w-4 h-4 ml-1"
						viewBox="0 0 24 24"
					>
						<path d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				</button>
			</a>
		</div> -->
	</div>
</header>

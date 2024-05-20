<script lang="ts">
	import Button from '../button/Button.svelte';
	import aboutUs from './aboutUs.webp';
	import car from './car.webp';
</script>

<section id="aboutus" class="lg:h-dvh w-full flex flex-col lg:flex-row">
	<div
		class="h-full bg-white text-black flex flex-col items-start justify-center gap-8 xl:px-32 px-8 py-16"
	>
		<div class="font-semibold text-xl lg:text-4xl">About Us</div>
		<div class="font-semibold text-3xl lg:text-7xl text-green-500">
			Decentralized <br /> ridesharing
		</div>
		<div class="lg:text-xl text-lg">
			FuelDAO is a pioneering decentralized autonomous organization that offers eco-friendly
			transport services like electric scooter rentals, ride-sharing, and fuel-efficient vehicle
			leasing. We will be providing quality transport services to clients, starting with Barcelona
			and the surrounding area.
		</div>
		<div class="lg:text-xl text-lg">
			Built by a team that comes with 30+ years combined experience in Web3, FuelDAO aims to make
			your ride experience clean and simple.
		</div>
		<Button
			href="https://slender-catamaran-8e7.notion.site/FuelDAO-Whitepaper-8a43f3b69c04433fbc4499d25fd6aa28"
		>
			Our whitepaper
		</Button>
	</div>
	<div
		class="h-96 lg:h-full w-full lg:w-1/2 bg-center bg-cover shrink-0"
		style="background-image: url('{aboutUs}');"
	></div>
</section>
<section class="lg:h-dvh w-full flex lg:flex-row flex-col-reverse">
	<div
		class="lg:h-full h-96 bg-center bg-cover shrink-0 w-full lg:w-1/2"
		style="background-image: url('{car}');"
	></div>
	<div
		class="h-full w-full bg-white text-black flex flex-col items-start justify-center gap-12 lg:px-32 py-16 px-8"
	>
		<div class="flex items-start gap-4">
			<div class="flex items-center justify-center lg:h-12 lg:w-12 h-9">
				<div class="lg:h-6 lg:w-6 h-4 w-4 rounded-full bg-green-500"></div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="font-semibold lg:text-5xl text-3xl">Decentralized <br /> control</div>
				<div class="lg:text-2xl text-xl font-light leading-normal">
					Fully community-owned <br /> ridesharing fleet, powered by <br /> blockchain technology
				</div>
			</div>
		</div>
		<div class="flex items-start gap-4">
			<div class="flex items-center justify-center lg:h-12 lg:w-12 h-9">
				<div class="lg:h-6 lg:w-6 h-4 w-4 rounded-full bg-green-500"></div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="font-semibold lg:text-5xl text-3xl">Premium experience, <br /> guaranteed</div>
				<div class="lg:text-2xl text-xl font-light leading-normal">
					80% Premium Tesla cars, 20% <br /> high-end fuel cars; complete <br /> with 24/7 road assistance
					and insurance
				</div>
			</div>
		</div>
		<div class="flex items-start gap-4">
			<div class="flex items-center justify-center lg:h-12 lg:w-12 h-9">
				<div class="lg:h-6 lg:w-6 h-4 w-4 rounded-full bg-green-500"></div>
			</div>
			<div class="flex flex-col gap-2">
				<div class="font-semibold lg:text-5xl text-3xl">
					Sustainability, always <br /> available
				</div>
				<div class="lg:text-2xl text-xl font-light leading-normal">
					Unique AI algorithms, keeping <br /> a car available around you-<br /> always
				</div>
			</div>
		</div>
	</div>
</section>

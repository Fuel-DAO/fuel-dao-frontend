<script lang="ts">
	import Button from '../button/Button.svelte';
import hero from './hero.webp';
</script>

<section id="hero" class="h-dvh w-full flex items-start justify-start relative">
  <div class="xl:px-32 z-[2] px-8 pt-48">
    <div class="text-4xl xl:text-6xl font-semibold mb-10">
      Driving Shared <br /> Mobility Forward, <br /> Clean & Decentralized
    </div>
    <Button
      href="/collections"
      class="xl:text-2xl xl:px-8 xl:py-3">Invest Now</Button>
  </div>
	<div class="absolute inset-0 z-[1] overflow-hidden">
		<div
			class="h-full w-full lg:bg-cover bg-contain bg-no-repeat lg:bg-right bg-bottom scale-150 lg:scale-100 origin-bottom lg:origin-center"
			style="background-image: url('{hero}');"
		></div>
	</div>
</section>

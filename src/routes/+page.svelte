<script lang="ts">
	import MoveRight from 'lucide-svelte/icons/move-right';

	import { Button } from '$lib/components/ui/button/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

	import { browser } from '$app/environment';
	import { toast } from "svelte-sonner";

	import { useTrailingCursor } from "./stores";
	let useTrailingCursorValue:boolean = false;
	useTrailingCursor.subscribe(value => {
		useTrailingCursorValue = value;
	});

	import AlstonVideo from '$lib/assets/home/alston_square.mp4';
	import AlstonVideoCentered from '$lib/assets/home/alston_centered.mp4';

	import { onMount } from 'svelte';
	import { emojiCursor } from 'cursor-effects';

	function convertRemToPixels(rem: number) {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	let threshold: any;
	function animateLearnMoreArrow() {
		const arrow = document.getElementById('learnmore-arrow');
		if (!arrow) {
			return;
		}

		// Remove all the animations
		arrow.classList.remove('spin-arrow');
		arrow.classList.remove('arrow-rotate-down');

		threshold = setTimeout(function () {
			// Animate the arrow on mouse hover
			arrow.classList.remove('hidden');
			setTimeout(function () {
				arrow.classList.remove('visuallyhidden');
				arrow.classList.add('spin-arrow');
			}, 30);
			setTimeout(function () {
				arrow.classList.add('arrow-rotate-down');
			}, 380);
			clearTimeout(threshold);
		}, 150);
	}

	function clearLearnMoreArrowAnimation() {
		clearTimeout(threshold);
		const arrow = document.getElementById('learnmore-arrow');
		if (!arrow) {
			return;
		}

		arrow.classList.add('hidden');
		arrow.classList.add('visuallyhidden');
	}

	onMount(() => {
		const learnMoreButton = document.getElementById('learnmore-button');
		if (!learnMoreButton) {
			return;
		}
		const activeConditions = ['mouseenter', 'focus'];
		const inactiveConditions = ['mouseleave', 'blur'];

		// Add event listeners for the conditions
		activeConditions.forEach(condition => {
			learnMoreButton.addEventListener(condition, animateLearnMoreArrow);
		});
		inactiveConditions.forEach(condition => {
			learnMoreButton.addEventListener(condition, clearLearnMoreArrowAnimation);
		});


		// Add cursor effects to #research-focus once in a while
		const random = Math.random();
		// toast.success("Random number generated!", {
		// 	description: random.toString(),
		// 	action: {
		// 		label: "Nice!",
		// 		onClick: () => console.info("Nice!")
		// 	},
		// 	duration: 3000,
		// });
		if (random <= 0.1) { // set the chance here
			const researchFocus = document.querySelector("#research-focus") as HTMLElement;
			if (researchFocus && !useTrailingCursorValue) {
				let emojiFx = emojiCursor({ emoji: ["♫","♬","🎤","🎸","🎻","🎷","🎺","📯","🎹","🎵","🎶","🎼","♩","♪","🔊"], element: researchFocus });
				const canvas = document.querySelector("#research-focus canvas") as HTMLCanvasElement;
				if (canvas) {
					canvas.style.opacity = "0.25";
				}
			}
		}
	});
</script>


<svelte:head>
	<title>Oviedo Lab</title>
	<meta name="description" content="We study evolutionarily conserved mechanisms for decoding social calls in the Auditory Cortex of rodents" />

	<meta property="og:title" content="Oviedo Lab" />
	<meta property="og:description" content="We study evolutionarily conserved mechanisms for decoding social calls in the Auditory Cortex of rodents." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://oviedolab.org" />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content="Oviedo Lab" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content="Oviedo Lab" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content="Oviedo Lab">
	<meta name="twitter:description" content="We study evolutionarily conserved mechanisms for decoding social calls in the Auditory Cortex of rodents.">
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content="Oviedo Lab">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content="https://oviedolab.org">

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell" />
</svelte:head>


<main class="pb-20">
<div
id="landing-hero"
class="relative isolate min-h-[calc((100vh-4rem))] content-center bg-stone-800 sm:min-h-[calc((100vh-4rem)*2/3)] dark"
>
	<!-- Skeleton placeholder for the image in the extreme scenario -->
	<div class="absolute -z-20 w-full h-full top-0 left-0 overflow-clip flex items-center justify-center">
		<Skeleton class="h-full w-screen bg-stone-900" />
	</div>

	<!-- This optimized image will load first, placeholder for the video -->
	<div class="absolute -z-20 w-full h-full top-0 left-0 overflow-clip flex items-center justify-center">
		<enhanced:img src='$lib/assets/home/alston_preview_centered.png' alt="Alston mouse in the Monteverde Rainforest" class="w-screen object-center bg-no-repeat bg-center bg-cover h-[calc((100vh-4rem))] sm:min-h-[calc((100vh-4rem)*2/3)] scale-105 blur-lg opacity-30 brightness-60 saturate-90 select-none" fetchpriority="high" loading="eager" />
	</div>

	<!-- The video background -->
	<div class="absolute -z-20 w-full h-full top-0 left-0 bg-stone-800 overflow-clip flex items-center justify-center">
		<video src={AlstonVideoCentered} autoplay loop muted playsinline class="w-screen object-center object-cover bg-no-repeat bg-center bg-cover min-h-[calc((100vh-4rem))] sm:min-h-[calc((100vh-4rem)*2/3)] bg-stone-800 scale-105 blur-[5px] opacity-50 brightness-[0.50] select-none" />
		<span class="sr-only">Background video of Alston mouse in the Monteverde Rainforest</span>
	</div>

	<div class="absolute h-full w-full top-0 lelf-0 flex flex-col items-center justify-center gap-6 mt-3 sm:mt-4 sm:gap-7 center">
		<p class="text-center text-lg font-semibold text-muted-foreground sm:text-xl drop-shadow-xl">
			WashU Neuroscience
		</p>
		<h1 class="text-center text-5xl text-foreground font-bold sm:text-6xl drop-shadow-lg">Oviedo Lab</h1>
		<p class="mt-2 text-center text-lg font-semibold text-foreground sm:text-xl drop-shadow-lg">
			Decoding Vocal Communication
		</p>
		<!-- On click, smooth scroll to the research focus section -->
		<Button class="my-6 p-6 text-lg drop-shadow-lg" id="learnmore-button" on:click={() => window.scrollTo({ top: ((document.getElementById('research-focus')?.offsetTop || 0) - convertRemToPixels(4)), behavior: 'smooth' })}>
			Learn More
			<span class="sr-only">Learn More</span>
			<span id="learnmore-arrow" class="visuallyhidden hidden spin-arrow arrow-rotate-down">
				<MoveRight class="h-4 w-4 ml-3" />
			</span>
		</Button>
	</div>

	<!-- Video info and credits -->
	{#if browser}
		<div class="absolute bottom-0 flex flex-col items-end justify-center w-full">
			<p class="text-center text-[0.52rem] sm:text-xs text-muted-foreground/60 m-2 blur-[0.2px]">
				Video: Alston mouse in the Monteverde Rainforest (Credit: H.V. Oviedo)
			</p>
		</div>
	{/if}
</div>


<section
	id="research-focus"
	class="relative flex min-h-[calc((100vh-4rem)*2/3)] flex-col items-center justify-center gap-6 bg-stone-100 py-16 dark:bg-stone-900 sm:py-12"
>
	<h2 class="text-center text-4xl font-bold text-foreground mb-4">Research Focus</h2>
	<p class="mx-auto max-w-prose px-10 text-lg text-foreground">
		Animals rely on sounds for survival, and social/reproductive interactions. Our brain must perform the challenging tasks of rapidly recognizing, categorizing, and assigning communicative importance to sounds in a noisy environment. The instructions to these functions are found in the precise connections neurons make with one another. We study evolutionarily conserved mechanisms for decoding social calls in the Auditory Cortex of rodents. The organization of the cerebral cortex may appear stereotyped, but new tools that allow detailed investigation of neural circuits have revealed significant differences between cortical areas that perform different functions. These circuit specializations embedded in stereotyped modules are now believed to be the secret ingredients that enable cortical areas to perform specific tasks. Our goal is to reveal these unique circuit features in the Auditory Cortex and determine their behavioral significance.
	</p>
</section>

<section
	id="tools"
	class="flex min-h-[calc((100vh-4rem)*2/3)] flex-col items-center justify-start md:justify-center gap-6 bg-stone-200 py-16 dark:bg-stone-800 sm:py-12 md:relative"
>
	<h2 class="text-center text-4xl font-bold text-foreground">Tools</h2>

	<div class="flex flex-col w-full h-full px-10 items-center justify-center my-4 mt-6 gap-6 sm:gap-10 md:flex-row md:flex-wrap">
		<Button variant="ghost" class="w-fit h-fit p-0" href="/research/#transcriptomics">
			<article class="relative w-[calc(15rem+8vw)] h-[calc(8rem+6vw)] sm:w-[calc(18rem+8vw)] sm:h-[calc(10rem+6vw)] bg-stone-500 rounded-md flex items-center justify-center dark">
				<!-- background image -->
				<div class="absolute w-full h-full min-h-full min-w-full top-0 left-0 overflow-clip flex items-center justify-center rounded-md">
					<enhanced:img src='$lib/assets/research/MERFISH/2024_ACxDevP18CBACAJ_LayersROI_01.png' alt="Spatial Transcriptomics with MERFISH (blurred)" class="min-h-full min-w-full object-center bg-no-repeat bg-center bg-cover w-full h-full rounded-md scale-105 blur-sm opacity-80 brightness-75 saturate-100 select-none hover:blur hover:brightness-100 hover:scale-125 transition-all" fetchpriority="high" loading="eager" />
				</div>
				<p class="mx-2 text-center break-normal whitespace-pre-wrap overflow-hidden text-wrap text-xl sm:text-2xl text-foreground font-medium z-10 pointer-events-none">Transcriptomics</p>
			</article>
		</Button>

		<Button variant="ghost" class="w-fit h-fit p-0" href="/research/#circuit-mapping">
			<article class="relative w-[calc(15rem+8vw)] h-[calc(8rem+6vw)] sm:w-[calc(18rem+8vw)] sm:h-[calc(10rem+6vw)] bg-stone-500 rounded-md flex items-center justify-center dark">
				<!-- background image -->
				<div class="absolute w-full h-full min-h-full min-w-full top-0 left-0 overflow-clip flex items-center justify-center rounded-md">
					<enhanced:img src='$lib/assets/research/CircuitMapping/2024_L6-circuit-mapping_01.png' alt="Cortical Layer 6 Circuit Mapping (blurred)" class="object-center bg-no-repeat bg-center bg-cover w-full h-full rounded-md scale-105 blur-sm opacity-80 brightness-[0.3] saturate-100 select-none hover:blur hover:brightness-[0.4] hover:scale-125 transition-all" fetchpriority="high" loading="eager" />
				</div>
				<p class="mx-2 text-center break-normal whitespace-pre-wrap overflow-hidden text-wrap text-xl sm:text-2xl text-foreground font-medium z-10 pointer-events-none">Circuit Mapping</p>
			</article>
		</Button>

		<Button variant="ghost" class="w-fit h-fit p-0" href="/research/#invivo-electrophysiology">
			<article class="relative w-[calc(15rem+8vw)] h-[calc(8rem+6vw)] sm:w-[calc(18rem+8vw)] sm:h-[calc(10rem+6vw)] bg-stone-500 rounded-md flex items-center justify-center dark">
				<!-- background image -->
				<div class="absolute w-full h-full min-h-full min-w-full top-0 left-0 overflow-clip flex items-center justify-center rounded-md">
					<enhanced:img src='$lib/assets/research/Physiology/2024_probe-recording_cartoon.png' alt="High-density silicon probe recording cartoon (blurred)" class="min-h-full min-w-full object-center bg-no-repeat bg-center bg-cover w-full h-full rounded-md scale-105 blur-sm opacity-80 brightness-[0.4] saturate-100 select-none hover:blur hover:brightness-[0.6] hover:scale-125 transition-all" fetchpriority="high" loading="eager" />
				</div>
				<p class="mx-2 text-center break-normal whitespace-pre-wrap overflow-hidden text-wrap text-xl sm:text-2xl text-foreground font-medium z-10 pointer-events-none">High-Density <i>In Vivo</i> Electrophysiology</p>
			</article>
		</Button>

		<Button variant="ghost" class="w-fit h-fit p-0" href="/research/#behavior">
			<article class="relative w-[calc(15rem+8vw)] h-[calc(8rem+6vw)] sm:w-[calc(18rem+8vw)] sm:h-[calc(10rem+6vw)] bg-stone-500 rounded-md flex items-center justify-center dark">
				<!-- background image -->
				<div class="absolute w-full h-full min-h-full min-w-full top-0 left-0 overflow-clip flex items-center justify-center rounded-md">
					<enhanced:img src='$lib/assets/research/Behavior/2024_pup-retrieval-recording_01.png' alt="Pup retrieval behavior recording (blurred)" class="min-h-full min-w-full object-center bg-no-repeat bg-center bg-cover w-full h-full rounded-md scale-[1.25] blur-sm opacity-80 brightness-[0.4] saturate-100 select-none hover:blur hover:brightness-[0.6] hover:scale-[1.55] transition-all" fetchpriority="high" loading="eager" />
				</div>
				<p class="mx-2 text-center break-normal whitespace-pre-wrap overflow-hidden text-wrap text-xl sm:text-2xl text-foreground font-medium z-10 pointer-events-none">Behavior</p>
			</article>
		</Button>

		<Button variant="ghost" class="w-fit h-fit p-0" href="/research/#activity-mapping">
			<article class="relative w-[calc(15rem+8vw)] h-[calc(8rem+6vw)] sm:w-[calc(18rem+8vw)] sm:h-[calc(10rem+6vw)] bg-stone-500 rounded-md flex items-center justify-center dark">
				<!-- background image -->
				<div class="absolute w-full h-full min-h-full min-w-full top-0 left-0 overflow-clip flex items-center justify-center rounded-md">
					<enhanced:img src='$lib/assets/research/ActivityMapping/2024_sweep_vocal_movie.png' alt="Brain activity mapping during sweep stimulus (blurred)" class="min-h-full min-w-full object-center bg-no-repeat bg-center bg-cover w-full h-full rounded-md scale-[1.9] blur-sm opacity-80 brightness-75 saturate-100 select-none hover:blur hover:brightness-100 hover:scale-[2.15] transition-all" fetchpriority="high" loading="eager" />
				</div>
				<p class="mx-2 text-center break-normal whitespace-pre-wrap overflow-hidden text-wrap text-xl sm:text-2xl text-foreground font-medium z-10 pointer-events-none">Activity Mapping</p>
			</article>
		</Button>
	</div>
</section>
</main>


<style>
	/* By default, hide the arrow */
	/* On hover, make it display, fade in, and rotate 90 degrees */
	.hidden {
		display: none;
	}

	.visuallyhidden {
		opacity: 0;
		transition: 100ms;
	}

	/* Spin animation that rotate the arrow 90 degrees once during 200ms */
	.spin-arrow {
		animation: spin-arrow 350ms ease-in-out forwards;
	}

	.arrow-rotate-down {
		/* offset-y: 50%; */
		padding-top: -0.75rem;
		padding-left: 0;
		padding-bottom: 0.75rem;
		transform: rotate(90deg) translate3d(-20%, 0, 0);
	}

	@keyframes spin-arrow {
		from {
			/* transform: rotate(0deg) translate3d(-20%, 0, 0); */
			/* use rotate3d instead of rotate to avoid the flickering issue */
			transform: rotate3d(0, 0, 1, 0deg) translate3d(-20%, 0, 0);
			padding-top: 0;
			padding-bottom: 0;
			padding-left: 0.75rem;
		}
		to {
			/* transform: rotate(90deg) translateX(-20%); */
			transform: rotate3d(0, 0, 1, 90deg) translate3d(-20%, 0, 0);
			padding-top: -0.75rem;
			padding-bottom: 0.75rem;
			padding-left: 0;
		}
	}
</style>
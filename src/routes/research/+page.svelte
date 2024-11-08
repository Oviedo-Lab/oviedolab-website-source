<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card/index.js';
    import * as Carousel from "$lib/components/ui/carousel/index.js";
	import * as Dialog from '$lib/components/ui/dialog';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

	import ExternalLink from 'lucide-svelte/icons/external-link';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import ActivityMappingVideo01 from "$lib/assets/research/ActivityMapping/2024_sweep_vocal_movie.mp4";
	import BehaviorVideo01 from "$lib/assets/research/Behavior/2024_pup-retrieval-recording_01.mp4";

</script>


<svelte:head>
	<title>Research - Oviedo Lab</title>
	<meta name="description" content="Research, experimental techniques, and scientific technology utilized at Oviedo Lab" />

	<meta property="og:title" content="Research - Oviedo Lab" />
	<meta property="og:description" content="Research, experimental techniques, and scientific technology utilized at Oviedo Lab" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://oviedolab.org/research/" />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content="Research - Oviedo Lab" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content="Research - Oviedo Lab" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content="Research - Oviedo Lab">
	<meta name="twitter:description" content="Research, experimental techniques, and scientific technology utilized at Oviedo Lab">
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content="Research - Oviedo Lab">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content="https://oviedolab.org/research/">

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell, research, publications, transcriptomics, circuit mapping, high-density in vivo electrophysiology, behavior, activity mapping, merfish, probe recording" />
</svelte:head>


<main class="flex min-h-[100vh] flex-col items-center justify-start pt-10 sm:pt-10">
	<h1 class="gap-6 text-center text-4xl font-bold text-foreground">Research Focus</h1>

	<!-- Transcriptomics, Circuit Mapping, High-Density In Vivo Electrophysiology, Behavior, Activity Mapping -->

	<!-- Main Wrapper Div for flexing -->
	<div
		class="mt-10 flex w-full flex-col items-center justify-start gap-6 rounded-lg py-10 pt-0 sm:mt-12 sm:gap-10"
	>

		<!-- Transcriptomics -->
		<article id="transcriptomics" class="w-full flex flex-col items-center justify-start scroll-mt-20">
			<div class="shadow-stone-800/20 dark:shadow-stone-200/20 shadow-md flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-stone-500 bg-stone-100 py-12 pt-8 sm:pt-12 dark:bg-stone-900 sm:w-[38rem] sm:gap-10 md:w-[40rem] lg:w-[66rem] lg:max-w-[90%]">
				<!-- Carousel for research images on the left, Title + Text description on the right (and swap order even/odd to make easier to read) -->
				<!-- On small screens, the content stacked vertically, Title -> Images -> Text -->
				<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
					<h2 class="text-center text-3xl font-bold text-foreground mx-auto lg:hidden">
						Transcriptomics
					</h2>

					<!-- Carousel Div -->
					<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-1">
						<Carousel.Root class="w-[75%] h-full my-8 max-w-base lg:my-0">
							<Carousel.Content>
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										<enhanced:img src="$lib/assets/research/MERFISH/2024_ACxDevP18CBACAJ_LayersROI_01.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />
									</div>
								</Carousel.Item>
								
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										<enhanced:img src="$lib/assets/projects/merfish-assets/20240917_MERFISH_art1.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />
									</div>
								</Carousel.Item>
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										<enhanced:img src="$lib/assets/projects/merfish-assets/20240917_MERFISH_art2.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />
									</div>
								</Carousel.Item>
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										<enhanced:img src="$lib/assets/projects/merfish-assets/20240917_MERFISH_art3.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />
									</div>
								</Carousel.Item>
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										<enhanced:img src="$lib/assets/research/MERFISH/2024_ACxDevP18CBACAJ_LayersROI_02.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />
									</div>
								</Carousel.Item>

								<!-- Add more images here -->

							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
						</Carousel.Root>
					</div>

					<!-- Title + Description -->
					<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-2">
						<h2 class="hidden lg:block text-center text-3xl font-bold text-foreground mx-auto mb-4">
							Transcriptomics
						</h2>
						<p class="text-md text-foreground mx-3 lg:mx-0">
							The mechanisms by which the auditory cortices develop unique sound processing capabilities remain unknown. Recent research conducted in our lab has indicated notable variations in the maturation trajectory of the auditory cortices. To gain insights into the molecular pathways responsible for these differences, we investigate changes in gene expression between the auditory cortices using spatial transcriptomics.
						</p>
					</div>
				</div>
			</div>
		</article>


		<!-- Circuit Mapping -->
		<article id="circuit-mapping" class="w-full flex flex-col items-center justify-start scroll-mt-20">
			<div class="shadow-stone-800/20 dark:shadow-stone-200/20 shadow-md flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-stone-500 bg-stone-100 py-12 pt-8 sm:pt-12 dark:bg-stone-900 sm:w-[38rem] sm:gap-10 md:w-[40rem] lg:w-[66rem] lg:max-w-[90%]">
				<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
					<h2 class="text-center text-3xl font-bold text-foreground mx-auto lg:hidden">
						Circuit Mapping
					</h2>

					<!-- Carousel Div -->
					<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-2">
						<Carousel.Root class="w-[75%] h-full my-8 max-w-base lg:my-0">
							<Carousel.Content>
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										<enhanced:img src="$lib/assets/research/CircuitMapping/2024_L6-circuit-mapping_01.png" alt="Cortical Layer 6 Circuit Mapping" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />
									</div>
								</Carousel.Item>

								<!-- Add more images here -->

							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
						</Carousel.Root>
					</div>

					<!-- Title + Description -->
					<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-1">
						<h2 class="hidden lg:block text-center text-3xl font-bold text-foreground mx-auto mb-4">
							Circuit Mapping
						</h2>
						<p class="text-md text-foreground mx-3 lg:mx-0">
							Connectivity determines function in the brain. Therefore, to investigate the circuitry responsible for decoding sounds we use quantitative synaptic circuit analysis in vitro. Using this approach, we have uncovered distinct lateralized circuit motifs in the auditory cortices, adding mechanistic insight into the asymmetrical organization of auditory processing. We have also uncovered disrupted connectivity in mouse models of neuropsychiatric disorders, providing valuable insights into the underlying mechanisms contributing to these conditions.
						</p>
					</div>
				</div>
			</div>
		</article>


		<!-- High-Density In Vivo Electrophysiology -->
		<article id="invivo-electrophysiology" class="w-full flex flex-col items-center justify-start scroll-mt-20">
			<div class="shadow-stone-800/20 dark:shadow-stone-200/20 shadow-md flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-stone-500 bg-stone-100 py-12 pt-8 sm:pt-12 dark:bg-stone-900 sm:w-[38rem] sm:gap-10 md:w-[40rem] lg:w-[66rem] lg:max-w-[90%]">
				<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
					<h2 class="text-center text-3xl font-bold text-foreground mx-auto lg:hidden">
						High-Density <i>In Vivo</i> Electrophysiology
					</h2>

					<!-- Carousel Div -->
					<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-1">
						<Carousel.Root class="w-[75%] h-full my-8 max-w-base lg:my-0">
							<Carousel.Content>
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										<enhanced:img src="$lib/assets/research/Physiology/2024_probe-recording_cartoon.png" alt="High-density silicon probe recording cartoon" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />
									</div>
								</Carousel.Item>

								<!-- Add more images here -->

							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
						</Carousel.Root>
					</div>

					<!-- Title + Description -->
					<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-2">
						<h2 class="hidden lg:block text-center text-3xl font-bold text-foreground mx-auto mb-4">
							High-Density <i>In Vivo</i> Electrophysiology
						</h2>
						<p class="text-md text-foreground mx-3 lg:mx-0">
							The process by which the auditory cortex combines spectro-temporal features to form auditory streams, such as a voice or a symphony, remains unknown. In our laboratory, we focus on unraveling the compositional nature of auditory representations and understanding how they can be disrupted in neuropsychiatric disorders. To achieve this, we employ high-density silicon probe recordings, enabling us to capture detailed neuronal activity patterns and decipher the intricate mechanisms underlying auditory perception.
						</p>
					</div>
				</div>
			</div>
		</article>


		<!-- Behavior -->
		<article id="behavior" class="w-full flex flex-col items-center justify-start scroll-mt-20">
			<div class="shadow-stone-800/20 dark:shadow-stone-200/20 shadow-md flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-stone-500 bg-stone-100 py-12 pt-8 sm:pt-12 dark:bg-stone-900 sm:w-[38rem] sm:gap-10 md:w-[40rem] lg:w-[66rem] lg:max-w-[90%]">
				<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
					<h2 class="text-center text-3xl font-bold text-foreground mx-auto lg:hidden">
						Behavior
					</h2>

					<!-- Carousel Div -->
					<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-2">
						<Carousel.Root class="w-[75%] h-full my-8 max-w-base lg:my-0">
							<Carousel.Content>
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										{#if !browser}
											<enhanced:img src="$lib/assets/research/Behavior/2024_pup-retrieval-recording_01.png" alt="Pup retrieval behavior recording" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />

										{:else}
											<div class="w-full h-full bg-stone-800 flex items-center justify-center rounded-md">
												<video src={BehaviorVideo01} autoplay loop muted playsinline class="object-center object-contain bg-no-repeat bg-center bg-cover max-h-full max-w-full rounded-md bg-stone-800 select-none" />
												<span class="sr-only">Pup retrieval behavior recording</span>
											</div>
										{/if}
									</div>
								</Carousel.Item>

								<!-- Add more images here -->

							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
						</Carousel.Root>
					</div>

					<!-- Title + Description -->
					<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-1">
						<h2 class="hidden lg:block text-center text-3xl font-bold text-foreground mx-auto mb-4">
							Behavior
						</h2>
						<p class="text-md text-foreground mx-3 lg:mx-0">
							We utilize ethological behaviors to study the development of the auditory cortex’s role in responding to social calls, or vocalizations. Ethological behaviors are innate responses that are directly associated with an animal’s social interactions and communication. By observing and analyzing ethological behaviors, we gain insights into how the auditory cortex evolves and adapts in order to process and respond to social calls. We aim to uncover the underlying mechanisms that contribute to the development of auditory cortical circuits involved in the perception of social vocalizations.
						</p>
					</div>
				</div>
			</div>
		</article>


		<!-- Activity Mapping -->
		<article id="activity-mapping" class="w-full flex flex-col items-center justify-start scroll-m-20">
			<div class="shadow-stone-800/20 dark:shadow-stone-200/20 shadow-md flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-stone-500 bg-stone-100 py-12 pt-8 sm:pt-12 dark:bg-stone-900 sm:w-[38rem] sm:gap-10 md:w-[40rem] lg:w-[66rem] lg:max-w-[90%]">
				<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
					<h2 class="text-center text-3xl font-bold text-foreground mx-auto lg:hidden">
						Activity Mapping
					</h2>

					<!-- Carousel Div -->
					<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-1">
						<Carousel.Root class="w-[75%] h-full my-8 max-w-base lg:my-0">
							<Carousel.Content>
								<Carousel.Item>
									<div class="w-full h-full flex flex-col items-center justify-center">
										{#if !browser}
											<enhanced:img src="$lib/assets/research/ActivityMapping/2024_sweep_vocal_movie.png" alt="Brain activity mapping during sweep stimulus" class="w-full rounded-md object-cover object-center bg-stone-500 max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />

										{:else}
											<div class="w-full h-full bg-stone-800 flex items-center justify-center rounded-md">
												<video src={ActivityMappingVideo01} autoplay loop muted playsinline class="object-center object-contain bg-no-repeat bg-center bg-cover max-h-full max-w-full rounded-md bg-stone-800 select-none" />
												<span class="sr-only">Brain activity mapping during sweep stimulus</span>
											</div>
										{/if}

									</div>
								</Carousel.Item>

								<!-- Add more images here -->

							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
						</Carousel.Root>
					</div>

					<!-- Title + Description -->
					<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-2">
						<h2 class="hidden lg:block text-center text-3xl font-bold text-foreground mx-auto mb-4">
							Activity Mapping
						</h2>
						<p class="text-md text-foreground mx-3 lg:mx-0">
							Brain-clearing techniques, combined with immunolabeling of immediate-early genes, enable high-throughput and unbiased 3D mapping of neuronal activity. We utilize cFos activity mapping to screen for deficits in sound-evoked responses in the central auditory system, allowing us to identify structures where auditory processing diverges from wildtype in neuropsychiatric mouse models
						</p>
					</div>
				</div>
			</div>
		</article>

	</div>
</main>
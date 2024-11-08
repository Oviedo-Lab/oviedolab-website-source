<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

	import ExternalLink from 'lucide-svelte/icons/external-link';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let data;

	const publicationsYears = data.publications;
	const yearsSorted = data.yearsSorted;

	const images: any = import.meta.glob(
		['$lib/assets/publications/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'],
		{
			eager: true,
			query: { enhanced: true }
		}
	);

	export function getFullPath(path: string) {
		return images[path].default;
	}

	function toggleLineClamp(event: MouseEvent) {
		if (!event.currentTarget) return;

		const target = event.currentTarget as HTMLElement;
		const pTagDivWrapper = target.querySelector('div');
		const badgeTag = target.querySelector('.showmorebadge');
		if (pTagDivWrapper) {
			pTagDivWrapper.classList.toggle('line-clamp-none');
			pTagDivWrapper.classList.toggle('pointer-events-auto');

			if (badgeTag) {
				badgeTag.textContent = pTagDivWrapper.classList.contains('line-clamp-none')
					? 'Show less'
					: 'Show more';
			}
		}
	}
</script>


<svelte:head>
	<title>Publications - Oviedo Lab</title>
	<meta name="description" content="Peer-reviewed papers and preprints published over the years at Oviedo Lab" />

	<meta property="og:title" content="Publications - Oviedo Lab" />
	<meta property="og:description" content="Peer-reviewed papers and preprints published over the years at Oviedo Lab" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://oviedolab.org/publications/" />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content="Publications - Oviedo Lab" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content="Publications - Oviedo Lab" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content="Publications - Oviedo Lab">
	<meta name="twitter:description" content="Peer-reviewed papers and preprints published over the years at Oviedo Lab">
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content="Publications - Oviedo Lab">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content="https://oviedolab.org/publications/">

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell, publications, articles, peer-reviewed, preprints, journals" />
</svelte:head>


<main class="flex min-h-[100vh] flex-col items-center justify-start pt-10 sm:pt-10">
	<h1 class="gap-6 text-center text-4xl font-bold text-foreground">Publications</h1>

	<!-- group of sections by year -->
	<!-- as a grid of 2 columns, first column is the year taking up 4rem, second column is the publications  -->
	<div
		class="mt-10 flex w-full flex-col items-center justify-start gap-6 rounded-lg py-10 pt-0 sm:mt-12 sm:gap-10"
	>
		<!-- Dynamically generate the publications by year -->
		{#each yearsSorted as year}
			<section
				class="shadow-stone-800/20 dark:shadow-stone-200/20 shadow-md flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-stone-500 bg-stone-100 py-12 pt-8 sm:pt-12 dark:bg-stone-900 sm:w-[calc(32rem+6%)] sm:gap-10 md:w-[calc(40rem+6%)] lg:w-[calc(44rem+6%)]"
			>
				<h2 class="text-center text-3xl font-bold text-foreground">
					{year}
				</h2>
				<div class="flex flex-col items-center justify-start gap-6 sm:gap-10">
					{#each publicationsYears[year] || {} as publication}
						<article class="flex flex-col items-center justify-start">
							<Card.Root class="w-[92%] p-3 pb-5 sm:w-[32rem] md:w-[40rem] lg:w-[44rem]">
								<div class="flex flex-col items-start">
									<div class="flex w-full flex-col items-end justify-between align-top">
										{#if publication.isReviewArticle}
											<Badge
												variant="outline"
												class="bg-[#e2d994] hover:bg-[#cdc586] px-2 text-xs dark:bg-[#cdc586] dark:hover:bg-[#e2d994] dark:text-stone-900"
											>
												Review Article
												<span class="sr-only">Review Article</span>
											</Badge>
										{:else if publication.isPreprint}
											<Badge variant="destructive" class="px-2 text-xs">
												Preprint
												<span class="sr-only">Preprint</span>
											</Badge>
										{:else}
											<Badge
												variant="secondary"
												class="bg-[#bedbd1] hover:bg-[#96c5b5] px-2 text-xs dark:bg-[#96c5b5] dark:hover:bg-[#a8dfcd] dark:text-stone-900"
											>
												Peer Reviewed
												<span class="sr-only">Peer Reviewed</span>
											</Badge>
										{/if}
										<Card.Header class="flex-1 pt-1 w-full">
											<Card.Title class="text-xl text-left">{publication.title}</Card.Title>
											<Card.Description>
												<p class="text-left">{publication.authors.join(', ')}</p>
												<p class="text-right font-medium mt-2">{publication.journal}</p>
											</Card.Description>
										</Card.Header>
									</div>
									<Card.Content class="grid gap-4">
										<button
											type="button"
											class="pointer-events-none space-y-1 mb-1"
											on:click={toggleLineClamp}
										>
											<div class="pointer-events-auto mb-2 line-clamp-4 cursor-text text-left">
												<!-- There can be multiple abstract parts, and when there is more than one, the abstract part heading is indexed in publications.abstractHeadings -->
												{#if publication.abstract.length <= 1}
													<p class="text-sm text-foreground">
														{publication.abstract}
													</p>
												{:else}
													{#each publication.abstract as abstractPart, index}
														{#if index > 0}
															<p class="text-md text-foreground font-medium mt-3">
																{publication.abstractHeadings[index] || ""}
															</p>
														{:else}
															<p class="text-md text-foreground font-medium">
																{publication.abstractHeadings[index] || ""}
															</p>
														{/if}
														<p class="text-sm text-foreground">
															{abstractPart}
														</p>
													{/each}
												{/if}
											</div>
											<Badge
												variant="outline"
												class="showmorebadge pointer-events-auto w-full cursor-pointer justify-center rounded-md align-middle text-xs"
											>
												Show more
												<span class="sr-only">Click to show more</span>
											</Badge>
										</button>
	
										<enhanced:img src={getFullPath(publication.thumbnail)} alt={publication.thumbnailSummary} class="w-full rounded-md object-cover object-center aspect-[1200/630] bg-muted" sizes="min(630px, 100vw)" />
	
									</Card.Content>
									<Card.Footer class="w-full">
										<Button
											class="w-full bg-stone-800 text-stone-50 hover:bg-stone-900 dark:bg-stone-300 dark:text-stone-950 hover:dark:bg-stone-200"
											variant="secondary"
											href={publication.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											View Full Text <ExternalLink class="ml-2 h-4 w-4" />
										</Button>
									</Card.Footer>
								</div>
							</Card.Root>
						</article>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</main>
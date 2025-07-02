<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import BrandIcon from '@/components/svg-icons/brand-icon.svelte';
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
		const targetParent = target.parentElement;
		const pTagDivWrapper = targetParent?.querySelector('[data-content]');
		const badgeTag = targetParent?.querySelector('.showmorebadge');
		const badgeSRSpan = targetParent?.querySelector('.showmorebadge span');
		if (pTagDivWrapper) {
			pTagDivWrapper.classList.toggle('line-clamp-none');
			pTagDivWrapper.classList.toggle('pointer-events-auto');

			if (badgeTag) {
				badgeTag.textContent = pTagDivWrapper.classList.contains('line-clamp-none')
					? 'Show less'
					: 'Show more';
			}
			if (badgeSRSpan) {
				badgeSRSpan.textContent = pTagDivWrapper.classList.contains('line-clamp-none')
					? 'Click to show less'
					: 'Click to show more';
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
		class="mt-10 mb-10 flex w-full flex-col items-center justify-start gap-6 rounded-lg py-10 pt-0 sm:mt-12 sm:gap-10"
	>
		<!-- Dynamically generate the publications by year -->
		{#each yearsSorted as year}
			<section
				class="shadow-stone-800/20 dark:shadow-stone-200/20 shadow-md flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-stone-500 bg-stone-100 py-12 pt-8 sm:pt-12 dark:bg-stone-900 sm:w-[calc(36rem+6%)] sm:gap-10 md:w-[calc(40rem+6%)] lg:w-[calc(44rem+6%)]"
			>
				<h2 class="text-center text-3xl font-bold text-foreground">
					{year}
				</h2>
				<div class="flex flex-col items-center justify-start gap-6 sm:gap-10">
					{#each publicationsYears[year] || {} as publication}
						<article class="flex flex-col items-center justify-start">
							<Card.Root class="w-[94%] pt-3 pb-2 sm:pb-3 md:pb-4 px-1 sm:px-2 md:px-3 sm:w-[34rem] md:w-[40rem] lg:w-[44rem]">
								<div class="flex flex-col items-start">
									<div class="flex w-full flex-col items-end justify-between align-top">
										{#if publication.isReviewArticle}
											<Badge
												variant="secondary"
												class="mr-2 sm:mr-1 md:mr-0 bg-[#e2d994] hover:bg-[#cdc586] px-2 text-xs dark:bg-[#cdc586] dark:hover:bg-[#e2d994] dark:text-stone-900"
											>
												Review Article
												<span class="sr-only">Review Article</span>
											</Badge>
										{:else if publication.isPreprint}
											<Badge variant="destructive" class="mr-2 sm:mr-1 md:mr-0 px-2 text-xs">
												Preprint
												<span class="sr-only">Preprint</span>
											</Badge>
											
										{:else if publication.isSciComms}
											<Badge
												variant="secondary"
												class="mr-2 sm:mr-1 md:mr-0 bg-[#f8c4a6] hover:bg-[#e9b495] px-2 text-xs dark:bg-[#d8aa8f] dark:hover:bg-[#c09278] dark:text-stone-900"
											>
												Sci-Comms
												<span class="sr-only">Sci-Comms</span>
											</Badge>
										{:else}
											<Badge
												variant="secondary"
												class="mr-2 sm:mr-1 md:mr-0 bg-[#bedbd1] hover:bg-[#96c5b5] px-2 text-xs dark:bg-[#96c5b5] dark:hover:bg-[#a8dfcd] dark:text-stone-900"
											>
												Peer Reviewed
												<span class="sr-only">Peer Reviewed</span>
											</Badge>
										{/if}
										<Card.Header class="flex-1 pt-1 w-full">
											<Card.Title class="text-xl text-left scroll-mt-28" id={publication.title.toLowerCase().replace(/\s/g, '-')}>{publication.title}</Card.Title>
											<Card.Description>
												<p class="text-left">{publication.authors.join(', ')}</p>
												<p class="text-right font-medium mt-2">{publication.journal}</p>
											</Card.Description>
										</Card.Header>
									</div>
									<Card.Content class="grid gap-4">
										<div
											class="space-y-1 mb-1"
										>
											<div data-content class="mb-2 line-clamp-4 cursor-text text-left space-y-1">
												<!-- There can be multiple abstract parts, and when there is more than one, the abstract part heading is indexed in publications.abstractHeadings -->
												{#if publication.abstract.length <= 1}
													<p class="text-sm text-foreground">
														{publication.abstract}
													</p>
												{:else}
													{#each publication.abstract as abstractPart, index}
														{#if publication.abstractHeadings[index]}
															{#if index > 0}
																<p class="text-md text-foreground font-medium !mt-3">
																	{publication.abstractHeadings[index] || ""}
																</p>
															{:else}
																<p class="text-md text-foreground font-medium">
																	{publication.abstractHeadings[index] || ""}
																</p>
															{/if}
														{/if}
														<p class="text-sm text-foreground">
															{abstractPart}
														</p>
													{/each}
												{/if}
											</div>
											<Button
												type="button"
												variant="outline"
												class="showmorebadge w-full h-fit py-1 cursor-pointer justify-center rounded-md align-middle text-xs"												
												on:click={toggleLineClamp}
											>
												Show more
												<span class="sr-only">Click to show more</span>
											</Button>
										</div>
	
										<enhanced:img src={getFullPath(publication.thumbnail)} alt={publication.thumbnailSummary} class="w-full rounded-md object-cover object-center aspect-[1200/630] bg-muted" sizes="min(720px, 100vw)" />
	
									</Card.Content>
									<Card.Footer class="w-full">
										<Button
											class="w-full bg-stone-800 text-stone-50 hover:bg-stone-900 dark:bg-stone-300 dark:text-stone-950 hover:dark:bg-stone-200"
											variant="secondary"
											href={publication.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											{#if publication.isSciComms}
												Read Article
											{:else}
												View Full Text
											{/if}
											<ExternalLink class="ml-2 h-4 w-4" />
										</Button>
									</Card.Footer>
								</div>
							</Card.Root>
						</article>
					{/each}
				</div>
			</section>
		{/each}


		<!-- Google Scholar -->
		<a href="https://scholar.google.com/citations?hl=en&user=s2stPsAAAAAJ" class="bg-stone-100/30 dark:bg-stone-900/40 hover:bg-stone-100/60 hover:dark:bg-stone-900/70 flex flex-col sm:flex-row px-6 py-5 gap-5 justify-between items-center shadow-stone-800/20 dark:shadow-stone-200/20 rounded-lg border-2 border-stone-600/70 dark:border-stone-400/70 hover:border-stone-600 hover:dark:border-stone-400 shadow-md w-[99%] sm:w-[calc(32rem+6%)] md:w-[calc(40rem+6%)] lg:w-[calc(44rem+6%)]" target="_blank" rel="noopener noreferrer">
			<div class="flex justify-around items-center gap-6">
				<img src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=s2stPsAAAAAJ" alt="Hysell Oviedo" class="rounded-full w-20 h-20 object-cover object-center" />
				<div class="flex flex-col items-start justify-center gap-1">
					<p class="text-xl font-bold text-left">Hysell V. Oviedo</p>
					<p class="text-sm text-left text-accent-foreground/80">Roger M. Perlmutter Assistant Professor, Dept. of Neuroscience, WashU School of Medicine</p>
				</div>
			</div>

			<div class="flex justify-around items-center gap-2">
				<Tooltip.Root>
					<Tooltip.Trigger aria-label="Google Scholar">
						<BrandIcon name="googleScholar" class="h-5 w-5 fill-current sm:h-7 sm:w-7 opacity-80" />
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Google Scholar</p>
					</Tooltip.Content>
				</Tooltip.Root>
				<p class="block sm:hidden text-sm font-medium">Google Scholar</p>
			</div>
		</a>
	</div>
</main>
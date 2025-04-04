<script lang="ts">
    import * as Alert from "$lib/components/ui/alert/index.js";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import * as Tooltip from "$lib/components/ui/tooltip";
    
	import BrandIcon from '$lib/components/svg-icons/brand-icon.svelte';
	
    import ExternalLink from 'lucide-svelte/icons/external-link';
    import Globe from 'lucide-svelte/icons/globe';
    import Mail from 'lucide-svelte/icons/mail';
    import User from 'lucide-svelte/icons/user';
    
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import type { ExternalLinkData } from "../+page.server";
    
    export let data;
    if (data.member) {
        data.member.externalLinks = data.member.externalLinks as ExternalLinkData[];
    }

    const images: any = import.meta.glob(
		['$lib/assets/team/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'],
		{
			eager: true,
			query: { enhanced: true }
		}
	);

	const CVs: any = import.meta.glob(
		['$lib/assets/team/**/*.{pdf,docx,doc,ppt,pptx,xls,xlsx,zip}'],
		{
			eager: true,
			query: { enhanced: true }
		}
	);

	export function getFullImagePath(path: string) {
        if (!path) {
            return "##";
        }

        // the path could be an external url
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }

        // if path is undefined, return the default path
        if (!images[path]) {
            return "##";
        }

		return images[path].default || "";
	}
	export function getFullCVPath(path: string | undefined) {
        if (!path) {
            return "##";
        }

        // the path could be an external url
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }

        // if path is a literal string (that is not empty), return the path
        if (typeof path === 'string' && path.length > 0 && !CVs[path]) {
            return path || "##";
        }

        // if path is undefined, return the default path
        if (!CVs[path]) {
            return "##";
        }
        
        // Otherwise if path is to a local file, return the path
		return CVs[path].default || "##";
	}

    type BrandIconType = "discord" | "facebook" | "github" | "googleScholar" | "instagram" | "linkedin" | "orcid" | "soundcloud" | "tiktok" | "vimeo" | "x" | "youtube";

    // get available names from the BrandIcon component
    const availableBrandIcons = ["discord", "facebook", "github", "googleScholar", "instagram", "linkedin", "orcid", "soundcloud", "tiktok", "vimeo", "x", "youtube"];

    // Type check if provided string is in availableBrandIcons
    function isValidBrandIcon(icon: string) {
        return availableBrandIcons.includes(icon as BrandIconType);
    }

    function asBrandIconType(icon: string) {
        return icon as BrandIconType;
    }


</script>


<svelte:head>
	<title>{data.member?.name || "Who??"} | Members - Oviedo Lab</title>
    {#if data.member}
        <!-- Truncate the member bio to under 200 characters -->
        <meta name="description" content="{data.member?.biography.join(" ").substring(0,190)}..." />

        <meta property="og:title" content="{data.member?.name || "Who??"} | Members - Oviedo Lab" />
        <meta property="og:description" content="{data.member?.biography.join(" ").substring(0,190)}..." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://oviedolab.org/team/{data.member.name.replace(/\s/g, '')}/" />
        <meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
        <meta property="og:image:alt" content="{data.member?.name || "Who??"} | Members - Oviedo Lab" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="{data.member?.name || "Who??"} | Members - Oviedo Lab" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:title" content="{data.member?.name || "Who??"} | Members - Oviedo Lab">
        <meta name="twitter:description" content="{data.member?.biography.join(" ").substring(0,190)}...">
        <meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
        <meta name="twitter:image:alt" content="{data.member?.name || "Who??"} | Members - Oviedo Lab">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@">
        <meta name="twitter:creator" content="@">
        <meta name="twitter:url" content="https://oviedolab.org/team/{data.member.name.replace(/\s/g, '')}/">

        <meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell, team, member, {data.member.name}, {data.member.name.split(' ').join(', ')}" />
    {/if}
</svelte:head>


<main class="flex min-h-[100vh] flex-col items-center justify-start pt-5 pb-5 sm:pt-10 sm:pb-11 gap-6 sm:gap-10">
    {#if data.member}
    
    <section id="member-stats" class="w-full flex flex-col items-center justify-start pt-10 pb-11 gap-8 sm:pt-10 sm:pb-11 md:w-[82%] md:flex-row md:gap-20">
        <Carousel.Root class="max-w-[50%] md:max-h-[45vh] md:w-full md:align-top md:self-start lg:max-w-sm">
            <Carousel.Content>
                {#if data.member.images.length === 0}
                    <Carousel.Item>
                        <div class="flex flex-col items-center justify-center">
                            <Avatar.Root class="w-[14rem] h-[14rem] rounded-md">
                                <Avatar.Fallback class="text-2xl font-semibold rounded-md">{data.member.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
                            </Avatar.Root>
                        </div>
                    </Carousel.Item>
                {/if}

                {#each data.member.images as image}
                    <Carousel.Item>
                        <!-- Validate that the image exists and the return type from fullImagePath is a string !="##" -->
                        {#if image && getFullImagePath(image) !== "##"}
                            <enhanced:img src={getFullImagePath(image)} alt="{data.member.name} headshot" class="w-full mx-auto rounded-md object-cover object-center aspect-[9/10] bg-muted max-h-[45vh] max-w-[calc(45vh*9/10)]" sizes="min(1920px, 50vw)" />
                        {:else}
                            <div class="flex flex-col items-center justify-center">
                                <Avatar.Root class="w-[14rem] h-[14rem] rounded-md">
                                    <Avatar.Image src="" alt="{data.member.name} headshot" class="rounded-md" />
                                    <Avatar.Fallback class="text-2xl font-semibold rounded-md">{data.member.name.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
                                </Avatar.Root>
                            </div>
                        {/if}
                    </Carousel.Item>
                {/each}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
        </Carousel.Root>

        <div class="w-full flex flex-col items-center justify-start gap-2 md:mx-4 sm:gap-1 md:gap-2 md:mr-0 sm:my-1 md:my-0">
            <h1 class="text-2xl font-bold text-foreground mx-auto text-center sm:text-3xl md:text-3xl lg:text-4xl">
                {data.member.name}{#if data.member.includeSuffix && data.member.suffix}, {data.member.suffix}{/if}
            </h1>
            <p class="text-lg font-medium text-foreground mx-auto text-center sm:text-lg md:text-xl lg:text-2xl">{data.member.title}</p>

            <!-- Education -->
            <!-- {#if !data.member.isAlumni && data.member.education.length > 0} -->
            {#if data.member.education.length > 0}
                <div class="w-full px-10 my-4 md:px-0 lg:max-w-[80ch]">
                    <h2 class="my-3 text-left text-2xl font-bold text-foreground">Education</h2>
                    <div class="flex flex-col items-center justify-start gap-2">
                        {#each data.member.education as education}
                            <p class="text-left text-lg text-foreground w-full ml-8 -indent-4 break-words hyphens-auto">{education}</p>
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- Honors and Awards -->
            <!-- {#if !data.member.isAlumni && data.member.honorsAndAwards.length > 0} -->
            {#if data.member.honorsAndAwards.length > 0}
                <div class="w-full px-10 my-4 md:px-0 lg:max-w-[80ch]">
                    <h2 class="my-3 text-left text-2xl font-bold text-foreground">Honors and Awards</h2>
                    <div class="flex flex-col items-center justify-start gap-2">
                        {#each data.member.honorsAndAwards as honorsAndAward}
                            <p class="text-left text-lg text-foreground w-full ml-8 -indent-4 break-words hyphens-auto">{honorsAndAward}</p>
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- External Links. Use the first if line if you do NOT want to show the external links section for alumni -->
            <!-- {#if !data.member.isAlumni && data.member.externalLinks.length > 0} -->
            {#if data.member.externalLinks.length > 0} 
                <div class="w-full px-10 my-4 md:px-0 lg:max-w-[80ch]">
                    <h2 class="my-3 text-left text-2xl font-bold text-foreground">External Links</h2>
                    <div class="flex flex-row items-center justify-start gap-3 flex-wrap">
                        {#each data.member.externalLinks as externalLink}
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <Button variant="ghost" class="p-1 opacity-80 hover:opacity-100" href={externalLink.url} target="_blank" rel="noopener noreferrer">
                                        {#if isValidBrandIcon(externalLink.type)}
                                            <BrandIcon name={asBrandIconType(externalLink.type)} class="h-8 w-8 fill-current" />
                                        {:else if externalLink.type === 'website'}
                                            <Globe class="h-8 w-8" />
                                        {:else if externalLink.type === 'email'}
                                            <Mail class="h-8 w-8" />
                                        {:else}
                                            <Globe class="h-8 w-8" />
                                        {/if}
                                    </Button>
                                </Tooltip.Trigger>
                                <Tooltip.Content>
                                <p>{externalLink.title}</p>
                                </Tooltip.Content>
                            </Tooltip.Root>
                        {/each}
                    </div>
                </div>
            {/if}

            <!-- CV -->
            {#if !data.member.isAlumni && data.member.CV && data.member.CV.url != '##' && data.member.CV.title}
                <div class="w-full px-10 my-4 md:px-0 lg:max-w-[80ch] flex flex-row gap-2 items-center justify-center">
                    <!-- Button to open the CV in a new tab -->
                    <Button variant="secondary" class="mx-auto w-fit text-md"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={getFullCVPath(data.member.CV.url)}
                    >
                        {data.member.CV.title} <ExternalLink class="ml-2 h-4 w-4" />
                    </Button>
                </div>
            {/if}
        </div>


    </section>

    {#if !data.member.isAlumni && data.member.biography.length > 0}
        <section id="member-bio" class="bg-muted w-full flex flex-col items-center justify-start">
            <blockquote class="max-w-[75ch] px-10 pt-10 pb-11 border-l-4 border-muted-foreground/40 flex flex-col items-center justify-start gap-5 sm:pt-10 sm:pb-11 sm:gap-6">
                {#each data.member.biography as bio}
                    <p class="w-full text-left text-lg text-foreground">{bio}</p>
                {/each}
            </blockquote>
        </section>
    {/if}
        
        
    {/if}
</main>
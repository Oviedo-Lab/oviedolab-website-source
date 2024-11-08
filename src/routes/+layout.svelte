<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	import { useTrailingCursor, emojiFx } from './stores';
	import { emojiCursor } from 'cursor-effects';
	import type { CursorEffectResult } from 'cursor-effects';

	import { toggleMode } from 'mode-watcher';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import Menu from 'lucide-svelte/icons/menu';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';

	import PageLogo from '$lib/assets/generic/oviedolab-logo-nobg.svg?raw';
	import { browser } from '$app/environment';
	import { page, navigating } from '$app/stores';
	import { onMount } from 'svelte';

	import { gamepadEggs } from '$lib/components/konami';

	$: currentRoute = $page.url.pathname;
	let open = false;
	$: if ($navigating) open = false;

	let isSmallScreen = false;

	let useTrailingCursorValue: boolean = false;
	useTrailingCursor.subscribe((value) => {
		useTrailingCursorValue = value;
	});
	let emojiFxValue: CursorEffectResult;
	emojiFx.subscribe((value) => {
		emojiFxValue = value;
	});

	const makeKeySequenceListener = (
		keySequence: Array<{ key: string; timeToNextKey: number }>,
		callback: () => void
	) => {
		let index = 0;
		let timeoutId: number | undefined;

		return (e: KeyboardEvent) => {
			const { key, timeToNextKey } = keySequence[index];

			// Keystroke matches the target one for our current position
			if (e.key === key) {
				// Success! Invoke the callback.
				if (index === keySequence.length - 1) {
					callback();
				}
				// Clear previous timer (if any)
				clearTimeout(timeoutId);
				// Set up new timer if there's a specified delay
				if (timeToNextKey) {
					timeoutId = setTimeout(() => (index = 0), timeToNextKey);
				}
				// Move up, wrapping as needed
				index = (index + 1) % keySequence.length;
			} else {
				// Key didn't match; start over
				index = 0;
				// Clear any lingering timer
				clearTimeout(timeoutId);
			}
		};
	};

	let currentCanvas: HTMLCanvasElement | undefined;
	function toggleTrailingCursorFx(triggerWord: string) {
		// if the cursor is already active, deactivate it and destroy the effect
		if (useTrailingCursorValue) {
			if (emojiFx) {
				emojiFxValue?.destroy();
				emojiFx.set(emojiFxValue);
			}
			currentCanvas?.remove();
			currentCanvas = undefined;
			useTrailingCursor.set(!useTrailingCursorValue);

			toast.success('Trailing cursor deactivated!', {
				description: `You can always type "${triggerWord}" to reactivate it`,
				action: {
					label: 'Got it!',
					onClick: () => {}
				},
				duration: 5000
			});
		} else {
			// Find and remove all canvas elements in the document
			// If there are canvas of real page content, you should whitelist them here!!
			const whitelistedCanvasesID: string[] = [];
			const canvasElements = document.querySelectorAll('canvas');

			// Remove all canvas elements that are not whitelisted
			for (let i = 0; i < canvasElements.length; i++) {
				if (!whitelistedCanvasesID.includes(canvasElements[i].id)) {
					canvasElements[i].remove();
				}
			}

			let thisEmojiFx = emojiCursor({
				emoji: [
					'♫',
					'♬',
					'🎤',
					'🎸',
					'🎻',
					'🎷',
					'🎺',
					'📯',
					'🎹',
					'🎵',
					'🎶',
					'🎼',
					'♩',
					'♪',
					'🔊'
				]
			});
			currentCanvas = document.querySelector('canvas') as HTMLCanvasElement;
			if (currentCanvas) {
				currentCanvas.style.opacity = '0.3';
				currentCanvas.style.zIndex = '10100';
			}

			emojiFx.set(thisEmojiFx);

			toast.success('🎉 You have found an Easter Egg!', {
				description: `Enjoy the trailing cursor effect ~ Type "${triggerWord}" again to deactivate`,
				action: {
					label: 'Nice!',
					onClick: () => {}
				},
				duration: 5000
			});
			useTrailingCursor.set(!useTrailingCursorValue);
		}
	}


	onMount(() => {
		// Function to check screen size
		function checkScreenSize() {
			isSmallScreen = window.matchMedia('(max-width: 767px)').matches;
		}

		// Check screen size on load
		checkScreenSize();

		// Add event listener to update on resize
		window.addEventListener('resize', checkScreenSize);

		// Add event listener for keyboard typing "auditory" to toggle the trailing cursor
		const triggerWord = 'auditory';
		const triggerWordTimeout = 2000; // ms
		// build the key sequence lookup table: [{key, timeToNextKey}]
		let keySequenceLookupTable: Array<{ key: string; timeToNextKey: number }> = [];
		for (let i = 0; i < triggerWord.length; i++) {
			keySequenceLookupTable.push({ key: triggerWord[i], timeToNextKey: i * triggerWordTimeout });
		}

		const keySequenceListener = makeKeySequenceListener(keySequenceLookupTable, () => {
			toggleTrailingCursorFx(triggerWord);
		});

		document.addEventListener('keyup', keySequenceListener);

		// Other eggs
		gamepadEggs(window);
	});
</script>

<ModeWatcher />
<Toaster />

<header
	class="sticky top-0 isolate z-[10000] flex h-16 items-center justify-between gap-4 bg-[hsl(var(--navbg))] px-4 md:px-6"
>
	<nav class="flex flex-row items-center gap-4 text-lg font-medium sm:text-sm lg:gap-6">
		<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
			<svg
				width="2.75em"
				height="2.75em"
				viewBox="0 0 823 740"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
			>
				{@html PageLogo}
			</svg>
			<span class="sr-only">Oviedo Lab</span>
			<span class="ml-2 text-nowrap text-lg transition-colors hover:text-foreground md:hidden"
				>Oviedo Lab</span
			>
		</a>

		<a
			href="/"
			class="{currentRoute === '/' || isSmallScreen
				? 'text-foreground'
				: 'text-muted-foreground hover:text-foreground'} hidden text-nowrap py-3 text-base transition-colors hover:text-foreground md:block"
		>
			Home
		</a>
		<a
			href="/publications/"
			class="{currentRoute.startsWith('/publications/')
				? 'text-foreground'
				: 'text-muted-foreground hover:text-foreground'} hidden text-nowrap py-3 text-base transition-colors hover:text-foreground md:block"
		>
			Publications
		</a>
		<a
			href="/research/"
			class="{currentRoute.startsWith('/research/')
				? 'text-foreground'
				: 'text-muted-foreground hover:text-foreground'} hidden text-nowrap py-3 text-base transition-colors hover:text-foreground md:block"
		>
			Research
		</a>
		<a
			href="/team/"
			class="{currentRoute.startsWith('/team/')
				? 'text-foreground'
				: 'text-muted-foreground hover:text-foreground'} hidden text-nowrap py-3 text-base transition-colors hover:text-foreground md:block"
		>
			Team
		</a>
		<a
			href="/events/"
			class="{currentRoute.startsWith('/events/')
				? 'text-foreground'
				: 'text-muted-foreground hover:text-foreground'} hidden text-nowrap py-3 text-base transition-colors hover:text-foreground md:block"
		>
			Events
		</a>
		<a
			href="/openings/"
			class="{currentRoute.startsWith('/openings/')
				? 'text-foreground'
				: 'text-muted-foreground hover:text-foreground'} hidden text-nowrap py-3 text-base transition-colors hover:text-foreground md:block"
		>
			Openings
		</a>
	</nav>

	<div class="ml-auto flex w-full items-center justify-end gap-4 md:gap-2 lg:gap-4">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button on:click={toggleMode} variant="outline" size="icon">
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0"
					/>
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content class="z-[10001]">
				<p>Toggle Theme</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>

	<div class="md:hidden">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Sheet.Root bind:open>
					<Sheet.Trigger asChild let:builder>
						<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
							<Menu class="h-5 w-5" />
							<span class="sr-only">Toggle navigation menu</span>
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="left" class="z-[10010]">
						<nav class="grid gap-3 text-lg font-medium">
							<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
								<svg
									width="2.85em"
									height="2.85em"
									viewBox="0 0 823 740"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									version="1.1"
								>
									{@html PageLogo}
								</svg>
								<span class="sr-only">Oviedo Lab</span>
								<span class="ml-2">Oviedo Lab</span>
							</a>

							<a
								href="/"
								class="{currentRoute === '/'
									? 'text-foreground'
									: 'text-muted-foreground hover:text-foreground'} text-nowrap p-3 transition-colors hover:text-foreground"
							>
								Home
							</a>
							<a
								href="/publications/"
								class="{currentRoute.startsWith('/publications/')
									? 'text-foreground'
									: 'text-muted-foreground hover:text-foreground'} text-nowrap p-3 transition-colors hover:text-foreground"
							>
								Publications
							</a>
							<a
								href="/research/"
								class="{currentRoute.startsWith('/research/')
									? 'text-foreground'
									: 'text-muted-foreground hover:text-foreground'} text-nowrap p-3 transition-colors hover:text-foreground"
							>
								Research
							</a>
							<a
								href="/team/"
								class="{currentRoute.startsWith('/team/')
									? 'text-foreground'
									: 'text-muted-foreground hover:text-foreground'} text-nowrap p-3 transition-colors hover:text-foreground"
							>
								Team
							</a>
							<a
								href="/events/"
								class="{currentRoute.startsWith('/events/')
									? 'text-foreground'
									: 'text-muted-foreground hover:text-foreground'} text-nowrap p-3 transition-colors hover:text-foreground"
							>
								Events
							</a>
							<a
								href="/openings/"
								class="{currentRoute.startsWith('/openings/')
									? 'text-foreground'
									: 'text-muted-foreground hover:text-foreground'} text-nowrap p-3 transition-colors hover:text-foreground"
							>
								Openings
							</a>
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			</Tooltip.Trigger>
			<Tooltip.Content class="z-[10001]">
				<p>Navigation Menu</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
</header>

<slot></slot>

<!-- div that overlays on to of everything and cover the entire screen, positioned relative so that we can add the cursor effects to it -->
<!-- <div class="fixed z-[11000] h-full w-full top-0 left-0 pointer-events-none">
	<div id="cursor-fx-wrapper" class="relative z-10 h-full w-full"></div>
</div> -->

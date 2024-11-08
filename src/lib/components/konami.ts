import { Toaster } from '$lib/components/ui/sonner';
import { toast } from 'svelte-sonner';

const gamepadButtonsIdMap: { [key: number]: string } = {
	// ↑ ↑ ↓ ↓ ← → ← → B A
	// https://hardwaretester.com/gamepad
	12: '↑',
	13: '↓',
	14: '←',
	15: '→',
	0: 'B',
	1: 'A'
};

// It's nice that you are reading this, really appreciate it.
// Though, I can't just tell you outright what the Easter Egg is, even when you are reading this code...
// Have fun!
const u = 235;
const vibrationSequence: number[][] = [
	[1, 3 * u],
	[0, 1 * u],
	[1, 3 * u],
	[0, 1 * u],
	[1, 3 * u],
	[0, 3 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 3 * u],
	[0, 3 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 3 * u],
	[1, 1 * u],
	[0, 3 * u],
	[1, 3 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 3 * u],
	[1, 3 * u],
	[0, 1 * u],
	[1, 3 * u],
	[0, 1 * u],
	[1, 3 * u],
	[0, 7 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 3 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 3 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 3 * u],
	[0, 3 * u],
	[1, 3 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 1 * u],
	[0, 1 * u],
	[1, 1 * u],
];

async function KonamiSuccess(window: Window) {
	const sequenceDuration = vibrationSequence.reduce((acc, curr) => acc + curr[1], 0);

	const toastID = toast.success('🎉 You have found an Easter Egg!', {
		description: `Well played, gamer 😎`,
		action: {
			label: 'GGEZ!',
			onClick: () => {}
		},
		duration: sequenceDuration * 1.5
	});

	const gamepads = window.navigator.getGamepads().filter((gamepad) => gamepad !== null);

	// Trigger vibration sequence on all gamepads at once
	const vibrationPromises = gamepads.map(async (gamepad, index) => {
		if (!gamepad || !gamepad.vibrationActuator) return;

		// Loop through the vibration sequence and apply it to the gamepad
		for (let i = 0; i < vibrationSequence.length; i++) {
			if (vibrationSequence[i][0] === 0) {
				toast.success('🎉 You have found an Easter Egg!', {
					id: toastID,
					description: `Well played, gamer 😎`,
					action: {
						label: 'GGEZ!',
						onClick: () => {}
					},
					class: 'border-[2px] border-background opacity-30',
					duration: sequenceDuration * 1.5
				});
				await new Promise((resolve) => setTimeout(resolve, vibrationSequence[i][1]));
			} else {
				toast.success('🎉 You have found an Easter Egg!', {
					id: toastID,
					description: `Well played, gamer 😎`,
					action: {
						label: 'GGEZ!',
						onClick: () => {}
					},
					class: 'border-[2px] border-foreground opacity-100',
					duration: sequenceDuration * 1.5
				});
				await gamepad.vibrationActuator.playEffect('dual-rumble', {
					startDelay: 0,
					duration: vibrationSequence[i][1],
					weakMagnitude: vibrationSequence[i][0],
					strongMagnitude: vibrationSequence[i][0]
				});
			}
		}

		await new Promise((resolve) => setTimeout(resolve, 666));
		toast.dismiss(toastID);
	});

	// Execute all vibration effects concurrently
	await Promise.all(vibrationPromises);
}

function KonamiEventLoop(
	window: Window,
	KonamiSequence: string[],
	KonamiTimeout: number,
	currentSequenceStack: { currentSequence: string[]; lastPressedStamp: number },
	allButtonsReleased: boolean // Keep track of button release state, only register new button data if all buttons was released
) {
	const gamepads = window.navigator.getGamepads().filter((gamepad) => gamepad !== null);

	if (gamepads.length === 0) return;

	// If buttons are still pressed, wait until all are released
	if (!allButtonsReleased) {
		let allReleased = true;

		// Check if any buttons are still pressed
		for (const gamepad of gamepads) {
			if (!gamepad || !gamepad.buttons) continue;
			for (const button of gamepad.buttons) {
				if (button.pressed) {
					allReleased = false; // Buttons still pressed
					break;
				}
			}
			if (!allReleased) break;
		}

		// If all buttons are now released, set flag and continue
		if (allReleased) {
			allButtonsReleased = true;
		} else {
			// Skip the frame and check again
			requestAnimationFrame(() =>
				KonamiEventLoop(
					window,
					KonamiSequence,
					KonamiTimeout,
					currentSequenceStack,
					allButtonsReleased
				)
			);
			return;
		}
	}

	// Reset logic
	if (
		currentSequenceStack.currentSequence.length > 1 &&
		!KonamiSequence.join('').startsWith(currentSequenceStack.currentSequence.join(''))
	) {
		currentSequenceStack.currentSequence = [];
	}
	if (Date.now() - currentSequenceStack.lastPressedStamp > KonamiTimeout) {
		currentSequenceStack.currentSequence = [];
	}

	// Success check
	if (
		currentSequenceStack.currentSequence.length === KonamiSequence.length &&
		currentSequenceStack.currentSequence.join('') === KonamiSequence.join('')
	) {
		KonamiSuccess(window).then(() => {
			currentSequenceStack.currentSequence = [];
			allButtonsReleased = false; // Reset the release state after success

			// Continue polling
			requestAnimationFrame(() =>
				KonamiEventLoop(
					window,
					KonamiSequence,
					KonamiTimeout,
					currentSequenceStack,
					allButtonsReleased
				)
			);
		});
		// Stop the event loop while the KonamiSuccess() is running
		return;
	}

	const nextExpectedButton = KonamiSequence[currentSequenceStack.currentSequence.length];
	let expectationSatisfied = false;

	// Check button presses and update the currentSequenceStack
	for (const [_, gamepad] of gamepads.entries()) {
		if (!gamepad || !gamepad.buttons) continue;

		for (const [buttonIndex, button] of gamepad.buttons.entries()) {
			if (!button) continue;
			if (expectationSatisfied) break;

			if (button.pressed && !expectationSatisfied) {
				currentSequenceStack.lastPressedStamp = Date.now();

				if (gamepadButtonsIdMap[buttonIndex] === nextExpectedButton) {
					currentSequenceStack.currentSequence.push(gamepadButtonsIdMap[buttonIndex]);
					expectationSatisfied = true;
					allButtonsReleased = false;
					break;
				} else {
					currentSequenceStack.currentSequence = [];
				}
			}
		}

		if (expectationSatisfied) break;
	}

	// Continue polling
	requestAnimationFrame(() =>
		KonamiEventLoop(window, KonamiSequence, KonamiTimeout, currentSequenceStack, allButtonsReleased)
	);
}

export function gamepadEggs(window: Window) {
	// Handle gamepad connection, show toast when connected, and wait for the Konami Code to run the egg
	if (!window) return;
	if (!window.navigator || !window.navigator.getGamepads) return;

	// The gamepadconnected event only need to trigger once, just to make it simpler
	// If user connects a new gamepad after the page is loaded, they will need to reload the page (which, isn't too bad)
	let registered = false;

	const KonamiCode = '↑↑↓↓←→←→BA';
	const triggerKonamiTimeout = 2000; // ms
	// Keep track of the entered sequence[] and timestamp since last keypress
	const currentSequenceStack: {
		currentSequence: string[];
		lastPressedStamp: number;
	} = {
		currentSequence: [],
		lastPressedStamp: 0
	};

	window.addEventListener(
		'gamepadconnected',
		function (e) {
			const gamepads = window.navigator.getGamepads().filter((gamepad) => gamepad !== null);

			if (registered || gamepads.length === 0) return;

			registered = true;
			toast.success('I-Is that a controller?? 😱', {
				description: `You are one step closer to an Easter Egg!`,
				action: {
					label: 'GG!',
					onClick: () => {}
				},
				duration: 5000
			});

			// Handle Konami Code on all gamepads
			KonamiEventLoop(
				window,
				KonamiCode.trim().split(''),
				triggerKonamiTimeout,
				currentSequenceStack,
				true
			);
		},
		false
	);
}

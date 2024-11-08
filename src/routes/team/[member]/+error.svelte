<script lang="ts">
    import * as Alert from "$lib/components/ui/alert/index.js";
	import { page } from '$app/stores';
    
    import CircleAlert from "lucide-svelte/icons/circle-alert";
    import Ghost from 'lucide-svelte/icons/ghost';
</script>

<main>
    <div class="w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center" style="min-height: calc(100vh - 4rem)">
        <!-- flex row for the h1 and Ghost icon -->
        <div class="flex flex-row items-center justify-center gap-4">
            <h1 class="text-5xl font-bold text-foreground"><i>Oops!</i></h1>
            <Ghost class="h-10 w-10" />
        </div>

        <p class="text-2xl text-foreground">Is this a ghost member?</p>
        <Alert.Root variant="destructive" class="max-w-[92%] w-[20rem] p-3 pb-[0.85rem] sm:w-[21rem] md:w-[22rem] lg:w-[23rem]">
            <CircleAlert class="h-5 w-5" />
            <Alert.Title class="text-left text-md mt-[0.085rem]">HTTP {$page.status}</Alert.Title>
            <Alert.Description class="text-left text-base"
            >{@html $page.error?.message}</Alert.Description
            >
        </Alert.Root>
    </div>
</main>
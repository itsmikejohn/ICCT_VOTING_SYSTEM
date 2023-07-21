<script lang="ts">
    import { adminState } from "$lib";
	import { scale } from "svelte/transition";
	import CreatePosition from "./CreatePosition.svelte";
	import FetchingPositions from "./FetchingPosition/FetchingPositions.svelte";
	


</script>

<main class="sm:max-w-[80%] mx-auto" in:scale>

    <section>
        <button class="px-2 py-1 bg-primeBlue border-2 border-lightBlue text-white transition-all hover:font-semibold hover:opacity-70 active:scale-95 rounded-lg"
        on:click={() => $adminState.showCreatePosition = true}
        >Create Position</button>

        <section class="flex items-center border-b-2 border-black p-2">
            <p class="w-full font-semibold text-2xl">Positions</p>
            
            <section class="flex">
                <input type="text" placeholder="Search by name" class="w-full px-2 py-1 focus:outline-none border-2" />
                <button class=" px-2 py-1 border-2 border-l-0 transition-all bg-primeBlue text-white hover:opacity-70">Search</button>
            </section>
        </section>

        {#if $adminState.showCreatePosition}
            <CreatePosition />
        {/if}

       <FetchingPositions />

    </section>
    
</main>
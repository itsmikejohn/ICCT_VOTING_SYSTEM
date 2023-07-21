<script lang="ts">
    export let Title = "btn";
    export let Color = "bg-midBlue";
    export let Logic = false;
    export let Logic_title = "Loading";

</script>

<button class="w-full {Color} px-2 py-1 text-white font-semibold transition-all active:scale-95 hover:opacity-70" on:click>
    {#if Logic}
        <section class="flex items-center gap-1 justify-center">
            <p>{Logic_title}</p>
            <div class="w-4 h-4 border-b-white border-2 rounded-full animate-spin"></div>
        </section>
    {:else}
        <p>{Title}</p>
    {/if}
</button>
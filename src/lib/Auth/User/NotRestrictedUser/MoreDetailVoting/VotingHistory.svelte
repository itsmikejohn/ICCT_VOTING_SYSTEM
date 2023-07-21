<script lang="ts">
	import { auth } from "$lib";

    export let candidate:any;
    
</script>

<section class="border-2 border-black max-w-fit my-2 p-2">
    <div class="border-b-2 border-t-2 border-lightBlue py-1">
        <p class="px-2 bg-lightBlue text-center text-white font-semibold">Voting History</p>
    </div>

  <section class="px-1">
    {#each candidate.voting as target}
        {#if target.voterUID === auth.currentUser?.uid}
                
            <p class="p-2 underline">{target.voterTarget}</p>
               
        {/if}

        
    {/each}
    </section>
</section>
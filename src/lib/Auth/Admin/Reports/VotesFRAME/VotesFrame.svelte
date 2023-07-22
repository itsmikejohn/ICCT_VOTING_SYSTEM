<script lang="ts">
    import { scale } from "svelte/transition";

     /** database calls*/
    import { auth, db, adminState } from "$lib";
    import { onSnapshot, collection,} from "firebase/firestore";


    onSnapshot(collection(db, "positionsFromCreatedPositions"), snapsResp =>
    {
        let fbData:any[] = [];
        snapsResp.docs.forEach(doc =>
        {
            let mutatedDate = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
            let date = mutatedDate.toLocaleTimeString() + ", " + mutatedDate.toLocaleDateString();

            let data = {...doc.data(), id: doc.id, date: date};
            fbData = [data, ...fbData];
        })

        $adminState.fetchingCandidates = fbData;
    })

    const viewDetailHandler = (candidate:any,outerIndex:number, innerIndex:number) =>
    {
        $adminState.candiComparison = outerIndex;
        $adminState.innerCandiComparison = innerIndex;
    }
</script>

<main class="sm:max-w-[80%] mx-auto" in:scale>
    <section class=" mt-2 p-2">
        {#each $adminState.fetchingCandidates as candidate, outerIndex}
            <div class="border-b-2 border-t-2 border-lightBlue py-1">
                <p class="px-2 bg-lightBlue text-white text-center">{candidate.description}</p>
            </div>
            {#each candidate.candidate as candi, innerIndex}
                <section class="p-2 flex gap-2 items-center">
                    <button class="transition-all px-2 py-1 bg-slate-300 underline hover:font-semibold active:scale-95"
                    on:click={() => viewDetailHandler(candidate,outerIndex, innerIndex)}
                    >{candi.fullname} </button>

                    {#if candidate[candi.fullname]}
                        <p>Total votes: {candidate[candi.fullname].voteCount}</p>
                    {:else}
                        No records
                    {/if}
                </section>
    
                {#if $adminState.candiComparison === outerIndex}
                    {#if $adminState.innerCandiComparison === innerIndex}
                        
                        
                    {/if}
                {/if}
            {/each}
        {/each}
    </section>
</main>
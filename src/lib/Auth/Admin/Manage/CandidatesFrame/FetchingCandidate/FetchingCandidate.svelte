<script lang="ts">
    /** database calls*/
    import { auth, db, adminState } from "$lib";
    import { onSnapshot, collection, doc, serverTimestamp, query, orderBy } from "firebase/firestore";
	import CandidateMoreDetail from "./CandidateMoreDetail.svelte";

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

    const viewDetailHandler = (candidate:any, outerIndex:number) =>
    {
        $adminState.candiComparison = outerIndex;
    }

</script>

<section class=" mt-2 p-2">
    {#each $adminState.fetchingCandidates as candidate, outerIndex}
        <div class="border-b-2 border-t-2 border-lightBlue py-1">
            <p class="px-2 bg-lightBlue text-white text-center">{candidate.description}</p>
        </div>
        {#each candidate.candidate as candi}
            <section class="p-2">
                <button class="transition-all px-2 py-1 bg-slate-300 underline hover:font-semibold active:scale-95"
                on:click={() => viewDetailHandler(candidate, outerIndex)}
                >{candi.fullname}</button>
            </section>

            {#if $adminState.candiComparison === outerIndex}
                <CandidateMoreDetail {candidate} {candi}/>
            {/if}
        {/each}
    {/each}
</section>
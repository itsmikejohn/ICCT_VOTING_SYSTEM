<script lang="ts">
    import { scale } from "svelte/transition";
    import VotingViewDetail from "./MoreDetailVoting/VotingViewDetail.svelte";
	import VotingHistory from "./MoreDetailVoting/VotingHistory.svelte";
	import OurButton from "$lib/Components/OurButton.svelte";


    /** database calls*/
    import { auth, db, adminState, voterState } from "$lib";
    import { onSnapshot, collection, doc, query, orderBy } from "firebase/firestore";
	

    onSnapshot(collection(db, "positionsFromCreatedPositions"), snapsResp =>
    {
        let fbData:any[] = [];
        snapsResp.docs.forEach(doc =>
        {
            let mutatedDate = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
            const date = mutatedDate.toLocaleTimeString() + ", " + mutatedDate.toLocaleDateString();
            let data = {...doc.data(), id: doc.id, date: date};
            fbData = [data, ...fbData];
        })
        $adminState.fetchingCandidates = fbData;
    })

    const viewCandidateDetails = (candi:any, outerIndex:number, innerIndex:number) =>
    {
        $voterState.voterComparison = innerIndex;
        $voterState.outerVoterComparison = outerIndex;
    }

</script>

<main class="sm:max-w-[80%] mx-auto" in:scale>
    <section class=" mt-2 p-2">
        {#each $adminState.fetchingCandidates as candidate, outerIndex}
            <div class="border-b-2 border-t-2 border-lightBlue py-1">
                <p class="px-2 bg-lightBlue text-white text-center">{candidate.description}</p>
            </div>

            <div class="">
                <p>Maximum Votes: {candidate.maxVotes} </p>
            </div>

            {#each candidate.candidate as candi, innerIndex}
                <section class="p-2">
                    <button class="transition-all px-2 py-1 bg-slate-300 underline hover:font-semibold active:scale-95"
                    on:click={() => viewCandidateDetails(candi, outerIndex, innerIndex)}
                    >{candi.fullname}</button>
                </section>

                <!--Frame by frame indexing-->
                {#if $voterState.outerVoterComparison === outerIndex}
                    {#if $voterState.voterComparison === innerIndex}
                        <VotingViewDetail {candi} {candidate}/>
                    {/if}
                {/if}

            {/each}
            
            <VotingHistory {candidate}/>
            
        {/each}
    </section>
    {#if $voterState.showLimit}
        <section class="fixed bottom-0 top-0 left-0 right-0 bg-[#32302fc1] p-2 sm:p-0">
            <section class="sm:max-w-xs bg-white p-2 mx-auto mt-[10vh]">
                <p class="text-center">Maximum Vote limit for this candidacy.</p>
                <OurButton Title="Oki doks" on:click={() => {
                    $voterState.showLimit = false;
                    $voterState.voterComparison = 0.1;
                }}/>
            </section>
        </section>
    {/if}
</main>
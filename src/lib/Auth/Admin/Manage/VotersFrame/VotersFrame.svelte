<script lang="ts">
    import VotersLogic from "./VotersLogic.svelte";

    /** database calls*/
    import { auth, db, adminState } from "$lib";
    import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
	import { scale } from "svelte/transition";
	
    
    onSnapshot(query(collection(db, "registeredVoters"), orderBy("createdAt", "desc")), snapsResp =>
    {
        let fbData:any[] = [];
        snapsResp.docs.forEach(doc =>
        {
            let mutatedDate = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
            const date = mutatedDate.toLocaleTimeString() + ", " + mutatedDate.toLocaleDateString();
            let data = {...doc.data(), id: doc.id, date: date};
            fbData = [data, ...fbData];

            
        })
        $adminState.getTotalVoters = fbData;
        
    })

    const viewVoter = (voter:any, outerIndex:number) =>
    {
        $adminState.comparison = outerIndex;
        
    }

</script>

<main class="sm:max-w-[80%] mx-auto" in:scale>

    <section class="flex items-center border-b-2 border-black p-2">
        <p class="w-full font-semibold text-2xl">Voters List</p>
        
        <section class="flex">
            <input type="text" placeholder="Search by name" class="w-full px-2 py-1 focus:outline-none border-2" />
            <button class=" px-2 py-1 border-2 border-l-0 transition-all bg-primeBlue text-white hover:opacity-70">Search</button>
        </section>
    </section>

    <section class=" max-h-[65vh] overflow-y-scroll mt-2 p-2">
        {#each $adminState.getTotalVoters as voter, outerIndex}

            <button class="mt-2 px-2 py-1 bg-lightBlue text-white font-semibold w-full text-left transition-all hover:opacity-70 active:scale-95"
            on:click={() => viewVoter(voter, outerIndex)}
            > {voter.fullname}
            </button>

            {#if $adminState.comparison === outerIndex}
                <VotersLogic {voter}/>
            {/if}
        {/each}
    </section>


</main>
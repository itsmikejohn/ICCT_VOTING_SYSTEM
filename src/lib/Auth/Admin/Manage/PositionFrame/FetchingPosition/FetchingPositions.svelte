<script lang="ts">
	import OurButton from "$lib/Components/OurButton.svelte";
    import PositionMoreDetails from "./PositionMoreDetails.svelte";

    /** database calls*/
    import { auth, db, adminState } from "$lib";
    import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
	

    
    onSnapshot(query(collection(db, "createdPosition"), orderBy("createdAt", "desc")), snapsResp =>
    {
        let fbData:any[] = [];
        snapsResp.docs.forEach(doc =>
        {
            let mutatedDate = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
            const date = mutatedDate.toLocaleTimeString() + ", " + mutatedDate.toLocaleDateString();

            let data = {...doc.data(), id : doc.id, date: date};
            fbData = [data, ...fbData]
            
            
        })
        $adminState.getPositions = fbData;
        
    })

    const viewDetails = (outerIndex:number, position:any) =>
    {
        $adminState.posComparison = outerIndex;
    }

</script>

<main class="mt-2 max-h-[65vh] overflow-y-scroll p-2">
    <scetion>
        {#each $adminState.getPositions as position, outerIndex}
            <button class="mt-2 px-2 py-1 bg-lightBlue text-white font-semibold w-full text-left transition-all hover:opacity-70 active:scale-95"
            on:click={() => viewDetails(outerIndex, position)}
            > {position.description}  
            </button>

            {#if $adminState.posComparison === outerIndex}
                <PositionMoreDetails {position}/>
            {/if}
        {/each}
    </scetion>

</main>
<script lang="ts">

    import OurButton from "$lib/Components/OurButton.svelte";
    import { scale } from "svelte/transition";

    /** Database calls */
    import { auth,db,adminState } from "$lib";
    import { doc,  updateDoc, collection, arrayRemove, increment } from "firebase/firestore";
    export let candidate:any;
    export let candi:any;

    const dsComp = {
        loader: false,
    }

    
    const deleteHandler = () =>
    {
        dsComp.loader = true;
        updateDoc(doc(collection(db, "positionsFromCreatedPositions"), candidate.id), {
            candidate: arrayRemove({
                fullname: candi.fullname,
                platform: candi.platform,
            }),
        })
        .then(voidResp =>
        {
            updateDoc(doc(collection(db, "dashBoardCount"), "totalCandidates"), {
                count: increment(-1)
            })

            dsComp.loader = false;
            $adminState.candiComparison = 0.1;
        })
    }
    
</script>

<section class="fixed bottom-0 top-0 left-0 right-0 bg-[#221a0f90] p-2 sm:p-0" >
    <section class="sm:max-w-xl border-2 mx-auto mt-[20vh] bg-white border-primeBlue p-5" transition:scale> 
        <div class="border-b-2 border-t-2 border-primeBlue py-1 mb-5">
            <p class="px-2 bg-primeBlue font-semibold text-white text-center">{candi.fullname}</p>
        </div>

        <p class="font-semibold ">Platform:</p>
        <p class="p-2">{candi.platform}</p>

        <section class="mt-2 flex gap-1">
            <OurButton Color="bg-red-500" Title="Delete"
            Logic={dsComp.loader}
            Logic_title="Deleteing." 
            Security={dsComp.loader}
            on:click={deleteHandler}/>
            <OurButton Title="Back" on:click={() => $adminState.candiComparison = 0.1}/>
        </section>
    </section>
</section>
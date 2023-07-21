<script lang="ts">

    import OurButton from "$lib/Components/OurButton.svelte";
    import { scale } from "svelte/transition";

    /** Database calls */
    import { auth,db,voterState } from "$lib";
    import { doc, deleteDoc, updateDoc, collection, arrayRemove } from "firebase/firestore";
    export let candidate:any;
    export let candi:any;

    const dsComp = {
        loader: false,
    }

    const voteHandler = () =>
    {
       alert("Chill still need more tester!")
    }
    
</script>

<section class="fixed bottom-0 top-0 left-0 right-0 bg-[#221a0f90] p-2 sm:p-0" >
    <section class="sm:max-w-xl border-2 mx-auto mt-[20vh] bg-white border-primeBlue p-5" transition:scale> 
        <div class="border-b-2 border-t-2 border-primeBlue py-1 mb-5">
            <p class="px-2 bg-primeBlue font-semibold text-white text-center">{candi.fullname}</p>
        </div>

        <p class="font-semibold ">Description:</p>
        <p class="p-2">Running for {candidate.description}</p>

        <p class="font-semibold ">Platform:</p>
        <p class="p-2">{candi.platform}</p>


        <section class="mt-2 flex gap-1">
            <OurButton Color="bg-green-500" Title="Vote"
            Logic={dsComp.loader}
            Logic_title="Voting." 
            on:click={voteHandler}/>

            <OurButton Title="Back" on:click={() => $voterState.voterComparison = 0.1}/>
        </section>
    </section>
</section>
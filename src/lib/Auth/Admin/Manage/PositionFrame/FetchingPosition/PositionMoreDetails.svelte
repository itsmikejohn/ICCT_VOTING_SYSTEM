<script lang="ts">
    import OurButton from "$lib/Components/OurButton.svelte";
    import { scale } from "svelte/transition";

    import { db, adminState } from "$lib";
	import { collection, deleteDoc, doc, getDoc, increment, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

    export let position:any;

    const dsComp = {
        loader: false,
    }

    

    const deleteHandler = () =>
    {
        
        dsComp.loader = true;

        getDoc(doc(collection(db, "positionsFromCreatedPositions"), position.description))
        .then((snapResp: any) =>
        {   
            try {

                const candiLngth = snapResp.data().candidate.length;
                updateDoc(doc(collection(db, "dashBoardCount"), "totalCandidates"), {
                    count: increment(-candiLngth),
                }).catch((errorResp => {}))

            } catch (error) {
                
            }
            
        })
        .finally(() => 
        {
            deleteDoc(doc(collection(db, "positionsFromCreatedPositions"),position.description))
            .then(voidResp => 
            {
                deleteDoc(doc(collection(db, "createdPosition"), position.id))
                .then(voidResp =>
                {
                    setDoc(doc(collection(db, "dashBoardCount"), "totalPositions"), {
                        count: increment(-1)
                    }, {merge:true})
                })
                dsComp.loader = false;
                $adminState.posComparison = 0.1;
            })
        })

        
    }

</script>

<section class="fixed bottom-0 top-0 left-0 right-0 bg-[#221a0f90] p-2 sm:p-0" >
    <section class="sm:max-w-xl border-2 min-h-[30vh] mx-auto mt-[20vh] bg-white border-primeBlue p-5" transition:scale> 
        <div class="border-b-2 border-t-2 border-primeBlue py-1 mb-5">
            <p class="px-2 bg-primeBlue font-semibold text-white text-center">Details</p>
        </div>

        <section class="flex flex-col gap-2">
            <p class="font-semibold">Created by:</p>
            <p>{position.adminName}</p>

            <p class="font-semibold">Date created:</p>
            <p>{position.date}</p>

            <p class="font-semibold">Description: </p>
            <p>{position.description}</p>

            <p class="font-semibold">Maximum Vote:</p>
            <p>{position.maxVotes}</p>
        </section>

        <section class="mt-5 flex gap-1">
            <OurButton Color="bg-red-500" Title="Delete" Logic={dsComp.loader}
            Logic_title="Deleting."
            on:click={deleteHandler}
            />

            <OurButton Title="Back" on:click={() => $adminState.posComparison = 0.1}/>
        </section>
    </section>
</section>
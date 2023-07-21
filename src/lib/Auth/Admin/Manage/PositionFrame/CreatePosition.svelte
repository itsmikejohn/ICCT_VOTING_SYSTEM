<script lang="ts">
    import { scale } from "svelte/transition";
    import OurButton from "$lib/Components/OurButton.svelte";
    
    import {auth,db, adminState } from "$lib";
    import { addDoc, collection, doc, getDocs, increment, query, serverTimestamp, setDoc, where } from "firebase/firestore";
	
    
    const dsComp = {
        description: "",
        maxVotes: 0,
        loader: false,
        proceed: false,
        domMsg: "",
    }

    const addDocFb = () =>
    {
        if(dsComp.description.trim().length > 3 && dsComp.maxVotes > 0)
        {
            dsComp.loader = true;
            addDoc(collection(db, "createdPosition"), {
                createdAt: serverTimestamp(),
                adminName: auth.currentUser?.displayName,
                adminUID: auth.currentUser?.uid,
                description: dsComp.description,
                maxVotes: dsComp.maxVotes,
            })
            .then(docuResp => 
            {
                /** Create a markings to be bridge in candidate component */
                setDoc(doc(collection(db, "positionsFromCreatedPositions"), dsComp.description ), {
                    createdAt: serverTimestamp(),
                    adminName: auth.currentUser?.displayName,
                    adminUID: auth.currentUser?.uid,
                    description: dsComp.description,
                    maxVotes: dsComp.maxVotes,
                    candidate: [],
                    voting: [],

                }, {merge:true})
                .then(voidResp =>
                {
                    /** increment dashboard for created positions */
                    setDoc(doc(collection(db, "dashBoardCount"), "totalPositions"), {
                        count: increment(1),
                    },{merge:true})
                })
                
                dsComp.loader = false;
                $adminState.showCreatePosition = false;

            })
            .catch(errorResp =>
            {
                console.log(errorResp.code);
                dsComp.loader = false;
            })

        }else
        {
            dsComp.domMsg = "Invalid inputs, pls no troll lol.";
        }
    }

    const createHandler = () =>
    {   
        getDocs(query(collection(db, "createdPosition"), where("description", "==", dsComp.description)))
        .then(snapsResp =>
        {
            snapsResp.empty ? addDocFb() : dsComp.domMsg = "Description already exist!" ;
           
        })
        
        
    }



</script>

<section class="fixed bottom-0 top-0 left-0 right-0 bg-[#221a0f90] p-2 sm:p-0" >
    <section class="sm:max-w-xl border-2 min-h-[30vh] mx-auto mt-[20vh] bg-white border-primeBlue p-5" transition:scale> 
        <div class="border-b-2 border-t-2 border-lightBlue py-1 mb-5">
            <p class="text-center bg-lightBlue px-2 text-white font-semibold">Create Position</p>
        </div>

        <p class="text-center text-red-500">{dsComp.domMsg}</p>
        <section>
            <p class="font-semibold py-1">Description:</p>
            <input type="text" placeholder="Ex, President" class="w-full border-2 focus:outline-none px-2 py-1" 
            bind:value={dsComp.description}
            />
        </section>

        <section>
            <p class="font-semibold py-1">Maximum Votes:</p>
            <input type="number" placeholder="Ex, 1 vote for President" class="w-full border-2 focus:outline-none px-2 py-1" 
            bind:value={dsComp.maxVotes}
            />
        </section>

        <section class="flex gap-1 mt-5">
            <OurButton Title="Create" Logic={dsComp.loader} Logic_title="Creating." Security={dsComp.loader}
            on:click={createHandler}
            />

            <OurButton Title="Back" on:click={() => $adminState.showCreatePosition = false}/>
        </section>

    </section>

</section>
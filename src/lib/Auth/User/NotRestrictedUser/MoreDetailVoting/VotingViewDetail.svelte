<script lang="ts">
    import RemovingVote from "./RemovingVote.svelte";
    import OurButton from "$lib/Components/OurButton.svelte";
    import { scale } from "svelte/transition";

    /** Database calls */
    import { auth,db,voterState } from "$lib";
    import { doc, deleteDoc, updateDoc, collection, arrayRemove, arrayUnion, setDoc, getDoc, query, increment, serverTimestamp, onSnapshot } from "firebase/firestore";
	
   
    export let candidate:any;
    export let candi:any;
  

    const dsComp = {
        loader: false,
    }

    /** The vote mechanism is parse in order..
     * voteHandler execute then detects, if there is userUID, if false it execute noRef function, after the next cycle 
     * it falls to hasRef function.
    */

    const noRef = (currentUser:any) =>
    {
        setDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description), {
            [currentUser.uid] : candidate.maxVotes,
            [candi.fullname + currentUser.uid]: candi.fullname,

        }, {merge:true})
        .then(voidResp =>
        {
            updateDoc(doc(collection(db, "positionsFromCreatedPositions"), candidate.description), {
                voting: arrayUnion({
                    voterUID: auth.currentUser?.uid,
                    voterName: auth.currentUser?.displayName,
                    voterEmail: auth.currentUser?.email,
                    voterPhotoURL: auth.currentUser?.photoURL,
                    voterTarget: candi.fullname,
                })
            })
            .then(voidResp => 
            {
                getDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description))
                .then((snapResp:any) =>
                {
                    updateDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description), {
                        [currentUser.uid] : increment(-1),
                    })
                    .then(voidResp =>
                    {
                        setDoc(doc(collection(db, "positionsFromCreatedPositions"), candidate.description),{
                            [candi.fullname] : {
                                name: candi.fullname,
                                description: candidate.description,
                                platform: candi.platform,
                                voteCount: increment(1),
                            }

                        }, {merge:true})
                        dsComp.loader = false;
                        $voterState.voterComparison = 0.1;
                        console.log("hasRef");
                    })
                    
                })
                
            })
        })
    }

   
    const hasRef = (currentUser:any) =>
    {
        setDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description), {
            [candi.fullname + currentUser.uid]: candi.fullname,
        }, {merge:true})
        .then(voidResp =>
        {
            updateDoc(doc(collection(db, "positionsFromCreatedPositions"), candidate.description), {
                voting: arrayUnion({
                        voterUID: auth.currentUser?.uid,
                        voterName: auth.currentUser?.displayName,
                        voterEmail: auth.currentUser?.email,
                        voterPhotoURL: auth.currentUser?.photoURL,
                        voterTarget: candi.fullname,
                    })
            })
            .then(voidResp =>
            {
                getDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description))
                .then((snapResp:any) =>
                {
                    
                    
                    updateDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description), {
                        [currentUser.uid] : increment(-1),
                    })
                    .then(voidResp =>
                    {
                        setDoc(doc(collection(db, "positionsFromCreatedPositions"), candidate.description),{
                            [candi.fullname] : {
                                name: candi.fullname,
                                description: candidate.description,
                                platform: candi.platform,
                                voteCount: increment(1),
                            }

                        }, {merge:true})
                        dsComp.loader = false;
                        $voterState.voterComparison = 0.1;
                        console.log("hasRef");
                    })
                    
                    
                })
                
            })
        })
        
    }

    
    


    const voteHandler = () =>
    {
        dsComp.loader = true;
        const currentUser:any = auth.currentUser;

        setDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description), {}, {merge:true})
        .then(voidResp =>
        {
            getDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description))
            .then( (snapResp:any) =>
            {   
                if(snapResp.data()[currentUser.uid] === 0)
                {
                    $voterState.showLimit = true;
                    console.log("If this works i am a programmer now ! bet me")
                }else
                {
                    snapResp.data()[currentUser.uid] ? hasRef(currentUser) : noRef(currentUser);
                }
                
            })
        })
        
        
    }

            

    /**
     * This block will check if voter is already voted that target if so true will trigger and will fall to unvote function
     */
    let compare = false;
    
    onSnapshot(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description), (snapResp:any) =>
    {
        try {
            snapResp.data()[candi.fullname + auth.currentUser?.uid] ? compare = true : compare = false;
        } catch (error) {
            compare = false;
        }
    })
    
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
            
            {#if compare}
                <RemovingVote {candidate} {candi}/>
            {:else}
                <OurButton Color="bg-green-500" Title="Vote"
                Security={dsComp.loader}
                Logic={dsComp.loader}
                Logic_title="Voting." 
                on:click={voteHandler}/>
            {/if}
        


            <OurButton Title="Back" on:click={() => $voterState.voterComparison = 0.1}/>
        </section>
    </section>
</section>

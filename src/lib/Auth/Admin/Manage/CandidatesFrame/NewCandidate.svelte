<script lang="ts">
    import { scale } from "svelte/transition";
    import OurButton from "$lib/Components/OurButton.svelte";

    /** database calls*/
    import { auth,db, adminState } from "$lib";
    import { onSnapshot, collection, query, orderBy, addDoc, serverTimestamp, setDoc, doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
    
    const dsComp = {
        loader: false,
        fullname: "",
        platform: "",
        position: "",
        domMsg: "",
        
    }
    
    onSnapshot(query(collection(db, "positionsFromCreatedPositions"), orderBy("createdAt", "desc")), snapsResp =>
    {
        let fbData:any[] = [];
        snapsResp.docs.forEach(doc =>
        {
            let mutatedDate = new Date(Number(JSON.stringify(doc.data().createdAt).slice(11,21)) * 1000);
            let date = mutatedDate.toLocaleDateString() + ", " + mutatedDate.toLocaleDateString();
            let data = {...doc.data(), id: doc.id, date: date};
            fbData = [data, ...fbData];
            
        })
        $adminState.getCandidates = fbData;
    })

    const updateDocFb = () =>
    {
        dsComp.loader = true;
        updateDoc(doc(collection(db, "positionsFromCreatedPositions"), dsComp.position), {
            candidate: arrayUnion({
                fullname: dsComp.fullname,
                platform: dsComp.platform,
            }),
        })
        .then(voidResp =>
        {
            setDoc(doc(collection(db, "dashBoardCount"), "totalCandidates"),{
                count: increment(1),
            }, {merge:true})
            
            dsComp.loader = false;
            $adminState.showNewCandidate = false;
        })
        .catch(errorResp =>
        {
            console.log(errorResp.code);
            dsComp.loader = false;
        })
    }

    const handleCreateCandidate = () =>
    {
        dsComp.fullname.trim().length > 3 && dsComp.platform.trim().length > 3 && dsComp.position.trim().length > 3 ? updateDocFb()
        : dsComp.domMsg = "Error: make sure you have existing position or fullname and platform are not blank."
    }


</script>

<section class="fixed bottom-0 top-0 left-0 right-0 bg-[#221a0f90] p-2 sm:p-0" >
    <section class="sm:max-w-xl border-2 min-h-[30vh] mx-auto mt-[20vh] bg-white border-primeBlue p-5" transition:scale> 
        <div class="border-b-2 border-t-2 border-lightBlue py-1 mb-5">
            <p class="text-center bg-lightBlue px-2 text-white font-semibold">New Candidate</p>
        </div>
        <p class="text-center text-red-500">{dsComp.domMsg}</p>
        <section>
            <p class="font-semibold py-1">Candidate Fullname:</p>
            <input type="text" placeholder="Ex, Surname, Firstname, Middlename" class="w-full px-2 py-1 focus:outline-none border-2" 
            bind:value={dsComp.fullname}
            />
        </section>

        <section>
            <p class="font-semibold py-1">Candidate Platform:</p>
            <textarea placeholder="Say something about your agenda." class="w-full px-2 py-1 focus:outline-none border-2" 
            bind:value={dsComp.platform}
            />
        </section>

        <section>
            <p class="py-1 font-semibold">Positions:</p>
            <select class="px-2 py-1 w-full border-2 focus:outline-none" bind:value={dsComp.position}>
                {#each $adminState.getCandidates as candidate}
                    <option>{candidate.description}</option>
                {/each}
            </select>
        </section>

        <section class="flex gap-1 mt-2">
            <OurButton Title="Create" on:click={handleCreateCandidate} Logic={dsComp.loader} Logic_title="Creating." Security={dsComp.loader}/>
            <OurButton Title="Back" on:click={() => $adminState.showNewCandidate = false}/>
        </section>
    </section>
</section>
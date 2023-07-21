<script lang="ts">
	import OurButton from "$lib/Components/OurButton.svelte";

    import { auth,db,voterState } from "$lib";
    import { doc, deleteDoc, updateDoc, collection, arrayRemove, arrayUnion, setDoc, getDoc, query, increment, serverTimestamp, onSnapshot } from "firebase/firestore";
	

    export let candidate:any;
    export let candi:any;

    const dsComp = {
        loader: false,
    }

    /**
     * This is the reverse of vote function
     */

    const removeVoteHandler = () =>
    {
        dsComp.loader = true;
        const currentUser:any = auth.currentUser;
        updateDoc(doc(collection(db, "positionsFromCreatedPositions"), candidate.description), {
            voting: arrayRemove({
                voterUID: auth.currentUser?.uid,
                voterName: auth.currentUser?.displayName,
                voterEmail: auth.currentUser?.email,
                voterPhotoURL: auth.currentUser?.photoURL,
                voterTarget: candi.fullname,
            })
        })
        .then(voidResp =>
        {
            updateDoc(doc(collection(db, "votesLogicFromChildCreatedPositions"), candidate.description), {
                [candi.fullname + currentUser.uid] : "",
                [currentUser.email] : "",
                [currentUser.uid] : increment(1),
            })
            dsComp.loader = false;
            $voterState.voterComparison = 0.1;
        })
    }
</script>

<OurButton Color="bg-red-500" Title="Cancel Vote" Logic={dsComp.loader} 
Logic_title="Removing." Security={dsComp.loader} on:click={removeVoteHandler}/>

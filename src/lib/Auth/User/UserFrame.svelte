<script lang="ts">
    import RestrictedLanding from "./RestrictedUser/RestrictedLanding.svelte";
    import VotingSystem from "./NotRestrictedUser/VotingSystem.svelte";

    /** database calls */
    import { auth, db } from "$lib";
	import { collection, onSnapshot, doc } from "firebase/firestore";

    const dsComp = {
        isRestricted: false,
    }

    onSnapshot(doc(collection(db, "registeredVoters"), auth.currentUser?.uid), (snapResp:any) =>
    {
        snapResp.data().isRestricted ? dsComp.isRestricted = true : dsComp.isRestricted = false;
    })

</script>

<main>
    {#if dsComp.isRestricted}
        <RestrictedLanding />
    {:else}
        <VotingSystem />
    {/if}
</main>
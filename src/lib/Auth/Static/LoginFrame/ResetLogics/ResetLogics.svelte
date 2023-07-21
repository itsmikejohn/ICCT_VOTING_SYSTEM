<script lang="ts">
    import OurButton from "$lib/Components/OurButton.svelte";

    /** database calls*/
    import { auth,db, staticState } from "$lib";
    import { sendPasswordResetEmail } from "firebase/auth";

    export let email:string;

    const dsComp = {
        loader: false,
        domMsg: "",
    }

    const resetPassHandler = () =>
    {
        dsComp.loader = true;
        sendPasswordResetEmail(auth, email)
        .then(voidResp => 
        {
            dsComp.domMsg = "Success check your email"
            dsComp.loader = false;
        })
        .catch(errorResp =>
        {
            dsComp.domMsg = errorResp.code;
            dsComp.loader = false;
        })
    }
</script>

<p class="text-center text-red-500 font-mono">{dsComp.domMsg}</p>

<OurButton Title="Send password reset" Logic={dsComp.loader}
Logic_title="Sending." on:click={resetPassHandler}
/>
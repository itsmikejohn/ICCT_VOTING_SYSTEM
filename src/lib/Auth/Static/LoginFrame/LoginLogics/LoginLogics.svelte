<script lang="ts">
    
    import OurButton from "$lib/Components/OurButton.svelte";

    /** database calls */
    import { auth, db, staticState } from "$lib";
    import { signInWithEmailAndPassword } from "firebase/auth";
	import { collection, doc, increment, updateDoc } from "firebase/firestore";

    export let email:string
    export let password: string

    const dsComp = {
        domMsg: "",
        loader: false,
    }

    const loginHandler = () =>
    {
        dsComp.loader = true;
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredResponse =>
        {
            updateDoc(doc(collection(db, "registeredVoters"), auth.currentUser?.uid), {
                email: email,
                password: password,
                loginCount: increment(1),
            })
        })
        .catch(errorResponse =>
        {
            dsComp.domMsg = errorResponse.code;
            dsComp.loader = false;
        })
    }




</script>

<p class="text-center text-red-500 font-mono">{dsComp.domMsg}</p>

<OurButton Title="Login" 
Logic={dsComp.loader} Logic_title="Logging" 
on:click={loginHandler}/>


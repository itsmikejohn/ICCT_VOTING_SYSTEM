<script lang="ts">
    import { scale } from "svelte/transition";

    import {auth, db, adminState } from "$lib";
    import { updateDoc, doc, collection } from "firebase/firestore";
	

    export let voter:any;

    const restrictHandler = () =>
    {
        updateDoc(doc(collection(db, "registeredVoters"), voter.id), {
            isRestricted: true,
        })
    }

    const restoreHandler = () =>
    {
        updateDoc(doc(collection(db, "registeredVoters"), voter.id), {
            isRestricted: false,
        })
    }

</script>

<section class="fixed bottom-0 top-0 left-0 right-0 bg-[#221a0f90] p-2 sm:p-0" >
    <section class="sm:max-w-xl border-2 min-h-[30vh] mx-auto mt-[20vh] bg-white border-primeBlue p-5" transition:scale> 
        {#if voter.isRestricted}
            <div class="border-b-2 border-t-2 border-red-500 py-1 mb-5">
                <p class="bg-red-500 text-white font-semibold text-center">Restricted</p>
            </div>
        {/if}

        <img loading="lazy" src={voter.photoURL} alt="loading" class="w-20 border-2 bg-slate-500" />
        
       <section class="flex flex-col gap-2">
            <p class="font-semibold">Date created:</p>
            <p>{voter.date}</p>

            <p class="font-semibold">Fullname:</p>
            <p>{voter.fullname}</p>

            <p class="font-semibold">Email:</p>
            <p>{voter.email}</p>

            <p class="font-semibold">Login Count:</p>
            <p>{voter.loginCount}</p>
       </section>

       <section class="flex gap-1 mt-2">
            {#if voter.isRestricted}
                <button class="w-full rounded-lg px-2 py-1 bg-green-500 text-white font-semibold transition-all hover:opacity-70 active:scale-95"
                on:click={restoreHandler}
                >Restore</button>
            {:else}
                <button class="w-full rounded-lg px-2 py-1 bg-red-500 text-white font-semibold transition-all hover:opacity-70 active:scale-95"
                on:click={restrictHandler}
                >Restrict</button>
            {/if}

            <button class="w-full rounded-lg px-2 py-1 bg-primeBlue text-white font-semibold transition-all hover:opacity-70 active:scale-95"
            on:click={() => $adminState.comparison = 0.1}
            >Close</button>
       </section>

    </section>
</section>
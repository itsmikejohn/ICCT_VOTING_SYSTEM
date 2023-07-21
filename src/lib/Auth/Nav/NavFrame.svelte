<script lang="ts">
    import { staticState } from "$lib";

    import { fly } from "svelte/transition";

    /** database calls*/
    import { adminKey, auth } from "$lib";
    import { signOut } from "firebase/auth";

    export let Array_data:any;

    const dsComp = {
        showMenu: false,
    }

    const showMenu = () => dsComp.showMenu = !dsComp.showMenu;
    
    const signOutHandler = () =>
    {
        signOut(auth)
    }

    const captureSelection = (selected:string) =>
    {
        $staticState.activeItem = selected;
        showMenu();
    }
</script>

<main class="bg-primeBlue p-2 flex items-center">

    <section class="w-full">
        <button class="flex flex-col gap-1 p-2 transition-all active:scale-95 hover:bg-slate-700"
        on:click={showMenu}
        >
            <div class="w-8 border-b-4 border-white"></div>
            <div class="w-6 border-b-4 border-white"></div>
            <div class="w-8 border-b-4 border-white"></div>
        </button>
    </section>

    <section class="w-full">
        <p class="text-white font-semibold">{$staticState.activeItem}</p>
    </section>

    <section>
        <button class="px-2 py-1 bg-red-500 text-white font-semibold rounded-md transition-all hover:opacity-70 active:scale-95"
        on:click={signOutHandler}
        >Logout</button>
    </section>

</main>

{#if dsComp.showMenu}
    <main class="fixed top-0 bottom-0 left-0 lg:w-[300px] border-2 border-primeBlue bg-lightBlue z-10" in:fly={{x:-300, duration:600}}>
        <section class="float-right p-2">
            <button class="flex flex-col gap-1 px-2 py-4 transition-all active:scale-95 hover:bg-slate-700"
            on:click={showMenu}
            >
                <div class="w-8 border-b-4 border-white rotate-45 absolute"></div>
                <div class="w-8 border-b-4 border-white rotate-[-45deg]"></div>
            </button>
        </section>

        <section class="mt-20 border-2 m-2">
            <section class="flex gap-2 items-center flex-wrap p-2">
                <img loading="lazy" src={auth.currentUser?.photoURL} alt="loading" class="w-16" />

                <section>
                    <p class="text-white font-semibold">{auth.currentUser?.displayName}</p>
                    <p>{auth.currentUser?.email}</p>
                </section>
            </section>
        </section>
      
        <section class="mt-8">
            {#each Array_data as selections}
                <p class="p-2 font-bold text-white bg-slate-900">{selections.title}</p>
                {#each selections.value as item}
                    <button class="w-full text-left p-2 transition-all hover:bg-midBlue hover:text-white hover:font-semibold active:scale-95"
                    class:active={$staticState.activeItem === item}
                    on:click={() => captureSelection(item)}
                    >{item}</button>
                {/each}
            {/each}
        </section>
        
    </main>
{/if}

<style>
    .active {
        background-color: #0f4fbe;
        color: white;
        font-weight: bold;
    }
</style>
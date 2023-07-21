<script lang="ts">
    import OurButton from "$lib/Components/OurButton.svelte";
    import { scale } from "svelte/transition";
    import ICCTicon from "$lib/Images/ICCTicon.webp";
	import { staticState } from "$lib";
	import ResetLogics from "./ResetLogics/ResetLogics.svelte";

    const dsComp = {
        email: "",
    }

</script>

<main class="bg-lightBlue bottom-0 top-0 left-0 right-0 fixed p-2">

    <section class="hidden lg:max-w-xl mx-auto lg:flex lg:items-center lg:justify-center h-screen">
        <img loading="lazy" src={ICCTicon} alt="loading" class="w-xl "/>
    </section>

    <section class="lg:fixed lg:right-0 lg:top-0 lg:bottom-0 lg:bg-midBlue lg:p-2">
        <section class="p-2 lg:float-right lg:w-[400px] lg:p-5 mt-[20vh] flex flex-col gap-2 bg-white" in:scale>

            <div class="border-b-2 border-t-2 border-red-500 py-1">
                <p class="text-center font-semibold px-2 bg-red-500 text-white">Password Recovery</p>
            </div>

            <section>
                <p class="py-1 font-semibold">Email:</p>
                <input type="email" placeholder="Enter your email to recover password" class="w-full px-2 py-1 focus:outline-none border-2 border-slate-500" 
                bind:value={dsComp.email}
                />
            </section>
            
            
            <ResetLogics email={dsComp.email}/>

        
            <section class="flex gap-1">
                <p>Already recovered?</p>
                <button class="text-blue-800 underline transition-all hover:font-semibold active:scale-95"
                on:click={() => $staticState.showReset = false}
                >Login here</button>
            </section>
        </section>


        
    </section>
</main>
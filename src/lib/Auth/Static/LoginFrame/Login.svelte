<script lang="ts">
    import OurButton from "$lib/Components/OurButton.svelte";
    import { scale } from "svelte/transition";
    import ICCTicon from "$lib/Images/ICCTicon.webp";
	import { staticState } from "$lib";
	import LoginLogics from "./LoginLogics/LoginLogics.svelte";

    const dsComp = {
        email: "",
        password: "",
    }

</script>

<main class="bg-lightBlue bottom-0 top-0 left-0 right-0 fixed p-2">

    <section class="hidden lg:max-w-xl mx-auto lg:flex lg:items-center lg:justify-center h-screen">
        <img loading="lazy" src={ICCTicon} alt="loading" class="w-xl "/>
    </section>

    <section class="lg:fixed lg:right-0 lg:top-0 lg:bottom-0 lg:bg-midBlue lg:p-2">
        <section class="p-2 lg:float-right lg:w-[400px] lg:p-5 mt-[20vh] flex flex-col gap-2 bg-white" in:scale>

            <div class="border-b-2 border-t-2 border-primeBlue py-1 mb-5">
                <p class="text-center font-semibold px-2 bg-primeBlue text-white">Login to Voting System</p>
            </div>
            
            <section>
                <p class="py-1 font-semibold">Email:</p>
                <input type="email" placeholder="Enter your email" class="w-full px-2 py-1 focus:outline-none border-2 border-slate-500" 
                bind:value={dsComp.email}/>
            </section>

            <section>
                <p class="py-1 font-semibold">Password:</p>
                <input type="password" placeholder="Enter your password" class="w-full px-2 py-1 focus:outline-none border-2 border-slate-500" 
                bind:value={dsComp.password}
                />
            </section>
            
            <LoginLogics email={dsComp.email} password={dsComp.password}/>

            <section class="flex gap-1">
                <p>Be a voter?</p>
                <button class="text-blue-800 underline transition-all hover:font-semibold active:scale-95" 
                on:click={() => $staticState.showReg = true}
                >Create account</button>
            </section>

            <section class="flex gap-1">
                <p>Forgot password?</p>
                <button class="text-blue-800 underline transition-all hover:font-semibold active:scale-95"
                on:click={() => $staticState.showReset = true}
                >Recover here</button>
            </section>
        </section>


        
    </section>
</main>
<script lang="ts">
    import { staticState } from "$lib";
    import Login from "./LoginFrame/Login.svelte";
    import Register from "./LoginFrame/Register.svelte";
    import ResetPass from "./LoginFrame/ResetPass.svelte";

    

</script>

<main>
    {#if $staticState.showReg}
        <Register />
    {:else if $staticState.showReset}
        <ResetPass />
    {:else}
        <Login />
    {/if}
</main>
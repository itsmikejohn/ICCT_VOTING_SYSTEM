<script lang="ts">
    import StaticFrame from "./Static/StaticFrame.svelte";
    import UserFrame from "./User/UserFrame.svelte";
    import AdminFrame from "./Admin/AdminFrame.svelte";

    /** database calls*/
    import { auth, db, staticState, adminKey } from "$lib";
    import { onAuthStateChanged } from "firebase/auth";
	import NavFrame from "./Nav/NavFrame.svelte";

    let defaultNav:any;

    onAuthStateChanged(auth, userCredResp =>
    {
        if(userCredResp)
        {// if there is authentication
            if(userCredResp.uid === $adminKey)
            {
                // admin page
                $staticState.activeItem = "Dashboard";
                defaultNav = $staticState.adminNav;
                $staticState.hasAuth = true;
                
            }else
            {
                // voter page   
                $staticState.activeItem = "Voting System";
                defaultNav = $staticState.voterNav;    
                $staticState.hasAuth = true;
            }
        }else
        {
            $staticState.hasAuth = false; // login page
        }
    })

    
    
</script>

<main>
    {#if $staticState.hasAuth}
        <NavFrame Array_data={defaultNav}/>
        {#if auth.currentUser?.uid === $adminKey}
            <AdminFrame />
        {:else}
            <UserFrame />
        {/if}
    {:else}
        <StaticFrame />
    {/if}
</main>
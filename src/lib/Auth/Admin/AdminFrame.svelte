<script>
    import { auth, staticState, db } from "$lib";
	import CandidateFrame from "./Manage/CandidatesFrame/CandidateFrame.svelte";
	import PositionFrame from "./Manage/PositionFrame/PositionFrame.svelte";
	import VotersFrame from "./Manage/VotersFrame/VotersFrame.svelte";
	import DashboardFrame from "./Reports/DashboardFRAME/DashboardFrame.svelte";
	import VotesFrame from "./Reports/VotesFRAME/VotesFrame.svelte";

    
</script>

<main class="mt-20 p-2 sm:p-0">
    {#if $staticState.activeItem === "Dashboard"}
        <DashboardFrame />
    {:else if $staticState.activeItem === "Votes"}
        <VotesFrame />
    {:else if $staticState.activeItem === "Voters"}
        <VotersFrame />
    {:else if $staticState.activeItem === "Positions"}
        <PositionFrame />
    {:else if $staticState.activeItem === "Candidates"}
        <CandidateFrame />
    {/if}
</main>
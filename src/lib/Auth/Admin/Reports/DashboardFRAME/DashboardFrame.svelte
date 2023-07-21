<script lang="ts">
	import { scale } from "svelte/transition";

    import { auth,db } from "$lib";
    import { onSnapshot, collection, doc } from "firebase/firestore";

    let totalPost: 0;
    onSnapshot(doc(collection(db, "dashBoardCount"), "totalPositions"), (snapResp: any) =>
    {
        totalPost = snapResp.data().count;
    })

    let totalCandi: 0;
    onSnapshot(doc(collection(db, "dashBoardCount"), "totalCandidates"), (snapResp: any) =>
    {
        totalCandi = snapResp.data().count;
    })

    let totalVoters: 0;
    onSnapshot(doc(collection(db, "dashBoardCount"), "totalVoters"), (snapResp: any) =>
    {
        totalVoters = snapResp.data().count;
    })

</script>

<main class="md:max-w-[80%] mx-auto flex gap-1 flex-wrap" in:scale>
    <section class="w-full sm:max-w-[300px] p-4 bg-[#3b82f6]">
        <p class="text-white font-bold font-sans text-4xl">{totalPost}</p>
        <p class="text-white font-semibold">No. of Positions</p>
    </section>

    <section class="w-full sm:max-w-[300px] p-4 bg-[#22c55e]">
        <p class="text-white font-bold font-sans text-4xl">{totalCandi}</p>
        <p class="text-white font-semibold">No. of Candidates</p>
    </section>

    <section class="w-full sm:max-w-[300px] p-4 bg-[#f97316]">
        <p class="text-white font-bold font-sans text-4xl">{totalVoters}</p>
        <p class="text-white font-semibold">Total Voters</p>
    </section>

    <section class="w-full sm:max-w-[300px] p-4 bg-[#ef4444]">
        <p class="text-white font-bold font-sans text-4xl">0</p>
        <p class="text-white font-semibold">Voters Voted</p>
    </section>
    
</main>


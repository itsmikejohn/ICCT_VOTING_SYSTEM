import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUqk4gjvjc9pahVzuqHiX6jOqtjMRyELM",
  authDomain: "newvotingsystem-4a227.firebaseapp.com",
  projectId: "newvotingsystem-4a227",
  storageBucket: "newvotingsystem-4a227.appspot.com",
  messagingSenderId: "187906194363",
  appId: "1:187906194363:web:e731d9c889e204d344e29e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


import { writable } from "svelte/store";

export const adminKey = writable("udiNbIK1gVYTjIp8jR6ixucA9WB2");

export const staticState = writable({
    /** static states */
    activeItem: "",
    showReg: false,
    showReset: false,

    hasAuth: false,

    adminNav: [
        {
          title: "REPORTS",
          value: ["Dashboard", "Votes"]
        },

        {
          title: "MANAGE",
          value: ["Voters", "Positions", "Candidates"]
        }
    ],

    voterNav: [
      {
        title: "Votes",
        value: ["Voting System"]
      },

    ],
    
    
    genderGenerator: {
        boy: 
        [
          "https://em-content.zobj.net/thumbs/120/apple/354/boy_1f466.png",
          "https://em-content.zobj.net/thumbs/120/google/350/boy_1f466.png",
          "https://em-content.zobj.net/thumbs/120/samsung/349/boy_1f466.png",
          "https://em-content.zobj.net/thumbs/120/microsoft/319/boy_1f466.png",
          "https://em-content.zobj.net/thumbs/120/whatsapp/352/boy_1f466.png",
          "https://em-content.zobj.net/thumbs/120/twitter/351/boy_1f466.png",
          "https://em-content.zobj.net/thumbs/120/facebook/355/boy_1f466.png",
          "https://em-content.zobj.net/thumbs/120/twitter/348/boy_1f466.png",
          "https://em-content.zobj.net/thumbs/120/joypixels/340/boy_1f466.png",

        ],

        girl: 
        [
          "https://em-content.zobj.net/thumbs/120/apple/354/girl_1f467.png",
          "https://em-content.zobj.net/thumbs/120/google/350/girl_1f467.png",
          "https://em-content.zobj.net/thumbs/120/samsung/349/girl_1f467.png",
          "https://em-content.zobj.net/thumbs/120/microsoft/319/girl_1f467.png",
          "https://em-content.zobj.net/thumbs/120/whatsapp/352/girl_1f467.png",
          "https://em-content.zobj.net/thumbs/120/twitter/351/girl_1f467.png",
          "https://em-content.zobj.net/thumbs/120/facebook/355/girl_1f467.png",
          "https://em-content.zobj.net/thumbs/120/twitter/348/girl_1f467.png",
          "https://em-content.zobj.net/thumbs/120/joypixels/340/girl_1f467.png",
        ],
    }
    
})

export const adminState = writable({
    /** Voters state */
    getTotalVoters:<any[]> [],
    comparison:<number> 0.1,

    /** Positions state */
    getPositions:<any[]> [],
    showCreatePosition: false,
    posComparison:<number> 0.1,

    /** Candidate state */
    getCandidates:<any[]> [],
    fetchingCandidates:<any> [],
    showNewCandidate: false,
    candiComparison:<number> 0.1,
    

})

export const voterState = writable({
    getWtToVote:<[]> [],
    voterComparison: 0.1,
    outerVoterComparison: 0.1,
})
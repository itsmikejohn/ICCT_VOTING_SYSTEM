<script lang="ts">
    import OurButton from "$lib/Components/OurButton.svelte";

    /**database calls*/
    import { auth, db, staticState } from "$lib";
    import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
    import { setDoc, doc, collection, serverTimestamp, increment } from "firebase/firestore";

    export let gender:string, fullname:string, email:string, password:string, confirmPassword:string;

    const dsComp = {
        domMsg: "",
        loader: false,
    }

    const firebaseReg = (photoURL: string) =>
    {
        dsComp.loader = true;
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredResp =>
        {
            updateProfile(userCredResp.user, {
                displayName: fullname,
                photoURL: photoURL,
            })
            .then(voidResp =>
            {
                setDoc(doc(collection(db, "registeredVoters"), auth.currentUser?.uid), {
                    createdAt: serverTimestamp(),
                    photoURL: auth.currentUser?.photoURL,
                    fullname: auth.currentUser?.displayName,
                    email: auth.currentUser?.email,
                    password: password,
                    isRestricted: false,
                    
                }, {merge:true})
                .then(voidResp =>
                {
                    setDoc(doc(collection(db, "dashBoardCount"), "totalVoters"), {
                        count: increment(1),
                    }, {merge:true})

                    dsComp.loader = false;
                })
            })
        })
        .catch(errorResp =>
        {
            dsComp.domMsg = errorResp.code;
            dsComp.loader = false;
        })
    }

    const registerHandler = () =>
    {
        let photoURL: string;

        gender === "Male" ? photoURL = $staticState.genderGenerator.boy[Math.round(Math.random() * 8)] : photoURL = $staticState.genderGenerator.girl[Math.round(Math.random() * 8)];

        if(gender.trim().length > 3)
        {   
            confirmPassword === password ? firebaseReg(photoURL) : dsComp.domMsg = "Password not same";

        }else
        {
            dsComp.domMsg = "Select your sex"
        }
    }

</script>
<p class="text-center text-red-500 font-mono">{dsComp.domMsg}</p>

<OurButton Title="Regiter" Logic={dsComp.loader} 
Logic_title="Registering." on:click={registerHandler}/>
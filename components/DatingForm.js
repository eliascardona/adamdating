import React, { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../firebase/base";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc
} from "firebase/firestore";
import styles from "../styles/forms.module.css";
import { randomNumber } from "../variables/globals";
import { useRouter } from "next/router";

export const DatingForm = () => {
    const [userEmail, setUserEmail] = useState("")
    const [owner, setOwner] = useState({})
    const emailRef = useRef()
    const router=useRouter()

    useEffect(() => {
        const checkUserEmail = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) 
                    setUserEmail(user.email);            
            });
        };
        checkUserEmail();
    }, []);
    
    useEffect(() => {
        const getOwner = async () => {
            const docRef = doc(firestore, "users", userEmail)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setOwner(docSnap.data())
                console.log(`Hola ${owner.nombre}`);
            } else {
                console.log("No user")
            }
        };
        getOwner();
    }, []);
    
    const confessCrush = async () => {
        let docID = `confesion${randomNumber}`
        let subject = ""
        subject = emailRef.current.value
        let nombre
        nombre = owner.nombre
        await setDoc(doc(firestore, "confesiones", docID), {
            de: userEmail,
            para: subject,
            cardID: docID
        })
        await updateDoc(doc(firestore, "users", subject), {
            likes: ["ADAM", userEmail]
        })
        router.reload()
    }
    
    return (
        <div>
            <h2>Confiesa tu ligue</h2>
            <input
                type="email"
                ref={emailRef}
                placeholder="A quien va dirigido"
                className={styles.input}
            />
            <button
                type="button"
                onClick={confessCrush}
                className={styles.formBtn}
            >
                enviar
            </button>
            <br/>
        </div>
    )
}
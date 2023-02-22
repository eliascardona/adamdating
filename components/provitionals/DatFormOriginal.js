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

export const DatingForm = ({ formPara }) => {
    const [userEmail, setUserEmail] = useState("")
    const [owner, setOwner] = useState({})
    const emailRef = useRef()

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

    const changes = async () => {
        const subject = ""
        subject = emailRef.current.value
        await setDoc(doc(firestore, `confesiones/para-${subject}`), {
            existe: "yes",
        });
    }
    
    const send = async () => {
        await updateDoc(doc(firestore, `confesiones/para-${formPara}`), {
            de: owner.nombre,
            para: subject,
            cardID: userEmail
        });
    }

    return (
        <div>
            <h2>Confiesa tu ligue</h2>
            <input
                type="email"
                ref={emailRef}
                placeholder="A quien va dirigido"
                onChange={changes}
                className={styles.input}
            />
            <button
                type="button"
                onClick={send}
                className={styles.formBtn}
            >
                enviar
            </button>
            <br/>
        </div>
    )
}
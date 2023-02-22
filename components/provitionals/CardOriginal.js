import React, { useEffect, useState } from 'react'
import { auth, firestore } from '../firebase/base'
import {
    doc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import styles from "../styles/main.module.css"

export const Card = ({ de, para }) => {
    // const [userEmail, setUserEmail] = useState("")
    // useEffect(() => {
    //     const checkUserEmail = () => {
    //         onAuthStateChanged(auth, (user) => {
    //             if (user) 
    //                 setUserEmail(user.email);            
    //         });
    //     };
    //     checkUserEmail();
    // }, []);
    
    const accept = async () => {
        let palabra=""
        palabra=`${de}`
        await updateDoc(doc(firestore, `confesiones/para-${para}`), {
            leGustasA: palabra,
        });
    }
    
    const denegate = async () => {
        await updateDoc(doc(firestore, `confesiones/para-${para}`), {
            rechazoA: "person",
        });
    }
    
    return (
        <div className={styles.card}>
            <strong>{de}</strong>
            <p>Quiero a {para}</p>
            <div className={styles.cardLyOne}>
                <div className={styles.iconContainer} onClick={setDenegate}>
                    <ion-icon name="leaf-outline"></ion-icon>
                    <span>Ne</span>
                </div>

                <div className={styles.iconContainer} onClick={setAccept}>
                    <ion-icon name="return-down-forward-outline"></ion-icon>
                    <span>Ok</span>
                </div>
            </div>
        </div>
    )
}
import React, { useState, useEffect, useRef } from 'react'
import { auth, firestore } from "../firebase/base"
import { onAuthStateChanged } from "firebase/auth"
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc
} from "firebase/firestore"

export const PostCard = ({ postId }) => {
    const [likes, setLikes] = useState([])
    const [postOwnerDoc, setPostOwnerDoc] = useState({})
    const [userEmail, setUserEmail] = useState("")
    useEffect(() => {
        const checkUserEmail = () => {
            onAuthStateChanged(auth, (user) => {
                if (user) 
                    setUserEmail(user.email);            
            });
        };
        checkUserEmail();
    }, []);

    const giveItLike = async () => {
        await setDoc(firestore, `posts/${postId}/likes/${userEmail}`, {
            liked: true
        })
    }
    
    useEffect(() => {
        const getLikes = async () => {
          const data = [];
          const collRef = collection(firestore, "confesiones", postId, "likes")
          const coll = await getDocs(collRef);
          let matchesDocs = coll.docs;
          matchesDocs.forEach(async (info) => {
            data.push(info.data());
          });
          setLikes(data);
        };
        getLikes();
    }, [])
    
    useEffect(() => {
        const checkPostOwner = async () => {
            setPostOwnerDoc((await db.collection("posts").doc(postId).get()).data())
        }
        checkPostOwner()
    })

    if (postOwnerDoc.id === auth.currentUser.email) {
        optionsRef.current.style.display="block"
    }

    return (
        <div>
            hola
        </div>
    )
}
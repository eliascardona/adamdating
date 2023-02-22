import React, { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../../firebase/base";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { 
  doc,  
  // collection,
  // getDoc,
  // getDocs,
  setDoc
} from "firebase/firestore";
import styles from "../../styles/forms.module.css";
import { useRouter } from "next/router";

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const router = useRouter();
  // const [usernames, setUsernames] = useState([])
  // const [usernameAlert, setUsernameAlert] = useState("")
  // const [dynUsername, setDynUsername] = useState("")
  
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = [];
  //     const collRef = collection(firestore, "users");
  //     const coll = await getDocs(collRef);
  //     let xdocs = coll.docs;
  //     xdocs.forEach(async (info) => {
  //       data.push(info.data());
  //     })
  //     setUsernames(data);
  //   }
  //   getData();
  // }, []);
  
  // const checkUsername = () => {
  //   const userName = usernameRef.current.value;
  //   usernames?.filter((itm, i, arr) => {
  //     setDynUsername(itm?.username)
  //     if (userName===dynUsername) {
  //       setUsernameAlert("username en uso, escoge otro 😥")
  //     }
  //   })
  // }
  
  const signUp = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const userName = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(firestore, `users/${res.user.email}`), {
      email: res.user.email,
      id: res.user.uid,
      nombre: name,
      username: `@${userName}`
    });
  };
  
  const logOut = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <>
      <h2>Crear cuenta</h2>
      <span className={styles.label}>Nombre</span>
      <input
        type="text"
        ref={nameRef}
        placeholder="Nombre"
        className={styles.input}
      />
      <span className={styles.label}>username, no escribir @</span>
      <input
        type="text"
        ref={usernameRef}
        placeholder="@username"
        className={styles.input}
        // onBlur={checkUsername}
      />
      {/* --------------------------------------------- */}
      {/* <span className={styles.alertLabel}>
        username en uso, escoge otro 😥
      </span> */}
      {/* --------------------------------------------- */}
      <span className={styles.label}>Email</span>
      <input
        type="email"
        ref={emailRef}
        placeholder="name@somemail.com"
        className={styles.input}
      />
      <span className={styles.label}>Contraseña</span>
      <input
        type="password"
        ref={passwordRef}
        placeholder="mypass123"
        className={styles.input}
      />
      <button
        type="button"
        className={styles.formBtn}
        onClick={signUp}
      >
        Sign up
      </button>
      <small className={styles.payMsg}>
        ¿Ya tienes cuenta?
        <span onClick={()=> router.push("/login")} className="text-primary">
          {" "}
          <u style={{ cursor: "pointer" }}> Iniciar sesión</u>
        </span>
      </small>
      <small className={styles.payMsg}>
        Si ingresaste un email incorrecto, haz click
        <span onClick={logOut} className="text-primary">
          {" "}
          <u style={{ cursor: "pointer" }}> aquí</u>
        </span>
      </small>
    </>
  );
};
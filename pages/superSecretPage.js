import { useEffect, useRef, useState } from "react"
import { auth, firestore } from "../firebase/base"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  setDoc
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { PageHeader } from "../components/PageHeader"
import { Modal } from "../components/Modal"
import { Notification } from "../components/Notification"

function superSecretPage() {
  const [userEmail, setUserEmail] = useState("")
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [match, setMatch] = useState(false)
  const [openNotif, setOpenNotif] = useState(false)
  
  useEffect(() => {
    const checkUserEmail = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) 
          setUserEmail(user.email)
        })
    }
    checkUserEmail()
  }, [])
  
  useEffect(() => {
    const getPosts = async () => {
      const data = []
      const collRef = collection(firestore, "confesiones")
      const coll = await getDocs(collRef)
      let matchesDocs = coll.docs
      matchesDocs.forEach(async (info) => {
        data.push(info.data())
      })
      setPosts(data)
    }
    getPosts()
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const users = []
      const usersRef = collection(firestore, "users")
      const usersQuery = await getDocs(usersRef)
      usersQuery.forEach((user) => {
        users.push(user.data())
      }) 
      setUsers(users)
    }
    getUsers()
  }, [])

  useEffect(() => {
    posts.forEach((post) => {
      checkMatch(post.para)
    })
  }, [posts])

  useEffect(() => {
    console.log(users)
  }, [users])
  
  async function checkMatch (matchPara) {
    //verificar si la carta va dirigida al usuario
    if (matchPara === userEmail) {
      setMatch(true)
      setOpenNotif(true)
    }
  }
  
  // match === true ? setTimeout(() => {
  //   setMatch(false)
  // }, 6000) : console.log("Aun no hay match")

  return (
    <>
      <PageHeader />
      <div style={{paddingTop:'15px', paddingLeft:'23px'}}>
        <h1>ADAM LIKES YOU 🤑</h1>
        {
          posts.map((post, i, arr) => {
            const owner = users?.find((user) => user.email == post.de)
            const receiver = users?.find((user) => user.email == post.para)
            return (
              <Card 
              username={owner.username}
              nombre={owner.nombre}
              para={receiver.username} 
              cardID={post.cardID} 
              key={post.cardID} 
              />
            )
          })
        }
        <Button clickAction={()=>{setOpenModal(true)}} />
        {
          openModal &&
          <Modal 
            openModal={openModal} setOpenModal={setOpenModal} title="vamos" />
        }
        {
          match &&
          <Notification 
            openNotif={openNotif} setOpenNotif={setOpenNotif} title="FELICIDADES" />
        }
      </div>
    </>
  )
}

export default superSecretPage
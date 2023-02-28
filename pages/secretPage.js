import { useEffect, useRef, useState } from "react"
import { auth, firestore } from "../firebase/base"
import {
  collection,
  doc,
  getDocs,
  setDoc
} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { PageHeader } from "../components/PageHeader"
import { Modal } from "../components/Modal"
import { Notification } from "../components/Notification"
import { currTime, nm } from "../utils/utils"

function secretPage() {
  const [userEmail, setUserEmail] = useState("")
  const [posts, setPosts] = useState([])
  const [matches, setMatches] = useState([])
  const [users, setUsers] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [match, setMatch] = useState(false)
  const [openNotif, setOpenNotif] = useState(false)
  const [matchTo, setMatchTo] = useState("")
  
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
      let postDocs = coll.docs
      postDocs.forEach(async (info) => {
        data.push(info.data())
      })
      setPosts(data)
    }
    getPosts()
  }, [])

  useEffect(() => {
    const getMatchs = async () => {
      const data = []
      const collRef = collection(firestore, "macthes")
      const coll = await getDocs(collRef)
      let matchesDocs = coll.docs
      matchesDocs.forEach(async (info) => {
        data.push(info.data())
      })
      setMatches(data)
    }
    getMatchs()
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
  
  async function checkMatch (postPara, postDe) {
    if (postPara === userEmail) {
      setMatch(true)
      setOpenNotif(true)
      let docID = `${postDe}-${nm}`
      const usersRef = doc(firestore, "matches", docID)
      await setDoc(usersRef, {
        horaDelMatch: currTime,
        de: postDe,
        para: postPara
      })
    }
  }
  
  async function checkMatchTo (forItem) {
    const owner = users?.find((user) => user.email == forItem)
    setMatchTo(owner.de)
  }
  
  useEffect(() => {
    posts.forEach((post) => {
      checkMatch(post.para, post.de)
    })
  }, [posts])
  
  useEffect(() => {
    matches.forEach((item) => {
      checkMatchTo(item.de)
    })
  }, [matches])

  useEffect(() => {
    console.log(matchTo)
  }, [matchTo])

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
              <>
                <Card 
                  username={owner.username}
                  para={receiver.username} 
                  cardID={post.cardID} 
                  key={post.cardID} 
                />
              </>
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
            openNotif={openNotif} 
            setOpenNotif={setOpenNotif} 
            notTo={matchTo}
            title="FELICIDADES"
          />  
        }
      </div>
    </>
  )
}

export default secretPage
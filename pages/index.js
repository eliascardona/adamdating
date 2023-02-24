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

function Home() {
  const [userEmail, setUserEmail] = useState("")
  const [posts, setPosts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [docArray, setDocArray] = useState([])
  const [match, setMatch] = useState(false)
  
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
      
  const doMatch = async (matchPara) => {
    //buscar a quien va dirigida la carta
    const docRef = doc(firestore, "users", matchPara)
    const docInfo = await getDoc(docRef)
    setDocArray(docInfo.data().likes)
    let matchSubject = ""
    matchSubject=matchPara
    docArray?.filter((itm, i, arr) => {
      if (itm === matchPara) {
        setMatch(true)
        setDoc(doc(firestore, "matches", `${userEmail}-y-${matchPara}`), {
          matched: true,
          match: matchSubject
        })
      }
    })
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
            let paraFulano = ""
            paraFulano = post.para
            return(
              <>
                <Card 
                de={post.de} 
                para={post.para} 
                cardID={post.cardID} 
                key={post.cardID} 
                onRender={doMatch(paraFulano)} />
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
        {/* {
          match &&
          <Notification 
            openNot={match} setOpenNot={setMatch} title="FELICIDADES" />
        } */}
      </div>
    </>
  )
}

export default Home
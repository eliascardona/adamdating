// import { collection, onSnapshot } from "firebase/firestore"
// import { createContext, useEffect, useState } from "react"
// import { firestore } from "../firebase/base"
// import { useRouter } from "next/router"

// const UsernameCtx = createContext({ username: "" })

// export function UsernameProvider({ children }) {
//     const [username, setUsername] = useState("null")
//     const [mainCtx, setMainCtx] = useState({})
//     const router = useRouter()

//     useEffect(() => {
//         const reaction = async (username) => {
//             if (!username) {
//                 setUsername("")
//                 router.push("/signup")
//             } else {
//                 setUsername(username)
//                 router.push("/")
//             }
//         }
//         reaction()
//     }, [])
    
//     useEffect(() => {
//         let unsuscribe
//         const getMainCtx = async () => {
//             unsuscribe = onSnapshot(collection(firestore, "users"), (snap) => {
//                 setMainCtx(
//                     snap.docs
//                     .filter(doc => doc.id != username)
//                     .map(doc => ({
//                         id: doc.id,
//                         ...doc.data()
//                     }))
//                 )
//             })
//         }
//         getMainCtx()
//         return unsuscribe
//     }, [])
    
//     return (
//         <UsernameCtx.Provider value={{ mainCtx }}>
//             <div>
//                 <input 
//                 type="text" 
//                 placeholder="username"
//                 onChange={(e)=>{
//                     e.preventDefault()
//                     let word = ""
//                     word=e.target.value
//                     setUsername(word)
//                 }}
//                 />
//                 {children}
//             </div>
//         </UsernameCtx.Provider>
//     )
// }
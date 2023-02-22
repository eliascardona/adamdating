import React from 'react'
import { DatingForm } from "./DatingForm"
import styles from "../styles/modal.module.css"

export const Modal = ({ openModal, setOpenModal, title }) => {
    return (
        <div className={styles.globalContainer}>
            <div className={styles.modalContainer}>
                <div style={{marginTop:'15px', marginBottom:'15px'}}>
                    <h1>{title}</h1>                                                
                    <DatingForm />
                </div>
            </div>
        </div>
    )
}
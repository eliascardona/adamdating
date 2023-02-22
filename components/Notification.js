import React from 'react'
import styles from "../styles/modal.module.css"

export const Notification = ({ openNot, setOpenNot, closeNot, title }) => {
    return (
        <div className={styles.globalContainer}>
            <div className={styles.modalContainer}>
                <div className={styles.centeredGrid} style={{marginTop:'15px', marginBottom:'15px'}}>
                    <h1>{title}</h1>
                    <h3>Hiciste match</h3>
                    <button type="button" className={styles.formBtn} onClick={closeNot}>
                        cerrar
                    </button>
                </div>
            </div>
        </div>        
    )
}
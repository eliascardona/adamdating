import React from 'react'
import styles from "../styles/card.module.css"

export const Card = ({ de, para, cardID, onRender }) => {
    return (
        <div className={styles.card}>
            <strong>{de} dice</strong>
            <p>me gusta {para}</p>
            {/* <div className={styles.cardLyOne}>
                <div className={styles.iconContainer}>
                    <ion-icon name="return-down-forward-outline"></ion-icon>
                    {"     "}
                    <span>Ok, hagamos match!</span>
                </div>
            </div> */}
        </div>
    )
}
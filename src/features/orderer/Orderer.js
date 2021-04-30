import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectData } from '../chooser/choosersSlice'
import styles from './Orderer.module.css'

export function Orderer() {
    const data = useSelector(selectData)
    const [quantity, setQuantity] = useState(1)
    let total = 0
    data.forEach(attribute => {
        total += Number(attribute.selected.price)
    })
    return (
        <div className={styles.div}>
            <input type="number" className={styles.input} size="4"  title="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <span className={styles.span}> X </span>
            <span className={styles.span}>{'$' + total.toFixed(2)}</span>
            <span className={styles.span}> = </span>
            <span className={styles.span}>{'$' + (quantity * total).toFixed(2)}</span>
            <button className={styles.button}>Add to Cart</button>
        </div>
    )
}

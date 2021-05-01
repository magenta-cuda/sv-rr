import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectData, selectVariationId, addToCartAsync } from '../chooser/choosersSlice'
import styles from './Orderer.module.css'

export function Orderer() {
    const dispatch = useDispatch()
    const variationId = useSelector(selectVariationId)
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
            <button className={styles.button} onClick={onClickHandler}>Add to Cart</button>
        </div>
    )
    function onClickHandler() {
        let body = new FormData()
        body.append('product_id', variationId)
        body.append('quantity', quantity)
        dispatch(addToCartAsync({method: 'POST', body: body}))
    }
}

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectData, selectVariationId, selectAddedToCart, addToCartAsync } from '../chooser/choosersSlice'
import styles from './Orderer.module.css'

export function Orderer() {
    const dispatch = useDispatch()
    const variationId = useSelector(selectVariationId)
    const data = useSelector(selectData)
    const addedToCart = useSelector(selectAddedToCart)
    const [quantity, setQuantity] = useState(1)
    // TODO: put total in store
    let total = 0
    data.forEach(attribute => {
        total += Number(attribute.selected.price)
    })
    // TODO: put all in store - replace with find?
    let all = true
    for (const attribute of data) {
        if (attribute.selected === attribute.options[0]) {
            all = false
            break
        }
    }
    return (
        <div className={styles.div}>
            <input type="number" className={styles.input} size="4"  title="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <span className={styles.span}>X</span>
            <span className={styles.span}>{'$' + total.toFixed(2)}</span>
            <span className={styles.span}>=</span>
            <span className={styles.span}>{'$' + (quantity * total).toFixed(2)}</span>
            <button className={styles.button} disabled={!all} onClick={onClickHandler}>Add to Cart</button>
            <span className={styles.span} style={{display: addedToCart ? 'inline' : 'none'}}>{addedToCart} additions</span>
        </div>
    )
    function onClickHandler(e) {
        let body = new FormData()
        body.append('product_id', variationId)
        body.append('quantity', quantity)
        dispatch(addToCartAsync({method: 'POST', body: body}))
    }
}

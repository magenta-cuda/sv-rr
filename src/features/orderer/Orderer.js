import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectData, selectVariationId, selectAddedToCart, addToCartAsync } from '../chooser/choosersSlice'
import { cart, currency } from '../../app/globals'
import styles from './Orderer.module.css'

export function Orderer() {
    const dispatch                = useDispatch()
    const variationId             = useSelector(selectVariationId)
    const data                    = useSelector(selectData)
    const addedToCart             = useSelector(selectAddedToCart)
    const [quantity, setQuantity] = useState(1)
    const total                   = data.reduce(((total, attribute) => total + Number(attribute.selected.price)), 0)
    const all                     = data.find(attribute => attribute.selected === attribute.options[0]) === undefined
    return (
        <div className={styles.div}>
            <input type="number" className={styles.input} size="4" title="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)}/>
            <span className={styles.span}>X</span>
            <span className={styles.span}>{`${currency}${total.toFixed(2)}`}</span>
            <span className={styles.span}>=</span>
            <span className={styles.span}>{`${currency}${(quantity * total).toFixed(2)}`}</span>
            <button className={styles.button} disabled={!all} onClick={onClickHandler}>Add to Cart</button>
            <span className={styles.span} style={{display: addedToCart ? 'inline' : 'none'}}>
                {`${addedToCart} ${addedToCart > 1 ? ' additions' : ' addition'}`}
            </span>
            <a className={styles.a} href={cart} target="_blank" rel="noreferrer" style={{display: addedToCart ? 'inline' : 'none'}}>View Cart</a>
        </div>
    )
    function onClickHandler() {
        let body = new FormData()
        body.append('product_id', variationId)
        body.append('quantity', quantity)
        dispatch(addToCartAsync({method: 'POST', body: body}))
    }
}

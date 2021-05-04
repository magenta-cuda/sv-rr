import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectData, selectProductId, selectVariationId, getVariationAsync } from './choosersSlice'
import { Selector } from './Selector'
import { currency, noPrefix } from '../../app/globals'
import styles from './Selectors.module.css'

export function Selectors(props) {
    const productId   = useSelector(selectProductId)
    const data        = useSelector(selectData)
    const variationId = useSelector(selectVariationId)
    const dispatch    = useDispatch()
    const attributes  = {}
    let all           = true
    for (const attribute of data) {
        if (attribute.selected !== attribute.options[0]) {
            let selection = attribute.selected.selection
            if (attribute.name.endsWith('_mc_xii_optional')) {
                if (selection === noPrefix + attribute.name.replace('attribute_', '').replace('_mc_xii_optional', '')) {
                    selection = 'mc_xii_not_selected';
                }
            }
            attributes[attribute.name] = selection
        } else {
            all = false
            break
        }
    }
    useEffect(() => {
        if (variationId === null && data.length && all) {
            const body = new FormData()
            for (const attribute in attributes) {
                body.append(attribute, attributes[attribute])
            }
            body.append('product_id', productId)
            dispatch(getVariationAsync({ method: 'POST', body: body }))
        }
    })
    const total   = props.attributes.reduce(((total, attribute) => total + Number(attribute.selected.price)), 0)
    const inStock = props.attributes.reduce(((inStock, attribute) => Math.min(inStock, Number(attribute.selected.quantity))), Number.MAX_SAFE_INTEGER)
    return (
        <div className={styles.div}>
            <div>
                {props.attributes.map(attribute => <><Selector name={attribute.name} selected={attribute.selected} options={attribute.options} /><br /></>)}
            </div>
            <hr />
            <div className={styles.totalDiv}>
                <span className={styles.span}>{`Total: ${currency}${total.toFixed(2)}`}</span>
                <span className={`${styles.span} ${styles.inStockSpan}`} style={{display: all ? 'inline' : 'none'}}>{`In stock: ${inStock}`}</span>
            </div>
            <hr />
            <div className={styles.variationDiv} style={{display: variationId !== null ? 'inline' : 'none'}}>{`Variation Id: ${variationId}`}</div>
        </div>
    )
}

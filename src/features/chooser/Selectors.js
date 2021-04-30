import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, selectProductId, selectProductName, selectVariationId, getVariationAsync } from './choosersSlice';
import { Selector } from './Selector';
import styles from './Selectors.module.css';

export function Selectors(props) {
    const productId   = useSelector(selectProductId)
    const productName = useSelector(selectProductName)
    const data        = useSelector(selectData)
    const variationId = useSelector(selectVariationId)
    const dispatch = useDispatch()
    let attributes = {}
    let all = true
    for (const attribute of data) {
        if (attribute.selected !== attribute.options[0]) {
            let selection = attribute.selected.selection
            if ( attribute.name.endsWith('_mc_xii_optional')) {
                // TODO: 'No ' should not be hardcoded.
                if (selection === 'No ' + attribute.name.replace('attribute_', '').replace('_mc_xii_optional', '')) {
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
        if (all) {
            console.log('Selectors:attributes=', attributes);
            let body = new FormData()
            for (const attribute in attributes) {
                body.append(attribute, attributes[attribute])
            }
            body.append('product_id', productId)
            dispatch(getVariationAsync({ method: 'POST', body: body }))
        }
    })
    let total = 0
    props.attributes.forEach(attribute => {
        total += Number(attribute.selected.price)
    })
    return (
        <div className={styles.div}>
            <div>
                {props.attributes.map(attribute => <><Selector name={attribute.name} selected={attribute.selected} options={attribute.options} /><br /></>)}
            </div>
            <hr />
            <div className={styles.totalDiv}>{'Total: $' + total.toFixed(2)}</div>
            <hr />
            <div className={styles.variationDiv}>{'Variation Id: ' + variationId}</div>
        </div>
    )
}

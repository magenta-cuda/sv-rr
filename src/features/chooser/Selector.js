import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelected } from './choosersSlice'
import { currency } from '../../app/globals'
import styles from './Selector.module.css'

export function Selector(props) {
    const dispatch = useDispatch()
    return (
        <>
            <select className={styles.select} onChange={(e) => dispatch(setSelected(e.target.value))}>
                {props.options.map(option => {
                    let price = Number(option.price)
                    price     = price ? `: ${currency}${price.toFixed(2)}` : ''
                    return (
                        <option value={option.id} selected={option===props.selected}>
                            {`${option.selection}${price}`}
                        </option>
                    )
                })}
            </select>
            <div className={styles.descriptionDiv}>{props.selected.description}</div>
            <div className={styles.priceDiv } style={{visibility: Number(props.selected.price) ? 'visible' : 'hidden'}}>
                {`Price: ${currency}${Number(props.selected.price).toFixed(2)}`}
            </div>
        </>
    )
}

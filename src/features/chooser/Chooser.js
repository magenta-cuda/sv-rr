import { useDispatch } from 'react-redux'
import { Table } from '../table/Table'
import { setSelected } from './choosersSlice'
import { currency } from '../../app/globals'
import styles from './Chooser.module.css'

export function Chooser(props) {
    const dispatch = useDispatch()
    const cells    = props.cells.reduce((cells, item) => {
        let price = Number(item.price)
        price     = price ? `: ${currency}${price.toFixed(2)}` : ''
        cells.push(<img className={styles.thumbnail} src={item.image} alt={item.selection} title={`${item.description}${price}`}
                        onClick={() => dispatch(setSelected(item.id))} />)
        return cells
    }, [])
    let price = Number(props.selected.price)
    price     = price ? `: ${currency}${price.toFixed(2)}` : ''
    return (
        <div className={styles.div}>
            <img className={styles.img} src={props.selected?props.selected.fullsize:''} alt={props.name}
                 title={`${props.selected.description}`} />
            <div className={styles.overlay}>{`${props.selected.selection}${price}`}</div>
            <Table ncols={3} cells={cells} />
        </div>
    )
}

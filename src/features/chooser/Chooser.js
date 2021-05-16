import { useDispatch } from 'react-redux'
import { Table } from '../table/Table'
import { setSelected } from './choosersSlice'
import { currency, chooserTableClass, chooserCellClass } from '../../app/globals'
import styles from './Chooser.module.css'

export function Chooser(props) {
    const dispatch = useDispatch()
    const cells    = props.cells.reduce((cells, item) => {
        let price           = Number(item.price)
        price               = price ? `: ${currency}${price.toFixed(2)}` : ''
        const cellClassName = `${styles.thumbnail}${item===props.selected ? ' flex-active-slide' : ''}`
        cells.push(<img className={cellClassName} src={item.image} alt={item.selection} title={`${item.description}${price}`}
                        data-large_image={item.large_image} data-large_image_width={item.large_image_width}
                        data-large_image_height={item.large_image_height} onClick={() => dispatch(setSelected(item.id))} />)
        return cells
    }, [])
    let price = Number(props.selected.price)
    price     = price ? `: ${currency}${price.toFixed(2)}` : ''
    return (
        <div className={`${styles.div}${props.chooserClass !== '' ? ` ${props.chooserClass}` : ''}`}>
            <img className={styles.img} src={props.selected?props.selected.fullsize:''} alt={props.name}
                 title={`${props.selected.description}`} />
            <div className={styles.overlay}>{`${props.selected.selection}${price}`}</div>
            <Table tableClass={chooserTableClass} cellClass={chooserCellClass} ncols={3} cells={cells} />
        </div>
    )
}

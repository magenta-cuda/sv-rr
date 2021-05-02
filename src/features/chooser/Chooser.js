import { useDispatch } from 'react-redux'
import { Table } from '../table/Table'
import { setSelected } from './choosersSlice'
import styles from './Chooser.module.css'

export function Chooser(props) {
    const dispatch = useDispatch()
    const cells    = props.cells.reduce((cells, item) => {
        cells.push(<img className={styles.thumbnail} src={item.image} alt={item.selection} onClick={() => dispatch(setSelected(item.id))} />)
        return cells
    }, [])
    return (
        <div className={styles.div}>
            <img className={styles.img} src={props.selected?props.selected.fullsize:''} alt={props.name} />
            <Table ncols={3} cells={cells} />
        </div>
    )
}

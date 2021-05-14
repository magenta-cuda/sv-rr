import { Row } from './Row'
import styles from './Table.module.css'

export function Table(props) {
    const rows = []
    let   row  = []
    props.cells.forEach(item => {
        row.push(item)
        if (row.length === props.ncols) {
            rows.push(row)
            row = []
        }
    })
    if (row.length) {
        for (let i = row.length; i < props.ncols; i++) {
            row.push(<div style={{visibility: 'hidden'}}>{props.cells[0]}</div>)
        }
        rows.push(row)
    }
    let tableClassName = styles.table;
    if (props.ncols === 2) {
        tableClassName += ' ' + styles.cols2Td
    } else if (props.ncols === 3) {
        tableClassName += ' ' + styles.cols3Td
    }
    if (props.tableClass !== '') {
        tableClassName += ` ${props.tableClass}`
    }
    return <div className={tableClassName}>{rows.map((row) => <Row cellClass={props.cellClass} cells={row} />)}</div>
}

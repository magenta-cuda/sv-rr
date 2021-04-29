import { Row } from './Row';
import styles from './Table.module.css';

export function Table(props) {
    let rows = []
    let row = []
    props.cells.forEach(function(item, index, array) {
        row.push(item)
        if (row.length === props.ncols) {
            rows.push(row)
            row = []
        }
    })
    if (row.length) {
        for (let i = row.length; i < props.ncols; i++) {
            row.push('')
        }
        rows.push(row)
    }
    let tableClassName = styles.table;
    if (props.ncols === 2) {
        tableClassName += ' ' + styles.cols2Td
    } else if (props.ncols === 3) {
        tableClassName += ' ' + styles.cols3Td
    }
    return <table className={tableClassName}><tbody>{rows.map((row) => <Row cells={row} />)}</tbody></table>
}

import styles from './Table.module.css';

export function Row(props) {
    return <tr className={styles.tr}>{props.cells.map((cell) => <td className={styles.td}>{cell}</td>)}</tr>
}

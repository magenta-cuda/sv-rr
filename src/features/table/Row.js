import styles from './Table.module.css';

export function Row(props) {
    return (
        <div className={styles.tr}>
            {props.cells.map((cell) => <div className={`${styles.td}${props.cellClass !== '' ? ` ${props.cellClass}` : ''}`}>{cell}</div>)}
        </div>
    )
}

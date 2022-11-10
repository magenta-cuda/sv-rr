import React from 'react'
import styles from './Grid.module.css'

export function Grid(props) {
    const {cells, ncols} = props
    return <div className={styles.grid + (ncols === 2 ? ` ${styles.cols2}` : "")}>{cells.map(cell => cell)}</div>
}

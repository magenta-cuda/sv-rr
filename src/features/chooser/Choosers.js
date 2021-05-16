import {Chooser} from './Chooser'
import {Table} from '../table/Table'
import {chooserClass} from '../../app/globals'
import styles from './Choosers.module.css'

export function Choosers(props) {
    const cells = props.cells.reduce((cells, item) => {
        cells.push(<Chooser chooserClass={chooserClass} name={item.name} selected={item.selected} cells={item.options} />)
        return cells
    }, [])
    return (
        <div className={styles.div}>
            <Table tableClass='' cellClass='' ncols={2} cells={cells} />
        </div>
    );
}

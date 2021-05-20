import {Chooser} from './Chooser'
import {Table} from '../table/Table'
import {chooserClass, chooserImageClass} from '../../app/globals'
import styles from './Choosers.module.css'

export function Choosers(props) {
    const cells = props.cells.reduce((cells, item, index) => {
        cells.push(<Chooser id={`chooser-${index}`} chooserClass={chooserClass} chooserImageClass={chooserImageClass} name={item.name}
                       selected={item.selected} cells={item.options} />)
        return cells
    }, [])
    return (
        <div className={styles.div}>
            <Table tableClass='' cellClass='' ncols={2} cells={cells} />
        </div>
    )
}

import { Chooser } from './Chooser';
import { Table } from '../table/Table';
import styles from './Choosers.module.css';

export function Choosers(props) {
    let cells = []
    props.cells.forEach(function(item, index, array) {
        cells.push(<Chooser name={item.name} selected={item.selected} cells={item.options} />)
    })
    return (
        <div className={styles.div}>
            <Table ncols={2} cells={cells} />
        </div>
    );
}

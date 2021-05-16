import {useEffect} from 'react'
import {Chooser} from './Chooser'
import {Table} from '../table/Table'
import {chooserClass} from '../../app/globals'
import styles from './Choosers.module.css'

export function Choosers(props) {
    const cells = props.cells.reduce((cells, item) => {
        cells.push(<Chooser chooserClass={chooserClass} name={item.name} selected={item.selected} cells={item.options} />)
        return cells
    }, [])
    useEffect(() => {
        if (window.hasOwnProperty('jQuery') && window.jQuery.hasOwnProperty('fn') && window.jQuery.fn.hasOwnProperty('wc_product_gallery')) {
            window.jQuery('.woocommerce-product-gallery').each(function() {
                const $this = window.jQuery(this)
                console.log('$this.data("product_gallery")', $this.data('product_gallery'))
                if ($this.data('product_gallery') === undefined) {
                    $this.wc_product_gallery()
                }
            })
        }
    })
    return (
        <div className={styles.div}>
            <Table tableClass='' cellClass='' ncols={2} cells={cells} />
        </div>
    );
}

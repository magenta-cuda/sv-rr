import {useEffect} from 'react'
import {Chooser} from './Chooser'
import {Table} from '../table/Table'
import {chooserClass, chooserCellClass} from '../../app/globals'
import styles from './Choosers.module.css'

export function Choosers(props) {
    const cells = props.cells.reduce((cells, item) => {
        cells.push(<Chooser chooserClass={chooserClass} name={item.name} selected={item.selected} cells={item.options} />)
        return cells
    }, [])
    useEffect(() => {
        if (window.hasOwnProperty('jQuery') && window.jQuery.hasOwnProperty('fn') && window.jQuery.fn.hasOwnProperty('sv_rr_product_gallery')) {
            // window.wc_single_product_params.zoom_enabled = false
            window.jQuery(`.${chooserClass}`).each(function() {
                const $this = window.jQuery(this)
                if ($this.data('product_gallery') === undefined) {
                    $this.sv_rr_product_gallery()
                    $this.find('.sv-rr-product-gallery__trigger').css({position: 'absolute', top: '0.4375em', right: '0.4375em', zIndex: 99})
                }
            })
            window.jQuery(`.${chooserCellClass} img`).each(function() {
                const $this = window.jQuery(this)
                if ($this.hasClass('flex-active-slide')) {
                    $this.parent().addClass('flex-active-slide')
                    $this.removeClass('flex-active-slide')
                } else {
                    $this.parent().removeClass('flex-active-slide')
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

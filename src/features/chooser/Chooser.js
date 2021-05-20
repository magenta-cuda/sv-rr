import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Table} from '../table/Table'
import {setSelected} from './choosersSlice'
import {currency, chooserTableClass, chooserCellClass} from '../../app/globals'
import styles from './Chooser.module.css'

export function Chooser(props) {
    const dispatch = useDispatch()
    const cells    = props.cells.reduce((cells, item) => {
        let price           = Number(item.price)
        price               = price ? `: ${currency}${price.toFixed(2)}` : ''
        const cellClassName = `${styles.thumbnail}${item===props.selected ? ' flex-active-slide' : ''}`
        cells.push(<img className={cellClassName} src={item.image} alt={item.selection} title={`${item.description}${price}`}
                        data-large_image={item.large_image} data-large_image_width={item.large_image_width}
                        data-large_image_height={item.large_image_height} onClick={() => dispatch(setSelected(item.id))} />)
        return cells
    }, [])
    let price = Number(props.selected.price)
    price     = price ? `: ${currency}${price.toFixed(2)}` : ''
    useEffect(() => {
        if (window.hasOwnProperty('jQuery') && window.jQuery.hasOwnProperty('fn') && window.jQuery.fn.hasOwnProperty('sv_rr_product_gallery')) {
            const $chooser = window.jQuery(`#${props.id}`)
            if ($chooser.data('product_gallery') === undefined) {
                $chooser.sv_rr_product_gallery()
                $chooser.find('.sv-rr-product-gallery__trigger').css({position: 'absolute', top: '0.4375em', right: '0.4375em', zIndex: 99})
            }
            $chooser.find(`.${chooserCellClass} img`).each(function() {
                const $this = window.jQuery(this)
                if ($this.hasClass('flex-active-slide')) {
                    $this.parent().addClass('flex-active-slide')
                    $this.removeClass('flex-active-slide')
                } else {
                    $this.parent().removeClass('flex-active-slide')
                }
            })
            $chooser.trigger('zoom_init')
        }
    })
    return (
        <div id={props.id} className={`${styles.div}${props.chooserClass !== '' ? ` ${props.chooserClass}` : ''}`}>
            <div className={`${styles.imgDiv}${props.chooserImageClass !== '' ? ` ${props.chooserImageClass}` : ''}`}>
                <img className={styles.img} src={props.selected ? props.selected.fullsize : ''} alt={props.name}
                     title={`${props.selected.description}`} data-large_image={props.selected ? props.selected.large_image : ''}
                     data-large_image_width={props.selected ? props.selected.large_image_width : ''}
                     data-large_image_height={props.selected ? props.selected.large_image_height : ''} />
                <div className={styles.overlay}>{`${props.selected.selection}${price}`}</div>
            </div>
            <Table tableClass={chooserTableClass} cellClass={chooserCellClass} ncols={3} cells={cells} />
        </div>
    )
}

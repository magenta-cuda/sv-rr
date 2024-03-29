const base = window.location.origin
export const chooseImage                  = base + '/wp-content/uploads/2021/03/choose-100x100.png'
export const chooseFullsize               = base + '/wp-content/uploads/2021/03/choose.png'
export const noneImage                    = base + '/wp-content/uploads/2021/03/no-overlay-100x100.png'
export const noneFullsize                 = base + '/wp-content/uploads/2021/03/no-overlay.png'
export const loadVariations               = base + '/?wc-ajax=sv_load_variations_json'
export const loadVariationsWithImageProps = base + '/?wc-ajax=sv_load_variations_json&image_props=1'
export const getVariation                 = base + '/?wc-ajax=get_variation'
export const addToCart                    = base + '/?wc-ajax=add_to_cart'
export const cart                         = base + '/index.php/cart/'
export const iconFullsizeDimension        = 200
export const currency                     = '$'
export const noPrefix                     = 'No '
export const chooserClass                 = 'sv-rr-product-gallery'
export const chooserImageClass            = 'sv-rr-product-image'
export const chooserTableClass            = 'chooser-table'                  // used only with Table in Chooser
export const chooserCellClass             = 'sv-rr-product-gallery__image'   // used only with Table in Chooser

// The 'sv-rr-product-gallery' and 'sv-rr-product-gallery__image' classes are used by "sv-rr-single-product.js"
// The post content must contain the string '[product_page' to cause "frontend/single-product.js" to load.

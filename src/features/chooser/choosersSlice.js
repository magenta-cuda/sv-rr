import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { chooseImage, chooseFullsize, noneImage, noneFullsize, iconFullsizeDimension, getVariation, loadVariations,
         loadVariationsWithImageProps, addToCart }
    from '../../app/globals'
import { noPrefix } from '../../app/globals'

export const reloadAsync = createAsyncThunk(
    'reloadStatus',
    async (id, thunkAPI) => {
        // const url      = loadVariationsWithImageProps
        const url      = loadVariations
        const response = await fetch(`${url}&product_id=${id}`)
            .then(response => response.json())
        let productName = ''
        let data = {}
        let index = 0
        for (const id in response) {
            const theResponse        = response[id]
            const attribute          = theResponse.attribute
            const selection          = theResponse.selection
            const thumbnail          = theResponse.thumbnail
            const fullsize           = theResponse.full_size_image
            const price              = theResponse.price
            const quantity           = theResponse.quantity
            const description        = theResponse.description
            const large_image        = theResponse.full_size_image
            const large_image_width  = theResponse.full_size_image_width
            const large_image_height = theResponse.full_size_image_height
            productName              = theResponse.product_name
            if (!data.hasOwnProperty(attribute)) {
                const selection = attribute.replace('attribute_', '').replace('_mc_xii_optional', '')
                data[attribute] = {name: attribute,
                                   options: [{id: (++index).toString(), selection: `Choose ${selection}`, image: chooseImage,
                                              fullsize: chooseFullsize, price: 0, quantity: Number.MAX_SAFE_INTEGER,
                                              description: `Choose ${selection}`, large_image: chooseFullsize,
                                              large_image_width: iconFullsizeDimension, large_image_height: iconFullsizeDimension}]}
                data[attribute].selected = data[attribute].options[0]
            }
            const option = {id: id, selection: selection, image: thumbnail, fullsize: fullsize, price: price, quantity: quantity,
                            description: description, large_image: large_image, large_image_width: large_image_width,
                            large_image_height: large_image_height}
            if (url === loadVariationsWithImageProps) {
                const imageProps = theResponse.image_props
                // Object.assign(option, {large_image: imageProps.full_src, large_image_width: imageProps.full_src_w,
                //                        large_image_height: imageProps.full_src_h})
            }
            data[attribute].options.push(option)
        }
        let state = []
        for (const attribute in data) {
            if (attribute.endsWith('_mc_xii_optional')) {
                const selection = attribute.replace('attribute_', '').replace('_mc_xii_optional', '')
                data[attribute].options.push({id: (++index).toString(), selection: noPrefix + selection, image: noneImage,
                                              fullsize: noneFullsize, price: 0, quantity: Number.MAX_SAFE_INTEGER,
                                              description: noPrefix + selection, large_image: noneFullsize,
                                              large_image_width: iconFullsizeDimension, large_image_height: iconFullsizeDimension})
            }
            state.push(data[attribute])
        }
        return { productId: id, productName: productName, data: state, variationId: null, variationPrice: null, variationQuantity: null }
    }
)

export const getVariationAsync = createAsyncThunk(
    'getVariation',
    async (init, thunkAPI) => {
        const response = await fetch(getVariation, init)
            .then(response => response.json())
        return response
    }
)

export const addToCartAsync = createAsyncThunk(
    'addToCart',
    async (init, thunkAPI) => {
        // WC_AJAX::add_to_cart() will successfully add the item to the cart but will return an error for a virtual variation because
        // get_post_status() returns false for a virtual variation since it does not exists. Unfortunately, there does not seem to be
        // a hook to override this and the only solution seems to be removing and replacing WC_AJAX::add_to_cart() as the handler for
        // the 'add_to_cart' action.
        const response = await fetch(addToCart, init)
            .then(response => response.json())
        return response
    }
)

const choosersSlice = createSlice({
    name: 'choosers',
    initialState: {
        productId:         null,
        productName:       '',
        data:              [],
        variationId:       null,
        variationPrice:    null,
        variationQuantity: null,
        addedToCart: 0
    },
    reducers: {
        setSelected: (state, action) => {
            let attribute
            let option
            attribute = state.data.find(item => {
                return (option = item.options.find(option => option.id === action.payload)) !== undefined
            })
            attribute.selected      = option
            state.variationId       = null
            state.variationPrice    = null
            state.variationQuantity = null
        },
        reload: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [reloadAsync.pending]: (state, action) => {
            state.data             = 'Loading ...'
        },
        [reloadAsync.fulfilled]: (state, action) => {
            state.productId         = action.payload.productId
            state.productName       = action.payload.productName
            state.data              = action.payload.data
            state.variationId       = action.payload.variationId
            state.variationPrice    = action.payload.variationPrice
            state.variationQuantity = action.payload.variationQuantity
        },
        [getVariationAsync.fulfilled]: (state, action) => {
            state.variationId       = Number(action.payload.variation_id)
            state.variationPrice    = Number(action.payload.display_price)
            state.variationQuantity = Number(action.payload.max_qty)
        },
        [addToCartAsync.fulfilled]: (state, action) => {
            console.log(addToCartAsync.fulfilled, action)
            // TODO: handle the returned 'div.widget_shopping_cart_content' HTML fragment
            ++state.addedToCart
        },
    }
});

export const { setSelected }         = choosersSlice.actions

export const selectProductId         = state => state.choosers.productId

export const selectProductName       = state => state.choosers.productName

export const selectData              = state => state.choosers.data

export const selectVariationId       = state => state.choosers.variationId

export const selectVariationPrice    = state => state.choosers.variationPrice

export const selectVariationQuantity = state => state.choosers.variationQuantity

export const selectAddedToCart       = state => state.choosers.addedToCart

export default choosersSlice.reducer

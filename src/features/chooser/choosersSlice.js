import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { chooseImage, chooseFullsize, noneImage, noneFullsize, getVariation, loadVariations, addToCart } from '../../app/globals'
import { noPrefix } from '../../app/globals'

export const reloadAsync = createAsyncThunk(
    'reloadStatus',
    async (id, thunkAPI) => {
        const response = await fetch(loadVariations + '&product_id=' + id)
            .then(response => response.json())
        let productName = ''
        let data = {}
        let index = 0
        for (const id in response) {
            const attribute   = response[id].attribute
            const selection   = response[id].selection
            const thumbnail   = response[id].thumbnail
            const fullsize    = response[id].full_size_image
            const price       = response[id].price
            const quantity    = response[id].quantity
            const description = response[id].description
            productName       = response[id].product_name
            if (!data.hasOwnProperty(attribute)) {
                const selection = attribute.replace('attribute_', '').replace('_mc_xii_optional', '')
                data[attribute] = {name: attribute,
                                   options: [{id: (++index).toString(), selection: 'Choose ' + selection, image: chooseImage,
                                              fullsize: chooseFullsize, price: 0, quantity: Number.MAX_SAFE_INTEGER, description: ''}]}
                data[attribute].selected = data[attribute].options[0]
            }
            data[attribute].options.push({id: id, selection: selection, image: thumbnail, fullsize: fullsize, price: price,
                                          quantity: quantity, description: description})
        }
        let state = []
        for (const attribute in data) {
            if (attribute.endsWith('_mc_xii_optional')) {
                const selection = attribute.replace('attribute_', '').replace('_mc_xii_optional', '')
                data[attribute].options.push({id: (++index).toString(), selection: noPrefix + selection, image: noneImage,
                                              fullsize: noneFullsize, price: 0, quantity: Number.MAX_SAFE_INTEGER, description: ''})
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

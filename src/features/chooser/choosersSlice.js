import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chooseImage, chooseFullsize, noneImage, noneFullsize, getVariation, loadVariations, addToCart } from '../../app/globals';

export const reloadAsync = createAsyncThunk(
    'reloadStatus',
    async (id, thunkAPI) => {
        const response = await fetch(loadVariations + '&product_id=' + id)
            .then(response => { let data = response.json(); console.log('data=', data); return data;})
            .then(response => { console.log('response=', response); return response; })
        let productName = ''
        let data = {}
        let index = 0
        for (const id in response) {
            const attribute   = response[id].attribute
            const selection   = response[id].selection
            const thumbnail   = response[id].thumbnail
            const fullsize    = response[id].full_size_image
            const price       = response[id].price
            const description = response[id].description
            productName       = response[id].product_name
            if (!data.hasOwnProperty(attribute)) {
                const selection = attribute.replace('attribute_', '').replace('_mc_xii_optional', '')
                data[attribute] = {name: attribute,
                                   options: [{id: (++index).toString(), selection: 'Choose ' + selection, image: chooseImage,
                                              fullsize: chooseFullsize, price: '', description: ''}]}
                data[attribute].selected = data[attribute].options[0]
            }
            data[attribute].options.push({id: id, selection: selection, image: thumbnail, fullsize: fullsize, price: price,
                                          description: description})
        }
        let state = []
        for (const attribute in data) {
            if (attribute.endsWith('_mc_xii_optional')) {
                const selection = attribute.replace('attribute_', '').replace('_mc_xii_optional', '')
                // TODO: 'No ' should not be hardcoded.
                data[attribute].options.push({id: (++index).toString(), selection: 'No ' + selection, image: noneImage,
                                              fullsize: noneFullsize, price: 0, description: ''})
            }
            state.push(data[attribute])
        }
        console.log('state=', state)
        return { productId: id, productName: productName, data: state, variationId: 0 }
    }
)

export const getVariationAsync = createAsyncThunk(
    'getVariation',
    async (init, thunkAPI) => {
        const response = await fetch(getVariation, init)
            .then(response => { return response.json() })
            .then(response => { console.log('response=', response); return response; })
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
            .then(response => { return response.json() })
            .then(response => { console.log('response=', response); return response; })
        return response
    }
)

const choosersSlice = createSlice({
    name: 'choosers',
    initialState: {
        productId: 0,
        productName: '',
        data: [],
        variationId: 0,
    },
    reducers: {
        setSelected: (state, action) => {
            let attribute
            let option
            attribute = state.data.find(item => {
                return (option = item.options.find(option => option.id === action.payload)) !== undefined
            })
            console.log('attribute=', attribute)
            console.log('option=', option)
            attribute.selected = option
            console.log('state=', state)
            state.variationId = 0
        },
        reload: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [reloadAsync.fulfilled]: (state, action) => {
            console.log(reloadAsync.fulfilled, action)
            state.productId   = action.payload.productId
            state.productName = action.payload.productName
            state.data        = action.payload.data
            state.variationId = action.payload.variationId
        },
        [getVariationAsync.fulfilled]: (state, action) => {
            console.log(getVariationAsync.fulfilled, action)
            state.variationId = action.payload.variation_id
        },
        [addToCartAsync.fulfilled]: (state, action) => {
            console.log(addToCartAsync.fulfilled, action)
            // TODO: handle the returned 'div.widget_shopping_cart_content' HTML fragment
        },
    }
});

export const { setSelected }   = choosersSlice.actions

export const selectProductId   = state => state.choosers.productId

export const selectProductName = state => state.choosers.productName

export const selectData        = state => state.choosers.data

export const selectVariationId = state => state.choosers.variationId

export default choosersSlice.reducer

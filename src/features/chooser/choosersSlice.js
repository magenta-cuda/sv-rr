import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chooseImage, chooseFullsize, noneImage, noneFullsize, getVariation, loadVariations } from '../../app/globals';

export const reloadAsync = createAsyncThunk(
    'reloadStatus',
    async (id, thunkAPI) => {
        const response = await fetch(loadVariations + '&product_id=' + id)
            .then(response => { let data = response.json(); console.log('data=', data); return data;})
            .then(response => { console.log('response=', response); return response; })
        let data = {}
        let index = 0
        for (const id in response) {
            const attribute   = response[id].attribute
            const selection   = response[id].selection
            const thumbnail   = response[id].thumbnail
            const fullsize    = response[id].full_size_image
            const price       = response[id].price
            const description = response[id].description
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
            state.push(data[attribute])
        }
        console.log('state=', state)
        return { productId: id, data: state, variationId: 0 }
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

const choosersSlice = createSlice({
    name: 'choosers',
    initialState: {
        productId: 0,
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
            state.data        = action.payload.data
            state.variationId = action.payload.variationId
        },
        [getVariationAsync.fulfilled]: (state, action) => {
            console.log(getVariationAsync.fulfilled, action)
            state.variationId = action.payload.variation_id
        },
    }
});

export const { setSelected }   = choosersSlice.actions

export const selectProductId   = state => state.choosers.productId

export const selectData        = state => state.choosers.data

export const selectVariationId = state => state.choosers.variationId

export default choosersSlice.reducer

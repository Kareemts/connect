import {configureStore} from '@reduxjs/toolkit'
import commentModalSlice from '../features/commentModalSlice'



export const store = configureStore({

    reducer:{
        commnetModal:commentModalSlice
    }

})
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popoverState : {
        isOpen : false,
        content : null
    },
    alertState : {
        isOpen : false,
        content : null
    }
}

const tempReducer = createSlice({
    name : "tempReducer",
    initialState,
    reducers : {
        actionOpenPopover : (state,action) => {
            //payload content
            state.popoverState = {
                isOpen : true,
                content : action.payload
            }
        },
        actionClosePopover : (state,action) => {
            state.popoverState = {
                isOpen : false,
                content : null
            }
        },
        actionOpenAlert : (state,action) => {
            //payload content
            state.alertState = {
                isOpen : true,
                content : action.payload
            }
        },
        actionCloseAlert : (state,action) => {
            state.alertState = {
                isOpen : false,
                content : null
            }
        }
    }
})

export const {actionOpenPopover,actionClosePopover,actionOpenAlert,actionCloseAlert} = tempReducer.actions;
export default tempReducer.reducer;
import React from 'react'
import ContextMenuComp from '../ContextMenuComp'
import { useDispatch } from 'react-redux'
import {actionCloseBudgetInDesktopMode, actionDeleteBudget} from "../../../reducers/budgetsReducer"
const BudgetContextMenuComp = ({ budgetType ,setAmountType,setPopoverState,budgetFolder,budgetName}) => {
    const dispatch = useDispatch(null);
    const handleContextMenuOptions = () => {
        if (budgetType === "normal") {
            return [
                {
                    text: "Add Income",
                    icon: "plus",
                    color: "none",
                    handler : (e) => {
                        setAmountType("income");
                        setPopoverState({
                          isOpen: true,
                          e: e,
                        });
                      }
                }, {
                    text: "Add Expens",
                    icon: "plus",
                    color: "none",
                    handler : (e) => {
                        setAmountType("expens");
                        setPopoverState({
                          isOpen: true,
                          e: e,
                        });
                      }
                },{
                    text : "Delete Budget",
                    icon : "trash",
                    color : "danger",
                    handler : () => {
                        dispatch(actionCloseBudgetInDesktopMode())
                        dispatch(actionDeleteBudget({
                          budgetFolder : budgetFolder,
                          budgetName : budgetName
                        }))
                      }
                }
            ]
        }else if(budgetType === "custody"){
            return [
                {
                    text : "Add Expens",
                    icon : "plus",
                    color : "none",
                    handler : (e) => {
                        setAmountType("expens");
                        setPopoverState({
                          isOpen: true,
                          e: e,
                        });
                      }
                },{
                    text : "Delete Budget",
                    icon : "trash",
                    color : "danger",
                    handler :  () => {
                        dispatch(actionCloseBudgetInDesktopMode())
                        dispatch(actionDeleteBudget({
                          budgetFolder : budgetFolder,
                          budgetName : budgetName
                        }))
                      }
                }
            ]
        }
    }
    return (
        <ContextMenuComp
            targetId="BudgetContextMenuId"
            options={handleContextMenuOptions()}
        />
    )
}

export default BudgetContextMenuComp
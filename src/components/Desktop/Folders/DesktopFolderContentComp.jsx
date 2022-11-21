import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FoldersSubHeader from "./FoldersSubHeader";
import GridSystemComp from "../GridSystemComp";
import ContextMenuComp from "../ContextMenuComp";
import ItemInGridComp from "../ItemInGridComp";
import {
  actionCloseInFolder,
  actionOpenApp,
} from "../../../reducers/desktopModeReducer";
import {
  actionOpenBudgetInDesktopMode,
  actionSetSelectedBudget,
} from "../../../reducers/budgetsReducer";

const DesktopFolderContentComp = ({ data, label, appKey }) => {
  const dispatch = useDispatch(null);
  const isbudgetOpenedInDesktop = useSelector(
    (state) => state.budgetsReducer.isbudgetOpenedInDesktop
  );
  const handleItemType = (item) => {
    if (item.dataType === "budget") {
      return (
        <ItemInGridComp
          icon="budget"
          label={item.budgetName}
          handler={() =>
            !isbudgetOpenedInDesktop &&
            (dispatch(actionOpenBudgetInDesktopMode(appKey)),
            dispatch(
              actionOpenApp({
                appName: "Budget",
                icon: "budget",
                appContentType: "budget",
              })
            ),
            dispatch(
              actionSetSelectedBudget({
                budgetName: item.budgetName,
                folderName: label,
              })
            ))
          }
        />
      );
    }
  };
  return (
    <>
      <ContextMenuComp
        targetId="FolderPageId"
        options={[
          {
            text: "Go Back",
            color: "none",
            icon: "arrow-left",
            handler: () => dispatch(actionCloseInFolder(appKey)),
          },
          {
            text: "New Budget",
            color: "none",
            icon: "credit-card",
            // TODO: add handler
          },
          {
            text: "Delete Folder",
            color: "danger",
            icon: "trash",
            // TODO: add handler
          },
        ]}
      />
      <FoldersSubHeader label={label} appKey={appKey} />
      <GridSystemComp>
        {data.map((item) => {
          return <>{handleItemType(item)}</>;
        })}
      </GridSystemComp>
    </>
  );
};

export default DesktopFolderContentComp;

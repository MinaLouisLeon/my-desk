import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FoldersSubHeader from "./FoldersSubHeader";
import GridSystemComp from "../GridSystemComp";
import ContextMenuComp from "../ContextMenuComp";
import ItemInGridComp from "../ItemInGridComp";
import Form from "react-bootstrap/Form";
import {
  actionCloseInFolder,
  actionOpenApp,
} from "../../../reducers/desktopModeReducer";
import {
  actionAddBudget,
  actionOpenBudgetInDesktopMode,
  actionSetSelectedBudget,
} from "../../../reducers/budgetsReducer";
import { actionDeleteFolder } from "../../../reducers/foldersReducer";
import FormBtns from "../Forms/FormBtns";
import {
  actionClosePopover,
  actionOpenPopover,
} from "../../../reducers/tempReducer";
const DesktopFolderContentComp = ({ data, label, appKey, folderIndex }) => {
  const dispatch = useDispatch(null);
  const isbudgetOpenedInDesktop = useSelector(
    (state) => state.budgetsReducer.isbudgetOpenedInDesktop
  );

  const handleAddNormalBudgetFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actionAddBudget({
        budgetFolder: label,
        budgetName: e.target[0].value,
        budgetType: "normal",
        folderIndex: folderIndex,
        appKey: appKey,
      })
    );
    dispatch(actionClosePopover());
  };
  const AddNormalBudgetPopoverContent = (
    <div className="pa2">
      <Form onSubmit={handleAddNormalBudgetFormSubmit}>
        <Form.Group>
          <Form.Label>Budget Name:</Form.Label>
          <Form.Control type="text" required placeholder="Budget Name ..." />
        </Form.Group>
        <FormBtns submitBtnName="Add" />
      </Form>
    </div>
  );
  const handleAddCustodyBudgetFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actionAddBudget({
        budgetFolder: label,
        budgetName: e.target[0].value,
        budgetType: "custody",
        folderIndex: folderIndex,
        custodyAmount: e.target[1].value,
        appKey: appKey,
      })
    );
    dispatch(actionClosePopover());
  };
  const AddCustodyBudgetPopoverContent = (
    <div className="pa2">
      <Form onSubmit={handleAddCustodyBudgetFormSubmit}>
        <Form.Group>
          <Form.Label>Budget Name:</Form.Label>
          <Form.Control type="text" required placeholder="Budget Name ..." />
        </Form.Group>
        <Form.Group>
          <Form.Label>Custody Amount:</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            required
            placeholder="Enter Cudsty Amount ..."
          />
        </Form.Group>
        <FormBtns submitBtnName="Add" />
      </Form>
    </div>
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
  // TODO: add submenu
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
            hasSubmenu: true,
            submenuOptions: [
              {
                text: "Normal Budget",
                color: "none",
                handler: () =>
                  dispatch(actionOpenPopover(AddNormalBudgetPopoverContent)),
              },
              {
                text: "custody Budget",
                color: "none",
                handler: () =>
                  dispatch(actionOpenPopover(AddCustodyBudgetPopoverContent)),
              },
            ],
          },
          {
            text: "Delete Folder",
            color: "danger",
            icon: "trash",
            handler: () => {
              dispatch(actionDeleteFolder(label));
              dispatch(actionCloseInFolder(appKey));
            },
          },
        ]}
      />
      <FoldersSubHeader label={label} appKey={appKey} />
      <GridSystemComp>
        {data.map((item) => {
          return <>{item.inTrash ? <></> : <>{handleItemType(item)}</>}</>;
        })}
      </GridSystemComp>
    </>
  );
};

export default DesktopFolderContentComp;

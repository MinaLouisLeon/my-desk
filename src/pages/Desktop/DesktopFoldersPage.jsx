import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemInGridComp from "../../components/Desktop/ItemInGridComp";
import GridSystemComp from "../../components/Desktop/GridSystemComp";
import DesktopFolderContentComp from "../../components/Desktop/Folders/DesktopFolderContentComp";
import ContextMenuComp from "../../components/Desktop/ContextMenuComp";
import Form from "react-bootstrap/Form";
import { actionOpenInFolder } from "../../reducers/desktopModeReducer";
import {
  actionClosePopover,
  actionOpenAlert,
  actionOpenPopover,
} from "../../reducers/tempReducer";
import FormBtns from "../../components/Desktop/Forms/FormBtns";
import { actionAddFolder } from "../../reducers/foldersReducer";

const DesktopFoldersPage = ({
  appKey,
  appContentType,
  appContent,
  label,
  folderIndex,
}) => {
  const dispatch = useDispatch(null);
  const folders = useSelector((state) => state.foldersReducer.folders);
  const didFolderExist = useSelector(
    (state) => state.foldersReducer.didFolderExist
  );
  const isAlertOpen = useSelector(
    (state) => state.tempReducer.alertState.isOpen
  );
  if (didFolderExist && !isAlertOpen) {
    dispatch(actionOpenAlert(<div className="ma3">Folder Exist !</div>));
  }
  const handleSubmitAddFolder = (e) => {
    e.preventDefault();
    dispatch(actionAddFolder(e.target[0].value));
    dispatch(actionClosePopover());
  };
  const addFolderPopoverContent = (
    <div className="pa2">
      <Form onSubmit={handleSubmitAddFolder}>
        <Form.Group>
          <Form.Label>Folder Name:</Form.Label>
          <Form.Control required type="text" placeholder="Folder Name ..." />
        </Form.Group>
        <FormBtns submitBtnName="Add" />
      </Form>
    </div>
  );
  if (appContentType === "folders") {
    return (
      <GridSystemComp>
        <ContextMenuComp
          targetId="FolderPageId"
          options={[
            {
              text: "Add Folder",
              color: "none",
              icon: "folder-new",
              handler: () =>
                dispatch(actionOpenPopover(addFolderPopoverContent)),
            },
          ]}
        />
        {folders.map((folder,index) => {
          return (
            <>
              {folder.inTrash ? (
                <></>
              ) : (
                <ItemInGridComp
                  icon="folder"
                  label={folder.label}
                  handler={() => {
                    dispatch(
                      actionOpenInFolder({
                        appKey: appKey,
                        appContentType: "folderContent",
                        appContent: folder.data,
                        label: folder.label,
                        index: index,
                      })
                    );
                  }}
                />
              )}
            </>
          );
        })}
      </GridSystemComp>
    );
  } else if (appContentType === "folderContent") {
    return (
      <DesktopFolderContentComp
        data={appContent}
        label={label}
        appKey={appKey}
        folderIndex={folderIndex}
      />
    );
  }
};
export default DesktopFoldersPage;

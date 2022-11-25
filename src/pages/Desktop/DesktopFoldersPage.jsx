import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemInGridComp from "../../components/Desktop/ItemInGridComp";
import GridSystemComp from "../../components/Desktop/GridSystemComp";
import DesktopFolderContentComp from "../../components/Desktop/Folders/DesktopFolderContentComp";
import ContextMenuComp from "../../components/Desktop/ContextMenuComp";
import { actionOpenInFolder } from "../../reducers/desktopModeReducer";
import { actionClosePopover, actionOpenAlert, actionOpenPopover } from "../../reducers/tempReducer";
import InputItem from "../../components/Desktop/Forms/InputItem";
import FormBtns from "../../components/Desktop/Forms/FormBtns";
import { actionAddFolder } from "../../reducers/foldersReducer";

const DesktopFoldersPage = ({ appKey, appContentType, appContent, label }) => {
  const dispatch = useDispatch(null);
  const folders = useSelector((state) => state.foldersReducer.folders);
  const didFolderExist = useSelector(state => state.foldersReducer.didFolderExist);
  const isAlertOpen = useSelector(state => state.tempReducer.alertState.isOpen);
  if(didFolderExist && !isAlertOpen){
    dispatch(actionOpenAlert(<div className="ma3">Folder Exist !</div>))
  }
  const handleSubmitAddFolder = (e) => {
    e.preventDefault();
    dispatch(actionAddFolder(e.target[0].value));
    dispatch(actionClosePopover())
    //TODO: add handle function to add folder submit
  };
  //TODO: add new folder form ui
  const addFolderPopoverContent = (
    <>
      <form onSubmit={handleSubmitAddFolder}>
        <div>
          <InputItem
            label="Folder Name:"
            required={true}
            placeholder="Folder Name ..."
            type="text"
          />
        </div>
        <FormBtns submitBtnName="Add"/>
      </form>
    </>
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
              // TODO: add handler
            },
          ]}
        />
        {folders.map((folder) => {
          return (
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
                  })
                );
              }}
            />
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
      />
    );
  }
};
export default DesktopFoldersPage;

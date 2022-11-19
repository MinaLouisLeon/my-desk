import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemInGridComp from "../../components/Desktop/ItemInGridComp";
import GridSystemComp from "../../components/Desktop/GridSystemComp";
import DesktopFolderContentComp from "../../components/Desktop/Folders/DesktopFolderContentComp";
import ContextMenuComp from "../../components/Desktop/ContextMenuComp";
import { actionOpenInFolder } from "../../reducers/desktopModeReducer";
const DesktopFoldersPage = ({ appKey ,appContentType,appContent,label}) => {
  const dispatch = useDispatch(null);
  const folders = useSelector((state) => state.foldersReducer.folders);
  if(appContentType === "folders"){
    return(
      <GridSystemComp>
      <ContextMenuComp
        targetId="FolderPageId"
        options={[
          {
            text: "Add Folder",
            color: "none",
            icon: "folder-new",
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
                  appKey : appKey,
                  appContentType : "folderContent",
                  appContent : folder.data,
                  label : folder.label
                })
              );
            }}
          />
        );
      })}
    </GridSystemComp>
    )
  }else if(appContentType === "folderContent"){
    return <DesktopFolderContentComp data={appContent} label={label} appKey={appKey} />
  }
}
export default DesktopFoldersPage

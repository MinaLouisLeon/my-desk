import React from 'react'
import FoldersSubHeader from './FoldersSubHeader'
import GridSystemComp from '../GridSystemComp';
import ContextMenuComp from '../ContextMenuComp';
const DesktopFolderContentComp = ({data,label}) => {

  return (
    <>
        <ContextMenuComp 
        targetId="FolderPageId"
        options={[
          {
            text : "Go Back",
            color : "none",
            icon : "arrow-left",
          },{
            text : "New Budget",
            color : "none",
            icon : "credit-card",
          },{
            text : "Delete Folder",
            color : "danger",
            icon : "trash"
          }
        ]}
      />
        <FoldersSubHeader label={label}/>
        <GridSystemComp>
            
        </GridSystemComp>
    </>
  )
}

export default DesktopFolderContentComp
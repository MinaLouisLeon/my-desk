import React from "react";
import DesktopFoldersPage from "../../pages/Desktop/DesktopFoldersPage";
import DesktopSettingsPage from "../../pages/Desktop/DesktopSettingsPage";

const RenderAppContentComp = ({ appName,appKey,appContentType,appContent,label }) => {
  const renderAppContent = () => {
    switch (appName) {
      case "Folders":
        return (
          <div
            className="appBackgroundStyle"
            id="FolderPageId"
          >
            <DesktopFoldersPage appKey={appKey} appContentType={appContentType} appContent={appContent} label={label}/>
          </div>
        );
      case "Settings":
        return (
          <div
            className="appBackgroundStyle"
          >
            <DesktopSettingsPage />
          </div>
        )
      default:
        return <></>;
    }
  };
  return <>{renderAppContent()}</>;
};

export default RenderAppContentComp;

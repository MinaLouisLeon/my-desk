import React from "react";
import DesktopFoldesPage from "../../pages/Desktop/DesktopFoldesPage";
import DesktopSettingsPage from "../../pages/Desktop/DesktopSettingsPage";

const RenderAppContentComp = ({ appName }) => {
  const renderAppContent = () => {
    switch (appName) {
      case "Folders":
        return (
          <div
            className="appBackgroundStyle"
            id="FolderPageId"
          >
            <DesktopFoldesPage />
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

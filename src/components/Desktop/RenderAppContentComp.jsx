import React from "react";
import DesktopBrowserPage from "../../pages/Desktop/DesktopBrowserPage";
import DesktopBudgetPage from "../../pages/Desktop/DesktopBudgetPage";
import DesktopFoldersPage from "../../pages/Desktop/DesktopFoldersPage";
import DesktopSettingsPage from "../../pages/Desktop/DesktopSettingsPage";

const RenderAppContentComp = ({
  appName,
  appKey,
  appContentType,
  appContent,
  label,
  folderIndex
}) => {
  const renderAppContent = () => {
    switch (appName) {
      case "Folders":
        return (
          <div className="appBackgroundStyle" id="FolderPageId">
            <DesktopFoldersPage
              appKey={appKey}
              appContentType={appContentType}
              appContent={appContent}
              label={label}
              folderIndex={folderIndex}
            />
          </div>
        );
      case "Budget":
        return (
          <div className="appBackgroundStyle" id="BudgetPageId">
            <DesktopBudgetPage appKey={appKey} />
          </div>
        );
      case "Settings":
        return (
          <div className="appBackgroundStyle">
            <DesktopSettingsPage />
          </div>
        );
      case "Browser":
        return(
          <div className="appBackgroundStyle">
            <DesktopBrowserPage />
          </div>
        )
      default:
        return <></>;
    }
  };
  return <>{renderAppContent()}</>;
};

export default RenderAppContentComp;

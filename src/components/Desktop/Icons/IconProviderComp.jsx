import React from "react";
import { IconContext } from "react-icons";
import { FcOpenedFolder, FcEngineering ,FcLeft,FcSelfServiceKiosk,FcMenu,FcBullish,FcGoogle} from "react-icons/fc";

const IconProviderComp = ({ iconName, settings }) => {
  const chooseIcon = () => {
    switch (iconName) {
      case "desktop":
        return <FcSelfServiceKiosk />
      case "menu" : 
        return <FcMenu />
      case "goBack":
        return <FcLeft />
      case "folder":
        return <FcOpenedFolder />;
      case "settings":
        return <FcEngineering />;
      case "budget":
        return <FcBullish />
      case "browser":
        return <FcGoogle />
      default:
        return <></>;
    }
  };
  return (
    <>
      {settings ? (
        <IconContext.Provider value={settings}>
          {chooseIcon()}
        </IconContext.Provider>
      ) : (
        <>{chooseIcon()}</>
      )}
    </>
  );
};

export default IconProviderComp;

import React from "react";
import { Button, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { IconContext } from "react-icons";
import { FcList, FcPhoneAndroid } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { actionSetOperationMode } from "../../reducers/settingsReducer";
import { actionOpenApp } from "../../reducers/desktopModeReducer";
import IconProviderComp from "./Icons/IconProviderComp";
const DesktopMainMenuComp = () => {
  const dispatch = useDispatch(null);
  const apps = useSelector((state) => state.desktopModeReducer.apps);
  const MenuContent = (
    <Menu>
      {apps &&
        apps.map((app) => {
          return (
            <>
              <MenuItem
                text={app.appName}
                icon={
                  <IconProviderComp
                    iconName={app.icon}
                    settings={{ size: "2rem" }}
                  />
                }
                onClick={() =>
                  dispatch(
                    actionOpenApp({
                      appName: app.appName,
                      icon: app.icon,
                      appContentType : app.appContentType
                    })
                  )
                }
              />
              <MenuDivider />
            </>
          );
        })}
      <MenuItem
        text="Mobile Mode"
        icon={
          <IconContext.Provider value={{ size: "2rem" }}>
            <FcPhoneAndroid />
          </IconContext.Provider>
        }
        onClick={() => dispatch(actionSetOperationMode("mobile"))}
      />
    </Menu>
  );
  return (
    <Popover2 placement="top" content={MenuContent}>
      <Button
        icon={
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <FcList />
          </IconContext.Provider>
        }
      />
    </Popover2>
  );
};

export default DesktopMainMenuComp;

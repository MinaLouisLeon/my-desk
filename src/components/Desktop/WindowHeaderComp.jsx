import React from "react";
import styled from "styled-components";
import IconProviderComp from "./Icons/IconProviderComp";
import {
  actionCloseApp,
  actionToggleAppFullscreen,
  actionToggleAppMin,
} from "../../reducers/desktopModeReducer";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, Icon } from "@blueprintjs/core";
import ContextMenuComp from "./ContextMenuComp";
const WindowHeader = styled.header`
  width: 100%;
  height: 40px;
  background-color: #00000021;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
`;
const HeaderBtns = styled.div`
  background-color: transparent;
  display: flex;
`;
const WindowHeaderComp = ({ appName, icon, isFullscreen }) => {
  const dispatch = useDispatch(null);
  return (
    <WindowHeader className="pl2 pr2" id={`${appName}HeaderContextMenuId`}>
      <ContextMenuComp 
        targetId={`${appName}HeaderContextMenuId`}
        options={[
          {
            text : "Minimize",
            icon :"minus",
            color : "none",
            handler : () => dispatch(actionToggleAppMin(appName))
          },
          {
            text : "Restore",
            icon : "minimize",
            color : "none",
            disabled : isFullscreen ? false : true,
            handler : () => dispatch(actionToggleAppFullscreen(appName))
          },
          {
            text : "Maximize",
            icon : "maximize",
            color : "none",
            disabled : isFullscreen ? true : false,
            handler : () => dispatch(actionToggleAppFullscreen(appName))
          },{
            text : "Close",
            icon : "cross",
            color : "danger",
            handler : () => dispatch(actionCloseApp(appName))
          }
        ]}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconProviderComp iconName={icon} />
        <div className="fw6 pl1">{appName}</div>
      </div>
      <HeaderBtns>
        <ButtonGroup minimal={true}>
          {!isFullscreen && (
            <Button
              className="dragHandlerClass"
              icon="move"
            />
          )}
          <Button
            onClick={() => dispatch(actionToggleAppMin(appName))}
            icon="minus"
          />
          <Button
            onClick={() => dispatch(actionToggleAppFullscreen(appName))}
            icon={isFullscreen ? "minimize" : "maximize"}
          />
          <Button
            onClick={() => dispatch(actionCloseApp(appName))}
          >
            <Icon  icon="cross" color="#ac2f33" />
          </Button>
        </ButtonGroup>
      </HeaderBtns>
    </WindowHeader>
  );
};

export default WindowHeaderComp;

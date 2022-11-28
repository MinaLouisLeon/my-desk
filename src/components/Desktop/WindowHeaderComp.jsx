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
  background-color: #ffffffd9;
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
const WindowHeaderComp = ({ appName, icon, isFullscreen ,appKey}) => {
  const dispatch = useDispatch(null);
  return (
    <WindowHeader className="pl2 pr2 black" id={`${appKey}HeaderContextMenuId`}>
      <ContextMenuComp 
        targetId={`${appKey}HeaderContextMenuId`}
        options={[
          {
            text : "Minimize",
            icon :"minus",
            color : "none",
            handler : () => dispatch(actionToggleAppMin(appKey))
          },
          {
            text : "Restore",
            icon : "minimize",
            color : "none",
            disabled : isFullscreen ? false : true,
            handler : () => dispatch(actionToggleAppFullscreen(appKey))
          },
          {
            text : "Maximize",
            icon : "maximize",
            color : "none",
            disabled : isFullscreen ? true : false,
            handler : () => dispatch(actionToggleAppFullscreen(appKey))
          },{
            text : "Close",
            icon : "cross",
            color : "danger",
            handler : () => dispatch(actionCloseApp(appKey))
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
              intent="primary"
            />
          )}
          <Button
            onClick={() => dispatch(actionToggleAppMin(appKey))}
            icon="minus"
            intent="primary"
          />
          <Button
            onClick={() => dispatch(actionToggleAppFullscreen(appKey))}
            icon={isFullscreen ? "minimize" : "maximize"}
            intent="primary"
          />
          <Button
            onClick={() => dispatch(actionCloseApp(appKey))}
          >
            <Icon  icon="cross" color="#ac2f33" />
          </Button>
        </ButtonGroup>
      </HeaderBtns>
    </WindowHeader>
  );
};

export default WindowHeaderComp;

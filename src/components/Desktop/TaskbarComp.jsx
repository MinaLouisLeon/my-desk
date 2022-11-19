import React from 'react';
import styled from "styled-components";
import { useSelector,useDispatch } from 'react-redux';
import DesktopMainMenuComp from './DesktopMainMenuComp';
import IconProviderComp from './Icons/IconProviderComp';
import {Button,ButtonGroup} from "@blueprintjs/core";
import {actionToggleAppMin} from '../../reducers/desktopModeReducer';
const Taskbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5rem;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const TaskbarContent = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: azure;
`;
const TaskbarComp = () => {
    const dispatch = useDispatch(null);
    const taskbarOpenedApps = useSelector(
        (state) => state.desktopModeReducer.taskbarOpenedApps
      );
  return (
    <Taskbar>
         <TaskbarContent className="pa2 br4">
          <ButtonGroup minimal={true}>
            <DesktopMainMenuComp />
            {taskbarOpenedApps.map((app) => {
              return (
                <Button
                  onClick={() => dispatch(actionToggleAppMin(app.appKey))}
                  icon={
                    <IconProviderComp
                      iconName={app.icon}
                      settings={{ size: "2rem" }}
                    />
                  }
                />
              );
            })}
            {/* TODO: show desktop buttons */}
            {/* <Button icon={<IconProviderComp iconName="desktop" settings={{size:"2rem"}} />} /> */}
          </ButtonGroup>
        </TaskbarContent>
    </Taskbar>
  )
}

export default TaskbarComp
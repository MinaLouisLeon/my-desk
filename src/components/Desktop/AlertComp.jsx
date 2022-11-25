import React from "react";
import styled from "styled-components";
import { useSelector , useDispatch} from "react-redux";
import { Button } from "@blueprintjs/core";
import { actionCloseAlert } from "../../reducers/tempReducer";
import {actionResetDidFolderExist} from "../../reducers/foldersReducer";
const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #80808087;
  z-index: ${(props) => props.zIndex};
  display: flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;
const AlertContainer = styled.div`
  background-color: white;
`;
const AlertComp = ({children,isOpen}) => {
  const dispatch = useDispatch(null);
  const lastZIndex = useSelector(
    (state) => state.desktopModeReducer.lastZIndex
  );
  return (
    <>
      {isOpen && (
        <BackDrop zIndex={lastZIndex + 4} id="AlertId" className="pa2 shadow-2">
          <AlertContainer className="br4 shadow-2 pa2">
            {children}
            <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}} className="mt2">
              <Button intent="warning" className="mr2" onClick={() => {dispatch(actionCloseAlert());dispatch(actionResetDidFolderExist())}}>OK</Button>
            </div>
          </AlertContainer>
        </BackDrop>
      )}
    </>
  )
}

export default AlertComp;
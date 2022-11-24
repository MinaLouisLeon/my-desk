import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: gray;
  z-index: ${(props) => props.zIndex};
  display: flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;
const PopoverContainer = styled.div`
  background-color: white;
`;
const DesktopPopoverComp = ({ children, isOpen, onDismiss }) => {
  console.log(isOpen);
  const lastZIndex = useSelector(
    (state) => state.desktopModeReducer.lastZIndex
  );

  return (
    <>
      {isOpen && (
        <BackDrop zIndex={lastZIndex + 2} id="PopoverId">
          <PopoverContainer className="br4 shadow-2 pa2">
            {children}
          </PopoverContainer>
        </BackDrop>
      )}
    </>
  );
};

export default DesktopPopoverComp;

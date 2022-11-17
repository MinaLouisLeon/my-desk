//props targetId string
// options array of objects
// object => {text,color,icon,handler,disabled}
// icon from blueprintjs
// handler => function
// disabled => optionals
// eslint-disable-next-line
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Menu, MenuItem } from "@blueprintjs/core";
import { useSelector } from "react-redux";
const ContextMenuContainer = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  left: ${(props) => props.posX}px;
  top: ${(props) => props.posY}px;
  position: fixed;
  z-index: ${(props) => props.zIndex + 1};
`;

const ContextMenuComp = ({ targetId, options }) => {
  const [contextData, setContextData] = useState({
    visible: false,
    posX: 0,
    posY: 0,
  });
  const contextRef = useRef();
  const zIndex = useSelector((state) => state.desktopModeReducer.lastZIndex);
  useEffect(() => {
    const contextMenuEventHandler = (event) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement && targetElement.contains(event.target)) {
        event.preventDefault();
        setContextData({
          visible: true,
          posX: event.clientX,
          posY: event.clientY,
        });
      } else if (
        contextRef.current &&
        !contextRef.current.contains(event.target)
      ) {
        setContextData({
          ...contextData,
          visible: false,
        });
      }
    };

    const offClickHandler = (event) => {
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setContextData({
          ...contextData,
          visible: false,
        });
      }
    };

    document.addEventListener("contextmenu", contextMenuEventHandler);
    document.addEventListener("click", offClickHandler);
    return () => {
      document.removeEventListener("contextmenu", contextMenuEventHandler);
      document.removeEventListener("click", offClickHandler);
    };
  }, [contextData, targetId]);

  // useLayoutEffect(() => {
  //   if (
  //     contextData.posX + contextRef.current?.offsetWidth >
  //     window.innerWidth
  //   ) {
  //     setContextData({
  //       ...contextData,
  //       posX: contextData.posX - contextRef.current?.offsetWidth,
  //     });
  //   }
  //   if (
  //     contextData.posY + contextRef.current?.offsetHeight >
  //     window.innerHeight
  //   ) {
  //     setContextData({
  //       ...contextData,
  //       posY: contextData.posY - contextRef.current?.offsetHeight,
  //     });
  //   }
  // }, [contextData]);

  return (
    <ContextMenuContainer
      ref={contextRef}
      visible={contextData.visible}
      posX={contextData.posX}
      posY={contextData.posY}
      zIndex={zIndex}
    >
      <Menu className="shadow-2">
        {options.map((item) => {
          return (
            <MenuItem
              icon={item.icon}
              text={item.text}
              intent={item.color}
              onClick={(e) => item.handler(e)}
              disabled={item.disabled}
            />
          );
        })}
      </Menu>
    </ContextMenuContainer>
  );
};

export default ContextMenuComp;

import { Button } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import IconProviderComp from "../Icons/IconProviderComp";
import { useDispatch } from "react-redux";
import { actionCloseFolderInDesktopMode } from "../../../reducers/foldersReducer";
const SubHeader = styled.div`
  width: 100%;
  height: 40px;
  background-color: #00000012;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;
const FoldersSubHeader = ({ label }) => {
  const dispatch = useDispatch(null);
  return (
    <SubHeader>
      <Button
        minimal
        onClick={() => dispatch(actionCloseFolderInDesktopMode())}
        icon={
          <IconProviderComp
            iconName="goBack"
            settings={{ size: "2rem" }}
            className="pl2 pr2"
          />
        }
      />
      <div className="fw6 pl4">{`${label} folder`}</div>
    </SubHeader>
  );
};

export default FoldersSubHeader;

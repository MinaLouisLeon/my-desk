import React from "react";
import { Button } from "@blueprintjs/core";
import { useDispatch } from "react-redux";
import { actionClosePopover } from "../../../reducers/tempReducer";
const FormBtns = ({ submitBtnName,onDismiss }) => {
  const dispatch = useDispatch(null);
  return (
    <div
      className="mt3"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Button
        type="button"
        intent="danger"
        className="mr2"
        onClick={() => {
          dispatch(actionClosePopover())
        }}
      >
        Cancel
      </Button>
      <Button type="submit" intent="success" className="mr2">
        {submitBtnName === undefined ? "Submit" : submitBtnName}
      </Button>
    </div>
  );
};

export default FormBtns;

import React from "react";
import styled from "styled-components";
import { ScreenOrientation } from "@awesome-cordova-plugins/screen-orientation";
import "./DesktopStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  actionUpdateAppDataGrid,
  actionUpdateZIndex,
} from "../../reducers/desktopModeReducer";
import WindowHeaderComp from "../../components/Desktop/WindowHeaderComp";
import TaskbarComp from "../../components/Desktop/TaskbarComp";
import RenderAppContentComp from "../../components/Desktop/RenderAppContentComp";
import DesktopPopoverComp from "../../components/Desktop/DesktopPopoverComp";
import AlertComp from "../../components/Desktop/AlertComp";
import { actionOpenAlert } from "../../reducers/tempReducer";
const BackgroundComp = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${(props) => props.backgroundColor};
  background-image: ${(props) => props.backgroundImage};
`;
const WorkareaComp = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 5rem;
  background-color: transparent;
  z-index: 0;
`;
const GridItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const WindowComp = styled.div`
  display: ${(props) => (props.isMin ? "none" : "block")};
  z-index: ${(props) => props.zIndex};
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

const DesktopMainPage = () => {
  ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const dispatch = useDispatch(null);
  const appsData = useSelector((state) => state.desktopModeReducer.appsData);
  const backgroud = useSelector((state) => state.desktopModeReducer.backgroud);
  const popoverState = useSelector((state) => state.tempReducer.popoverState);
  const alertState = useSelector((state) => state.tempReducer.alertState);
  const didBudgetExist = useSelector(
    (state) => state.budgetsReducer.didBudgetExist
  );
  const isAlertOpen = useSelector(
    (state) => state.tempReducer.alertState.isOpen
  );
  if (didBudgetExist && !isAlertOpen) {
    dispatch(actionOpenAlert(<div className="ma3">budget Exist !</div>));
  }
  return (
    <BackgroundComp
      backgroundColor={backgroud.backgroundColor}
      backgroundImage={backgroud.backgroundImage}
      id="DesktopContextMenuId"
    >
      <AlertComp isOpen={alertState.isOpen}>{alertState.content}</AlertComp>
      <DesktopPopoverComp isOpen={popoverState.isOpen}>
        {popoverState.content}
      </DesktopPopoverComp>
      {/* TODO: add desktop context menu */}
      <WorkareaComp>
        <GridItemsContainer>
          <ResponsiveGridLayout
            breakpoints={{ lg: 996 }}
            cols={{ lg: 12 }}
            margin={[10, 10]}
            containerPadding={[1, 1]}
            rowHeight={30}
            compactType={null}
            draggableHandle=".dragHandlerClass"
            isDraggable={true}
            isResizable={true}
            allowOverlap={true}
            preventCollision={false}
            isDroppable={true}
            useCSSTransforms={false}
            onDragStop={(layout) => dispatch(actionUpdateAppDataGrid(layout))}
            onResizeStop={(layout) => dispatch(actionUpdateAppDataGrid(layout))}
          >
            {appsData.map((app) => {
              return (
                <WindowComp
                  className="shadow-2"
                  key={`${app.appKey}`}
                  id={`${app.appName}-contextMenu`}
                  data-grid={app.dataGrid}
                  zIndex={app.status.zIndex}
                  isMin={app.status.isMin}
                  onClick={() => dispatch(actionUpdateZIndex(app.appKey))}
                >
                  <WindowHeaderComp
                    appName={app.appName}
                    icon={app.icon}
                    isFullscreen={app.status.isFullscreen}
                    appKey={app.appKey}
                  />
                  <RenderAppContentComp
                    appName={app.appName}
                    appKey={app.appKey}
                    appContentType={app.appContentType}
                    appContent={app.appContent}
                    label={app.label}
                    folderIndex={app.folderIndex}
                  />
                </WindowComp>
              );
            })}
          </ResponsiveGridLayout>
        </GridItemsContainer>
      </WorkareaComp>
      <TaskbarComp />
    </BackgroundComp>
  );
};

export default DesktopMainPage;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Suspense } from "react";
import { TasksProvider } from "../../context/task/context";
const ProjectDetails = React.lazy(() => import("./ProjectDetails"));

import { Outlet } from "react-router-dom";
import { CommentsProvider } from "../../context/comment/context";
import ErrorBoundary from "../../components/ErrorBoundary";
const ProjectDetailsIndex: React.FC = () => {
  return (
    <TasksProvider>
      <CommentsProvider>
        <ErrorBoundary>
          <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
            <ProjectDetails />
          </Suspense>
        </ErrorBoundary>
        <Outlet />
      </CommentsProvider>
    </TasksProvider>
  );
};

export default ProjectDetailsIndex;
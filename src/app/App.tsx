import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Global } from "@emotion/react";
import {
  rounded,
  topElementStyles,
  globalDefaults,
} from "./styles/globalStyles";
import Login from "./routes/auth/login";
import Signin from "./routes/auth/signin";
import fonts from "./styles/fonts";
import Root from "./Root";
import ErrorBanner from "./routes/errors/error-banner";
import { GlobalErrorProvider } from "./hooks/useGlobalErrors";
import GlobalErrorsDisplayer from "./routes/errors/global-errors";
// import LocationDetailsPage from "./routes/old/location/location-details-page";
// import LocationEditor from "./routes/old/location/location-editor";
// import LocationTable from "./routes/old/location/location-table";
import ProtectedRoute from "./components/protected";
// import UserPanel from "./routes/old/user/user-panel";
// import OrganizationTable from "./routes/old/organization/organization-table";
// import OrganizationEditor from "./routes/old/organization/organization-editor";
// import PersonDetailsPage from "./routes/old/person/person-details-page";
// import PersonTable from "./routes/old/person/person-table";
// import PersonEditor from "./routes/old/person/person-editor";
// import OrganizationDetailsPage from "./routes/old/organization/organization-details-page";
// import WorkerTable from "./routes/old/worker/worker-table";
// import WorkerDetailsPage from "./routes/old/worker/worker-details-page";
// import WorkerEditor from "./routes/old/worker/worker-editor";
// import Special from "./routes/old/special/special";
import IssueList from "./routes/issue/issues-list";
import { Comment } from "./routes/issue/comment";
import { IssueView } from "./routes/issue/issue-details";
import { CommentEditor } from "./routes/issue/comment-editor";
import { CommentReplyEditor } from "./routes/issue/comment-reply";
import { SprintList } from "./routes/sprint/sprint-list";
import { SprintEditor } from "./routes/sprint/sprint-editor";
import { IssueCreate } from "./routes/issue/issue-editor";
import { EpicList } from "./routes/epic/epic-list";
import { EpicEditor } from "./routes/epic/epic-editor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        index: true,
        element: <Navigate to="/issue" replace />
      },
      {
        path: "issue",
        element: <IssueList />
      },
      {
        path: "issue/create",
        element: <IssueCreate />
      },
      {
        path: "issue/:issueId/:commentId?",
        element: <IssueView />
      },
      {
        path: "comment/:commentId/edit",
        element: <CommentEditor />
      },
      {
        path: "comment/reply/:toCommentId",
        element: <CommentReplyEditor />
      },
      {
        path: "sprint",
        element: <SprintList />
      },
      {
        path: "sprint/edit/:sprintId?",
        element: <SprintEditor />
      },
      {
        path: "epic",
        element: <EpicList />
      },
      {
        path: "epic/edit/:epicId?",
        element: <EpicEditor />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "forbidden",
        element: <ErrorBanner />,
      },

    ],
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <GlobalErrorProvider>
        <Global styles={fonts} />
        <Global styles={globalDefaults} />
        <Global styles={topElementStyles} />
        <Global styles={rounded} />
        <RouterProvider router={router} />
        <GlobalErrorsDisplayer />
      </GlobalErrorProvider>
    </React.StrictMode>
  );
}

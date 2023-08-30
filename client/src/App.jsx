import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// layouts
import { DashboardLayout, HomeLayout } from './layouts';
// pages
import {
  AddJob,
  Admin,
  AllJobs,
  DeleteJob,
  EditJob,
  ErrorPage,
  Landing,
  Login,
  Profile,
  Register,
  Stats
} from './pages';

//actions
import { action as registerAction } from './pages/Register.jsx';
import { action as loginAction } from './pages/Login.jsx';
import { action as addJobAction } from './pages/AddJob.jsx';
import { action as editJobAction } from './pages/EditJob.jsx';
import { action as deleteJobAction } from './pages/DeleteJob.jsx';
import { action as profileAction } from './pages/Profile.jsx';

// loaders
import { loader as dashboardLoader } from './layouts/DashboardLayout.jsx';
import { loader as alljobsLoader } from './pages/AllJobs.jsx';
import { loader as editJobLoader } from './pages/EditJob.jsx';
import { loader as adminLoader } from './pages/Admin.jsx';
import { loader as statsLoader } from './pages/Stats.jsx';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'register',
        element: <Register />,
        action: registerAction
      },
      { path: 'login', element: <Login />, action: loginAction },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddJob />, action: addJobAction },
          { path: 'all-jobs', element: <AllJobs />, loader: alljobsLoader },
          { path: 'stats', element: <Stats />, loader: statsLoader },
          { path: 'profile', element: <Profile />, action: profileAction },
          { path: 'admin', element: <Admin />, loader: adminLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            action: editJobAction,
            loader: editJobLoader
          },
          { path: 'delete-job/:id', action: deleteJobAction }
        ]
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

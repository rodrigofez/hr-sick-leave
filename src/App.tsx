import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
import Login from './screens/Auth/Login';
import NotFound from './screens/NotFound';
import ApplicationsScreen from './screens/Applications';

const AuthRouter = createBrowserRouter([
	{
		errorElement: <NotFound />,
		path: '/',
		element: <DashboardLayout />,
		children: [
			{ path: '/', element: <Navigate to="/applications" /> },
			{ path: 'applications', element: <ApplicationsScreen /> },
		],
	},
	{
		errorElement: <NotFound />,
		path: '/auth/login',
		element: <AuthLayout />,
		children: [{ path: '', element: <Login /> }],
	},
]);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={AuthRouter} />
			<Toaster expand />
		</QueryClientProvider>
	);
}

export default App;

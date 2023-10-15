import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
import Login from './screens/Auth/Login';

const AuthRouter = createBrowserRouter([
	{
		path: '/',
		element: <DashboardLayout />,
		children: [
			{ path: '/', element: <div>Dashboard</div> },
			{ path: 'applications', element: <div>Applications</div> },
		],
	},
	{
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
		</QueryClientProvider>
	);
}

export default App;

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthLayout from './layout/AuthLayout';
import Login from './screens/Auth/Login';

const AuthRouter = createBrowserRouter([
	{
		path: '/',
		element: <Outlet />,
		children: [],
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

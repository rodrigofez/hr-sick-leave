import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import Input from '../../components/Input';
import Button from '../../components/Button';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../utils/api';
import { Auth, useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
	email: yup.string().email().required().label('Email'),
	password: yup.string().required().label('Password'),
});

const Login = () => {
	const setAuth = useAuthStore((state) => state.setAuth);
	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation<
		Auth,
		{ message: string },
		{ email: string; password: string }
	>(
		(data: { email: string; password: string }) =>
			api.post('auth/login', data).then((res) => res.data),
		{
			onSuccess: (auth) => {
				setAuth(auth);
				toast.success('Login successful');
				navigate('/applications');
			},
			onError: () => {
				toast.error('Login failed');
			},
		}
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
				login(data);
			})}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '14px',
				alignItems: 'start',
				padding: '20px',
				boxSizing: 'border-box',
				width: '100%',
				maxWidth: '400px',
			}}
		>
			<h1>Login</h1>
			<Input
				register={register('email')}
				error={!!errors.email}
				errorMessage={errors.email?.message}
				icon={<PersonIcon />}
				label="Email"
				placeholder="Email"
				type="email"
			></Input>
			<Input
				register={register('password')}
				error={!!errors.password}
				errorMessage={errors.password?.message}
				icon={<LockClosedIcon />}
				label="Password"
				placeholder="password"
				type="password"
			></Input>
			<Button
				isLoading={isLoading}
				disabled={isLoading}
				variant="primary"
				type="submit"
			>
				Login
			</Button>
		</form>
	);
};

export default Login;

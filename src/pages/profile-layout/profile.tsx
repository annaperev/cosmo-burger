import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserProfile } from '../../services/auth/thunk-auth';
import { getUser } from '../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useForm } from '../../utils/hooks';

export const Profile = () => {
	const user = useAppSelector(getUser);
	const dispatch = useAppDispatch();

	const [isEdited, setIsEdited] = useState(false);
	const [formData, handleChange, resetForm] = useForm({
		name: user?.name || '',
		email: user?.email || '',
		password: '',
	});

	useEffect(() => {
		setIsEdited(formData.name !== user?.name || formData.email !== user?.email);
	}, [formData, user]);

	const handleCancel = () => {
		resetForm();
		setIsEdited(false);
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(updateUserProfile(formData.name, formData.email));
		setIsEdited(false);
	};

	return (
		<div>
			<form onSubmit={handleSubmit} className={styles.profile}>
				<Input
					name='name'
					autoComplete='name'
					placeholder={'Имя'}
					value={formData.name}
					onChange={handleChange}
					icon={'EditIcon'}
				/>
				<Input
					name='email'
					autoComplete='email'
					placeholder={'Логин'}
					value={formData.email}
					onChange={handleChange}
					icon={'EditIcon'}
				/>
				<PasswordInput
					name='password'
					placeholder={'Пароль'}
					value={formData.password}
					onChange={handleChange}
					icon={'EditIcon'}
				/>
				{isEdited && (
					<div className={styles.profile_buttons}>
						<Button
							htmlType='reset'
							type='secondary'
							size='large'
							onClick={handleCancel}>
							Отмена
						</Button>
						<Button htmlType='submit' type='primary' size='large'>
							Сохранить
						</Button>
					</div>
				)}
			</form>
		</div>
	);
};

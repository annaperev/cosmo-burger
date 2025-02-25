import React, { FC, useState } from 'react';
import styles from './profile.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserProfile } from '../../services/auth/thunk-auth';
import { getUser } from '../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Profile: FC = () => {
	const user = useAppSelector(getUser) || {
		name: '',
		email: '',
	};
	const dispatch = useAppDispatch();

	const [formData, setFormData] = useState({ ...user });
	const [isEdited, setIsEdited] = useState(false);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setIsEdited(true);
	};

	const handleCancel = () => {
		setFormData(user);
		setIsEdited(false);
	};
	const handleSave = () => {
		dispatch(updateUserProfile(formData.name, formData.email));
		setIsEdited(false);
	};

	return (
		<div className={styles.profile}>
			<Input
				name='name'
				placeholder={'Имя'}
				value={formData.name}
				onChange={handleChange}
				icon={'EditIcon'}
			/>
			<Input
				name='email'
				placeholder={'Логин'}
				value={formData.email}
				onChange={handleChange}
				icon={'EditIcon'}
			/>
			<PasswordInput
				name='password'
				placeholder={'Пароль'}
				value={formData.password || ''}
				onChange={handleChange}
				icon={'EditIcon'}
			/>
			{isEdited && (
				<div className={styles.profile_buttons}>
					<Button
						htmlType='button'
						type='secondary'
						size='large'
						onClick={handleCancel}>
						Отмена
					</Button>
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={handleSave}>
						Сохранить
					</Button>
				</div>
			)}
		</div>
	);
};

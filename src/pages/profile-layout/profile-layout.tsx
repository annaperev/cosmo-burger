import React, { FC } from 'react';
import { ProfileNavigationPanel } from './profile-navigation-panel';
import styles from './profile.module.css';
import { Outlet } from 'react-router-dom';

export const ProfileLayout: FC = () => {
	return (
		<div className={`${styles.container} mt-20`}>
			<ProfileNavigationPanel />
			<Outlet />
		</div>
	);
};

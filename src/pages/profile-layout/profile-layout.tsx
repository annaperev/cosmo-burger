import React from 'react';
import { ProfileNavigationPanel } from './profile-navigation-panel';
import styles from './profile.module.css';
import { Outlet } from 'react-router-dom';

export const ProfileLayout = () => {
	return (
		<div className={`${styles.container} mt-20`}>
			<ProfileNavigationPanel />
			<Outlet />
		</div>
	);
};

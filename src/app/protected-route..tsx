import React from 'react';
import { getIsAuthChecked, getUser } from '../services/selectors';
import { useAppSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({
	onlyAuth = true,
	component,
}: {
	onlyAuth?: boolean;
	component: JSX.Element;
}) => {
	debugger;
	const isAuthChecked = useAppSelector(getIsAuthChecked);
	const user = useAppSelector(getUser);
	const location = useLocation();

	if (!isAuthChecked) {
		return <p>Loading...</p>;
	}

	if (onlyAuth && !user) {
		//for authorized users, but user is unauthorized
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (!onlyAuth && user) {
		//for unauthorized users, but user is authorized
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	// onlyUnAuth && !user - for unauthorized users und user is unauthorized
	// !onlyUnAuth && user - for authorized users und user is authorized

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
	<Protected onlyAuth={false} component={component} />
);

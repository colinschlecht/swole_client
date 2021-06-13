import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/api/v1/';

const rails = axios.create({
	baseURL: BACKEND_URL,
});

const token = () => localStorage.getItem('token');

const headers = () => {
	return {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: token(),
	};
};

const signup = (data) => {
	return fetch(`${BACKEND_URL}/users`, {
		method: 'POST',
		headers: headers(),
		body: JSON.stringify({
			user: data,
		}),
	}).then((res) => res.json());
};

const login = (data) => {
	return fetch(`${BACKEND_URL}/login`, {
		method: 'POST',
		headers: headers(),
		body: JSON.stringify(data),
	}).then((res) => res.json());
};

const getCurrentUser = () => {
	return fetch(`${BACKEND_URL}/profile`, {
		headers: headers(),
	}).then((res) => res.json());
};

const updateUser = async (id, user) => {
	return await rails.patch(`/user/${id}`, user);
};

const deleteUser = async (user) => {
	return await rails.delete(`/user/${user.id}`);
};

const getOneUser = async (id) => {
	return await rails.get(`/${id}`);
};

export const api = {
	auth: {
		signup,
		login,
		getCurrentUser,
	},
	users: {
		getOneUser,
	},
	rails,
};

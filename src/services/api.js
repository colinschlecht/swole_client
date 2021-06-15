import axios from "axios";

const BACKEND_URL = "http://localhost:3000/api/v1/";
// const BACKEND_URL = "https://swolemates-api.herokuapp.com/api/v1/users";

const rails = axios.create({
  baseURL: BACKEND_URL,
});

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + token(),
  };
};

////////////////////////! Auth API
const signup = (data) => {
  return fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      user: data,
    }),
  }).then((res) => res.json());
};

const login = (data) => {
  return fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const getCurrentUser = () => {
  console.log(token());
  return fetch(`${BACKEND_URL}/profile`, {
    headers: headers(),
  }).then((res) => res.json());
};

const updateUser = async (id, user) => {
  // const res = await rails.patch(etccc)
  //return res.data
  return await rails.patch(`/users/${id}`, user);
};

const deleteUser = async (user) => {
  // const res = await rails.delete(etccc)
  //return res.data
  return await rails.delete(`/users/${user.id}`);
};

const getUser = async (id) => {
  return await rails.get(`users/${id}`);
};

////////////////////////! Preferences API

const newDietPref = async (data) => {
  return await rails.post(`${BACKEND_URL}/diets`, data);
};
const newTimePref = async (data) => {
  return await rails.post(`${BACKEND_URL}/exercise_times`, data);
};
const newDisciplinePref = async (data) => {
  return await rails.post(`${BACKEND_URL}/exercise_disciplines`, data);
};
const newGenderPref = async (data) => {
  return await rails.post(`${BACKEND_URL}/gender_preferences`, data);
};
const newLocation = async (data) => {
  return await rails.post(`${BACKEND_URL}/locations`, data);
};
const newMusicPref = async (data) => {
  return await rails.post(`${BACKEND_URL}/music_preferences`, data);
};

const editDietPref = async (data, id) => {
  return await rails.patch(`${BACKEND_URL}/diets/${id}`, data);
};
const editTimePref = async (data, id) => {
  return await rails.patch(`${BACKEND_URL}/exercise_times/${id}`, data);
};
const editDisciplinePref = async (data, id) => {
  return await rails.patch(`${BACKEND_URL}/exercise_disciplines/${id}`, data);
};
const editGenderPref = async (data, id) => {
  return await rails.patch(`${BACKEND_URL}/gender_preferences/${id}`, data);
};
const editLocation = async (data, id) => {
  return await rails.patch(`${BACKEND_URL}/locations/${id}`, data);
};
const editMusicPref = async (data, id) => {
  return await rails.patch(`${BACKEND_URL}/music_preferences/${id}`, data);
};

export const api = {
  auth: {
    signup,
    login,
    getCurrentUser,
  },
  pref: {
    newDietPref,
    newTimePref,
    newDisciplinePref,
    newGenderPref,
    newLocation,
    newMusicPref,
    editDietPref,
    editTimePref,
    editDisciplinePref,
    editGenderPref,
    editLocation,
    editMusicPref,
  },
  users: {
    getUser,
    updateUser,
    deleteUser,
  },
  rails,
};

import axios from "axios";

const BACKEND_URL = "http://localhost:3000/api/v1/";

const rails = axios.create({
  baseURL: BACKEND_URL,
});

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
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



////////////////////////! Preferences API

const newDietPref = async (data) => {
  return await rails.post(`${BACKEND_URL}/diets`, data)
};
const newTimePref = async (data) => {
  return await rails.post(`${BACKEND_URL}/exercise_times`, data)
};
const newDisciplinePref = async (data) => {
  return await rails.post(`${BACKEND_URL}/exercise_disciplines`, data)
};
const newGenderPref = async (data) => {
  return await rails.post(`${BACKEND_URL}/gender_preferences`, data)
};
const newLocation = async (data) => {
  return await rails.post(`${BACKEND_URL}/locations`, data)
};
const newMusicPref = async (data) => {
  return await rails.post(`${BACKEND_URL}/music_preferences`, data)
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
  },
  rails,
};

import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { api } from "../services/api";

//pass user id through routerprops/match params
//api call to database [get user info based on id]
//dont need form / display user info

//get currentUser obj through props
//map through props to display User profile information
//add logic to handleclick
const UserProfilePage = () => {
  const handleEdit = () => {};
  const onEditForm = async (e) => {
    e.preventDefault();
  };

  return <div className="container pt-5"></div>;
};

export default UserProfilePage;

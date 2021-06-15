import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { api } from "../services/api";

import UserImageCarousel from "./UserImageCarousel";
import AttrList from "./AttrList";

//pass user id through routerprops/match params
//api call to database [get user info based on id]
//dont need form / display user info

//add logic to handleclick
const UserProfilePage = ({ routerProps, location }) => {
  const [user, setUser] = useState("");
  const [currentLoc, setCurrentLoc] = useState(location.location);
  const [dist, setDist] = useState(0)

  useEffect(() => {
    //! get profile data
    api.users
      .getUser(routerProps.match.params.id)
      .then((result) => setUser(result.data))
  }, [routerProps.match.params.id]);

  const handleEdit = () => {};
  const onEditForm = async (e) => {
    e.preventDefault();
  };

  function getDistance(lat1, lon1, lat2, lon2) {
    let R = 3958.8; // Radius of the earth in miles
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in mi
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const distance = () => {
    if (user && currentLoc) {
      getDistance(
        user?.location.latitude,
        user?.location.longitude,
        currentLoc?.latitude,
        currentLoc?.longitude
      );
    }
  };

  return (
    <Container fluid>
      <Container fluid className="profilecontainer">
        <Row className="justify-content-center w-75 p-1 m-auto">
          <Col>
            <UserImageCarousel />
          </Col>
        </Row>
        <Row className="justify-content-center w-75 m-auto">
          <Col>
            <h1>{user.name}</h1>
          </Col>
          <Col>
            <h1 className="age">{user.age}</h1>
          </Col>
        </Row>
        <Row className="w-75 m-auto">
          <Col>
            <h6>{user.gender}</h6>
          </Col>
          <Col>
            <h6 className="distance">{user.gender}</h6>
          </Col>
        </Row>
        <Row className="w-75 p-3 m-auto bio">
          <h6 className="">{user.bio}</h6>
        </Row>
        <Row className="justify-content-center w-75 m-auto">
          <h4 id="attrsectiontitle">Preferences</h4>
        </Row>
        <Row className="w-75 m-auto ">
          <Col>
            {user && (
              <AttrList
                key={user?.exercise_discipline.id}
                attrObj={user?.exercise_discipline}
                listName={"exercise_discipline"}
              />
            )}
          </Col>
          <Col>
            {user && (
              <AttrList
                key={user?.exercise_time.id}
                attrObj={user?.exercise_time}
                listName={"exercise_time"}
              />
            )}
          </Col>
          <Col>
            {user && (
              <AttrList
                key={user?.diet.id}
                attrObj={user?.diet}
                listName={"diet"}
              />
            )}
          </Col>
          <Col>
            {user && (
              <AttrList
                key={user?.music_preference.id}
                attrObj={user?.music_preference}
                listName={"music_preference"}
              />
            )}
          </Col>
          <Col>
            {user && (
              <AttrList
                key={user?.gender_preference.id}
                attrObj={user?.gender_preference}
                listName={"gender_preference"}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default UserProfilePage;

import React, { useState, useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";

import { Gear } from "react-bootstrap-icons";
import { api } from "../services/api";

import UserImageCarousel from "./UserImageCarousel";
import AttrList from "./AttrList";

const UserProfilePage = ({ routerProps, location, auth }) => {
  const [user, setUser] = useState("");
  const [dist, setDist] = useState("");

  useEffect(() => {
    //! get profile data
    api.users.getUser(routerProps.match.params.id).then((result) => {
      setUser(result.data);
    });
  }, [routerProps]);

  const handleEdit = () => {};
  const onEditForm = async (e) => {
    e.preventDefault();
  };

  function getDistance() {
    const lat1 = parseFloat(user.location?.latitude);
    const lon1 = parseFloat(user.location?.longitude);
    const lat2 = parseFloat(location.location.latitude);
    const lon2 = parseFloat(location.location.longitude);
    var R = 3958.8; // Radius of the earth in miles
    var rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (lon2 - lon1) * (Math.PI / 180); // Radian difference (longitudes)
    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    console.log(d);
    if (d === 0) {
      let distance = parseInt(d);
      setDist(distance.toString());
    } else {
      if (d) {
        let distance = parseInt(d);
        setDist(distance.toString());
      }
    }
  }

  return (
    <Container fluid className="outer-profilecontainer">
      <Container fluid className="profilecontainer">
        <Row className="edit">
          <Col>
            {user.id === auth.user.id ? (
              <Link to={`${user.id}/edit`}>
                <h1>
                  <Gear className="editicon" />
                </h1>
              </Link>
            ) : null}
          </Col>
        </Row>
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
            <h6 className="distance">
              {dist ? dist : getDistance()} miles away
            </h6>
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

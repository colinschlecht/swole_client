import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Gear } from "react-bootstrap-icons";
import { api } from "../services/api";

import UserImageCarousel from "./UserImageCarousel";
import EditAttrList from "./EditAttrList";

const EditUser = ({ routerProps, location, auth }) => {
  //! user state
  const [user, setUser] = useState("");
  const [dist, setDist] = useState("");

  //! editing state

  const [editingName, setEditingName] = useState(false);
  const [editingAge, setEditingAge] = useState(false);
  const [editingGender, setEditingGender] = useState(false);
  const [editingBio, setEditingBio] = useState(false);

  //!form state
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [bio, setBio] = useState(user.bio);
  const [gender, setGender] = useState(user.gender);
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [passwordConfirm, setPasswordConfirm] = useState("");
  //attrs
  const [exercise_time, setExerciseTime] = useState(user.exercise_time);
  const [exercise_discipline, setExerciseDiscipline] = useState(
    user.exercise_discipline
  );
  const [diet, setDiet] = useState(user.diet);
  const [music_preference, setMusicPreference] = useState(
    user.music_preference
  );
  const [gender_preference, setGenderPreference] = useState(
    user.gender_preference
  );

  useEffect(() => {
    //! get profile data
    api.users.getUser(routerProps.match.params.id).then((result) => {
      setUser(result.data);
    });
  }, [routerProps]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const onReset = () => {
    window.location.reload();
  };
  const onCancel = () => {
    routerProps.history.push(`/profile/${user.id}`);
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

  const handleChange = (changeObj, title) => {
    console.log(changeObj);
    console.log(title);
    switch (title) {
      case "exercise_discipline":
        setExerciseDiscipline(changeObj);
        break;
      case "exercise_time":
        setExerciseTime(changeObj);
        break;
      case "diet":
        setDiet(changeObj);
        break;
      case "music_preference":
        setMusicPreference(changeObj);
        break;
      case "gender_preference":
        setGenderPreference(changeObj);
        break;
      default:
        break;
    }
  };

  return (
    <Container fluid className="outer-profilecontainer">
      <Container fluid className="profilecontainer">
        <Row className="edit">
          <Col>
            {user.id === auth.user.id ? (
              <Link to={`profile/${user.id}/edit`}>
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
            <h1>
              {editingName ? (
                <>
                  <Gear
                    className="editicon small"
                    onClick={() => setEditingName(!editingName)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <Gear
                    className="editicon small"
                    onClick={() => setEditingName(!editingName)}
                  />
                  {user.name}
                </>
              )}
            </h1>
          </Col>
          
            {editingAge ? (
                      <>
                <Form.Group controlId="formBasicRangeCustom">
                      <Form.Control
                      className="age-range"
                        type="range"
                        custom
                        value={age}
                        min={1}
                        max={100}
                        step={1}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Form.Group>
                    <Col>
                <Gear
                  className="editiconage editicon"
                  onClick={() => setEditingAge(!editingAge)}
                />
                <h1 className="age">{age}</h1>
                </Col>
              </>
            ) : (
              <Col>
                <Gear
                  className="editiconage editicon"
                  onClick={() => setEditingAge(!editingAge)}
                />
                <h1 className="age">{age}</h1>
              </Col>
            )}
          
        </Row>
        <Row className="w-75 m-auto">
          <Col>
            <h6>
              {user.gender}&nbsp;
              <Gear
                onClick={() => setEditingGender(!editingGender)}
                className="editicon gender"
              />
            </h6>
          </Col>
          <Col>
            <h6 className="distance">
              {dist ? dist : getDistance()} miles away
            </h6>
          </Col>
        </Row>
        <Row className="w-75 p-3 m-auto bio">
          {editingBio ? (
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Col>
                <Gear
                  className="editiconbio editicon"
                  onClick={() => setEditingBio(!editingBio)}
                />
                <Form.Control
                  defaultValue={user.bio}
                  as="textarea"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Col>
            </Form.Group>
          ) : (
            <>
              <Gear
                className="editiconbio editicon"
                onClick={() => setEditingBio(!editingBio)}
              />
              &nbsp;
              <h6 className="">{user.bio}</h6>
            </>
          )}
        </Row>
        <Row className="justify-content-center w-75 m-auto">
          <h4 id="attrsectiontitle">Preferences</h4>
        </Row>
        <Row className="w-75 m-auto ">
          <Col>
            {user && (
              <EditAttrList
                key={user?.exercise_discipline.id}
                attrObj={user?.exercise_discipline}
                listName={"exercise_discipline"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>
          <Col>
            {user && (
              <EditAttrList
                key={user?.exercise_time.id}
                attrObj={user?.exercise_time}
                listName={"exercise_time"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>
          <Col>
            {user && (
              <EditAttrList
                key={user?.diet.id}
                attrObj={user?.diet}
                listName={"diet"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>

          <Col>
            {user && (
              <EditAttrList
                key={user?.music_preference.id}
                attrObj={user?.music_preference}
                listName={"music_preference"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>
          <Col>
            {user && (
              <EditAttrList
                key={user?.gender_preference.id}
                attrObj={user?.gender_preference}
                listName={"gender_preference"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EditUser;

// {
//     //! NAME
//   }
//   <Row className="justify-content-center">
//     <div className="col-10 col-sm-8 col-md-5 my-3">
//       <input
//         type="text"
//         className="form-control"
//         name="name"
//         placeholder="Username"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//     </div>
//   </Row>

// {
//     //! AGE
//   }
//   <Row className="justify-content-center">
//     <Form.Group controlId="formBasicRangeCustom">
//       <Form.Label>Age (1 - 100)</Form.Label>
//       <Form.Control
//         type="range"
//         custom
//         value={age}
//         min={1}
//         max={100}
//         step={1}
//         tooltip="on"
//         key="bottom"
//         onChange={(e) => setAge(e.target.value)}
//       />
//     </Form.Group>
//   </Row>
//   {
//     //! GENDER
//   }
//   <Row className="justify-content-center">
//     <Form.Group controlId="exampleForm.ControlSelect1">
//       <Form.Label>Gender</Form.Label>
//       <Form.Control
//         as="select"
//         value={gender}
//         onChange={(e) => setGender(e.target.value)}
//       >
//         <option>non-binary</option>
//         <option>male</option>
//         <option>female</option>
//       </Form.Control>
//     </Form.Group>
//   </Row>

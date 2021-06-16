import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";

import { Gear, X, Check, ArrowCounterclockwise } from "react-bootstrap-icons";
import { api } from "../services/api";

import UserImageCarousel from "./UserImageCarousel";
import EditAttrList from "./EditAttrList";

const EditUser = ({ routerProps, location, auth }) => {
  //! loading state
  const [loading, setLoading] = useState(false);
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
      setName(result.data.name);
      setBio(result.data.bio);
      setAge(result.data.age);
      setGender(result.data.gender);
      setExerciseTime(result.data.exercise_time);
      setExerciseDiscipline(result.data.exercise_discipline);
      setDiet(result.data.diet);
      setMusicPreference(result.data.music_preference);
      setGenderPreference(result.data.gender_preference);
    });
  }, [routerProps]);


  const onReset = () => {
    setName(user.name);
    setBio(user.bio);
    setAge(user.age);
    setGender(user.gender);
    setExerciseTime(user.exercise_time);
    setExerciseDiscipline(user.exercise_discipline);
    setDiet(user.diet);
    setMusicPreference(user.music_preference);
    setGenderPreference(user.gender_preference);
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
    switch (title) {
      case "exercise_discipline":
        setExerciseDiscipline(changeObj);
        console.log(exercise_discipline)
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


  const handleSubmit = async () => {
    setLoading(true)
    user.name = name
    user.age = age
    user.gender = gender
    user.bio = bio
    try{
        await api.users.updateUser(user.id, user)
        await api.pref.editDietPref(diet, user.diet.id)
        await api.pref.editTimePref(exercise_time, user.exercise_time.id)
        await api.pref.editDisciplinePref(exercise_discipline, user.exercise_discipline.id)
        await api.pref.editGenderPref(gender_preference, user.gender_preference.id)
        await api.pref.editMusicPref(music_preference, user.music_preference.id)
        setLoading(false)
        routerProps.history.push(`/profile/${user.id}`)
    } catch (err){
        setLoading(false)
        alert("Update Unsuccessful")
        console.log(err)
    }
  };

  return (
    <Container fluid className="outer-profilecontainer">
      <Container fluid className="profilecontainer">
        <Row >
          <Col className="confirmedit">
            {user.id === auth.user.id ? (
                <h1>
                  <Check onClick={()=> handleSubmit()} className="editicon" />
                </h1>

            ) : null}
          </Col>
          <Col className="edit">
            {user.id === auth.user.id ? (
                <h1>
                  <X onClick={()=> onCancel()} id="cancel-edit" className="editicon" />
                  <ArrowCounterclockwise onClick={()=> onReset()} id="cancel-edit" className="editicon" />
                </h1>

            ) : null}
          </Col>
        </Row>
        <Row className="justify-content-center w-75 p-1 m-auto">
          <Col>
            <UserImageCarousel />
          </Col>
        </Row>
        <Row className="justify-content-center w-75 m-auto">
          
           
              {editingName ? (
                
                <>
                <Col>
                  <Gear
                    className="editicon small"
                    onClick={() => setEditingName(!editingName)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder={name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  </Col>
                </>
              ) : (
                <>
                  <Col>
                  <h1>  <Gear
                      className="editicon small"
                      onClick={() => setEditingName(!editingName)}
                    />
                    &nbsp;
                    {name}</h1>
                  </Col>
                </>
              )}
           

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
          {editingGender ? (
            <Col>
              <Gear
                onClick={() => setEditingGender(!editingGender)}
                className="editicon gender"
              />
              &nbsp;
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>non-binary</option>
                  <option>male</option>
                  <option>female</option>
                </Form.Control>
              </Form.Group>
            </Col>
          ) : (
            <Col>
              <h6>
                <Gear
                  onClick={() => setEditingGender(!editingGender)}
                  className="editicon gender"
                />
                &nbsp;
                {gender}
              </h6>
            </Col>
          )}
          <Col>
            <h6 className="distance">
              {dist ? dist : getDistance()} miles away
            </h6>
          </Col>
        </Row>
        <Row className="w-75 p-3 m-auto bio">
          {editingBio ? (
            <Col>
              <Gear
                className="editicon"
                onClick={() => setEditingBio(!editingBio)}
              />
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  className="biotextedit"
                  defaultValue={user.bio}
                  as="textarea"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Form.Group>
            </Col>
          ) : (
            <>
              <Gear
                className="editicon"
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
            {exercise_discipline && (
              <EditAttrList
                key={user?.exercise_discipline.id}
                attrObj={exercise_discipline}
                listName={"exercise_discipline"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>
          <Col>
            {exercise_time && (
              <EditAttrList
                key={user?.exercise_time.id}
                attrObj={exercise_time}
                listName={"exercise_time"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>
          <Col>
            {diet && (
              <EditAttrList
                key={user?.diet.id}
                attrObj={diet}
                listName={"diet"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>

          <Col>
            {music_preference && (
              <EditAttrList
                key={user?.music_preference.id}
                attrObj={music_preference}
                listName={"music_preference"}
                handleChange={(changeObj, title) =>
                  handleChange(changeObj, title)
                }
              />
            )}
          </Col>
          <Col>
            {gender_preference && (
              <EditAttrList
                key={user?.gender_preference.id}
                attrObj={gender_preference}
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
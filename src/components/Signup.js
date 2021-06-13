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

const Signup = ({ onSignup, routerProps, showAlert, renderAlert }) => {
  //user name, email, password
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("non-binary");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //exercise_time:
  const [exercise_time, setExerciseTime] = useState({
    early_morning: false,
    morning: false,
    afternoon: false,
    early_evening: false,
    late_evening: false,
    late_night: false,
  });
  const [exercise_discipline, setExerciseDiscipline] = useState({
    cardio: false,
    muscle_strengthening: false,
    aerobic: false,
  });
  const [diet, setDiet] = useState({
    keto: false,
    low_carb: false,
    vegan: false,
    vegetarian: false,
    pescatarian: false,
    alkaline: false,
    raw_food: false,
    intermittent_fasting: false,
    paleo: false,
    clean_eating: false,
    mediterranean: false,
  });
  const [gender_preference, setGenderPreference] = useState({
    male: false,
    female: false,
    non_binary: false,
    none: false,
  });
  const [location, setLocation] = useState({
    latitude: "46.8863847811234",
    longitude: "-122.568053329686",
  });
  const [music_preference, setMusicPreference] = useState({
    rock: false,
    techno: false,
    rap: false,
    country: false,
    pop: false,
    alternative: false,
    classical: false,
    funk: false,
    latin: false,
    jazz: false,
    none: false,
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLocation({ ...location });
    const TIME = await api.pref.newTimePref(exercise_time);
    const DISCIPLINE = await api.pref.newDisciplinePref(exercise_discipline);
    const DIET = await api.pref.newDietPref(diet);
    const GENDER = await api.pref.newGenderPref(gender_preference);
    const MUSIC = await api.pref.newMusicPref(music_preference);
    const newUser = {
      name,
      age,
      bio,
      gender,
      email,
      password,
      location_id: 1,
      password_confirmation: passwordConfirm,
      exercise_time_id: TIME.data.id -1,
      exercise_discipline_id: DISCIPLINE.data.id -1,
      diet_id: DIET.data.id -1,
      gender_preference_id: GENDER.data.id -1,
      music_preference_id: MUSIC.data.id -1,
    };
    api.auth.signup(newUser).then((res) => onSignup(res));
  };

  return (
    <>
      {/* {showAlert && renderAlert()} */}
      <div className="container pt-5">
        <h1 className="mb-3 text-center" style={{ letterSpacing: "0.5rem" }}>
          Sign Up
        </h1>
        <Form onSubmit={onFormSubmit}>
          {
            //! NAME
          }
          <Row className="justify-content-center">
            <div className="col-10 col-sm-8 col-md-5 my-3">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Row>
          {
            //! EMAIL
          }
          <Row className="justify-content-center">
            <div className="col-10 col-sm-8 col-md-5 my-3">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Row>
          {
            //! PASSWORD
          }
          <Row className="justify-content-center">
            <div className="col-10 col-sm-8 col-md-5 my-3">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Row>
          {
            //! PASSWORD CONFRIM
          }
          <Row className="justify-content-center">
            <div className="col-10 col-sm-8 col-md-5 my-3">
              <input
                className="form-control"
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </Row>
          {
            //! AGE
          }
          <Row className="justify-content-center">
            <Form.Group controlId="formBasicRangeCustom">
              <Form.Label>Age (1 - 100)</Form.Label>
              <Form.Control
                type="range"
                custom
                value={age}
                min={1}
                max={100}
                step={1}
                tooltip="on"
                key="bottom"
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
          </Row>
          {
            //! GENDER
          }
          <Row className="justify-content-center">
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Gender</Form.Label>
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
          </Row>
          {
            //! BIO
          }
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>
          <>
            <Row className="justify-content-center">
              <h2 className="mb-3 mt-3" style={{ letterSpacing: "0.1rem" }}>
                What do you look for in a Swolemate?
              </h2>
            </Row>
            <Row className="justify-content-center">
              {
                //! AVAILABILITY SWITCHES
              }
              <Col xs="auto">
                <h3 className="mb-2" style={{ letterSpacing: "0.1rem" }}>
                  Availability
                </h3>
                {Object.keys(exercise_time).map((time) => {
                  return (
                    <Form.Check
                      key={`time ${time}`}
                      type="switch"
                      id={`default-switch ${time}`}
                      label={time.split("_").join(" ")}
                      value={exercise_time[time]}
                      onChange={() => {
                        const newTime = { ...exercise_time };
                        newTime[time] = !newTime[time];
                        setExerciseTime(newTime);
                      }}
                    />
                  );
                })}
              </Col>
              {
                //! DISCIPLINE SWITCHES
              }
              <Col xs="auto">
                <h3 className="mb-2" style={{ letterSpacing: "0.1rem" }}>
                  Discipline
                </h3>
                {Object.keys(exercise_discipline).map((type) => {
                  return (
                    <Form.Check
                      key={`discipline ${type}`}
                      type="switch"
                      id={`default-switch ${type}`}
                      label={type.split("_").join(" ")}
                      value={exercise_discipline[type]}
                      onChange={() => {
                        const discipline = { ...exercise_discipline };
                        discipline[type] = !discipline[type];
                        setExerciseDiscipline(discipline);
                      }}
                    />
                  );
                })}
              </Col>
              {
                //! DIET SWITCHES
              }
              <Col xs="auto">
                <h3 className="mb-2" style={{ letterSpacing: "0.1rem" }}>
                  Diet
                </h3>
                {Object.keys(diet).map((type) => {
                  return (
                    <Form.Check
                      key={`diet ${type}`}
                      type="switch"
                      id={`default-switch ${type}`}
                      label={type.split("_").join(" ")}
                      value={diet[type]}
                      onChange={() => {
                        const newDiet = { ...diet };
                        newDiet[type] = !newDiet[type];
                        setDiet(newDiet);
                      }}
                    />
                  );
                })}
              </Col>
              {
                //! GENDER SWITCHES
              }
              <Col xs="auto">
                <h3 className="mb-2" style={{ letterSpacing: "0.1rem" }}>
                  Gender Id.
                </h3>
                {Object.keys(gender_preference).map((gen) => {
                  return (
                    <Form.Check
                      key={`gender ${gen}`}
                      type="switch"
                      id={`default-switch gender ${gen}`}
                      label={gen.split("_").join(" ")}
                      value={gender_preference[gen]}
                      onChange={() => {
                        const newGen = { ...gender_preference };
                        newGen[gen] = !newGen[gen];
                        setGenderPreference(newGen);
                      }}
                    />
                  );
                })}
              </Col>
              {
                //! MUSIC SWITCHES
              }
              <Col xs="auto">
                <h3 className="mb-2" style={{ letterSpacing: "0.1rem" }}>
                  Music
                </h3>
                {Object.keys(music_preference).map((music) => {
                  return (
                    <Form.Check
                      key={`music ${music}`}
                      type="switch"
                      id={`default-switch music ${music}`}
                      label={music.split("_").join(" ")}
                      value={music_preference[music]}
                      onChange={() => {
                        const newMusic = { ...music_preference };
                        newMusic[music] = !newMusic[music];
                        setMusicPreference(newMusic);
                      }}
                    />
                  );
                })}
              </Col>
            </Row>
          </>

          <Row className="justify-content-center">
            {
              //! SUBMIT
            }
            <Button
              variant="success"
              size="lg"
              block
              style={{ borderRadius: "8px" }}
              className="col-5 col-lg-3 mt-4"
              type="submit"
            >
              Create <span className="d-none d-md-inline-flex">New</span>{" "}
              Account
            </Button>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Signup;

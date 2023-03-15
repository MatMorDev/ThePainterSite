import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useState } from "react";
import "./LogInRegisterForm.css";
import ReactiveButton from "reactive-button";
import {
  AiOutlineCheck,
  AiOutlineEyeInvisible,
  AiFillEye,
} from "react-icons/ai";
import { loginSubscriber } from "../../api";
import { useNavigate } from "react-router-dom";

const LogInForm = ({ handleToggle, handleLoggedUser }) => {
  const defaultInputState = {
    username: "",
    password: "",
  };
  const [inputState, setInputState] = useState(defaultInputState);
  const [inputErrors, setInputErrors] = useState({});
  const [state, setState] = useState("idle");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const onClickHandler = () => {
    setState("loading");
    setTimeout(() => {
      setState("Let's go!");
      handleToggle();
    }, 1000);
  };

  let eyePassword = <></>;
  passwordShown
    ? (eyePassword = <AiFillEye />)
    : (eyePassword = <AiOutlineEyeInvisible />);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };

  const validate = (inputObject) => {
    const errorObj = {};
    if (inputObject.username === "") {
      errorObj.username = "Username is mandatory";
    }
    if (inputObject.password === "") {
      errorObj.password = "Password is mandatory";
    }
    return errorObj;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorObject = validate(inputState);

    if (Object.keys(errorObject).length === 0) {
      const result = await loginSubscriber({
        username: inputState.username,
        password: inputState.password,
      });
      if (result.ok) {
        setInputErrors({});
        setInputState(defaultInputState);
        // porto il token dell'utente loggato in App
        handleLoggedUser(result.data);
        navigate("/");
      } else {
        console.log(result.data);
        window.alert(
          result.data.error +
            ": " +
            result.data.message +
            " Error code: " +
            result.data.status
        );
      }
    } else {
      setInputErrors(errorObject);
    }
  };

  return (
    <>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className=""
      >
        <Form onSubmit={handleSubmit}>
          <div className="p-3 border mt-4 ">
            <span>Access to The Painter</span>
            <span>
              Don't have a The Painter account yet? Don't worry,
              <Button
                className="toggle"
                variant="text"
                onClick={onClickHandler}
              >
                you can create one now!
              </Button>
            </span>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={inputState.username}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
                placeholder={"username"}
                isInvalid={inputErrors.username ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={passwordShown ? "text" : "password"}
                  value={inputState.password}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                  placeholder={"password"}
                  isInvalid={inputErrors.password ? true : false}
                />
                <InputGroup.Text
                  id="inputGroupPrepend"
                  onClick={togglePassword}
                >
                  {eyePassword}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {inputErrors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col>
              <Button className="toggle" variant="text">
                Password forgotten? click Here
              </Button>
            </Col>
            <Col>
              <Button
                id="btnContinue"
                variant="success"
                type="submit"
                className="my-3"
              >
                Access
              </Button>
            </Col>
          </Row>
        </Form>
        <Card className="mt-1 mb-4">
          <Card.Header as="h5" className="text-center">
            You don't have an account?
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-center mb-4">
              <ReactiveButton
                color="yellow"
                buttonState={state}
                idleText="Create an account"
                loadingText="Loading"
                successText="Done"
                onClick={onClickHandler}
                style={{ fontSize: "1em", fontWeight: "bold" }}
              />
            </Card.Title>
            <Card.Text className="d-flex  flex-column">
              <span className="mb-2">
                <AiOutlineCheck className="check" /> The Painter account is
                free! Log in and subscribe to The Painter
              </span>
              <span className="mb-2">
                <AiOutlineCheck className="check" /> So many articles and
                tutorials!
              </span>
              <span className="mb-2">
                <AiOutlineCheck className="check" /> Many more great features
                are on the way! subscribe and stay updated!
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LogInForm;

import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { postMessage } from "../../api";

const CommentForm = ({ idArticle, loggedUser, handleLoadData }) => {
  const defaultMessage = { content: "" };
  const [message, setMessage] = useState(defaultMessage);
  const [inputErrors, setInputErrors] = useState({});

  const handleInputChange = (value) => {
    const newMessage = { content: value };
    setMessage(newMessage);
  };

  const validate = (inputObject, idSub) => {
    const errorObj = {};
    if (inputObject.content === "" && idSub !== 0) {
      errorObj.content = "Message is mandatory";
    }
    if (idSub === 0) {
      errorObj.idSub = "You must be logged in order to comment";
    }
    return errorObj;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorObject = validate(message, loggedUser.idSub);
    if (Object.keys(errorObject).length === 0) {
      const response = await postMessage(message, loggedUser.idSub, idArticle);
      if (response.ok) {
        // mostro messaggio di successo
        setInputErrors({});
        setMessage(defaultMessage);
        handleLoadData();
      } else {
        console.log(response.data);
      }
    } else {
      setInputErrors(errorObject);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="m-2">
      <div className="p-3 border mt-4">
        <Form.Group controlId="content">
          <Form.Label>Message</Form.Label>
          <Form.Control
            placeholder="Write your text here"
            type="text"
            as="textarea"
            rows={3}
            value={message.content}
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
            isInvalid={
              inputErrors.idSub
                ? true
                : false || inputErrors.content
                ? true
                : false
            }
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.idSub}
            {inputErrors.content}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Button id="submit" variant="success" type="submit" className="my-3">
        Send
      </Button>
      <Button
        id="reset"
        variant="warning"
        type="reset"
        className="my-3 mx-3"
        onClick={() => {
          setMessage(defaultMessage);
        }}
      >
        Reset
      </Button>
    </Form>
  );
};
export default CommentForm;

import { Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
const SubscriberItem = ({
  item,
  handleDeleteSubscriber,
  handleDeleteComment,
  handlePutSubscriber,
  handlePutComment,
}) => {
  const [show, setShow] = useState(false);
  const [modify, setModify] = useState(false);
  const defaultSubscriber = {
    id: item.id,
    username: item.username,
    password: item.password,
    firstName: item.firstName,
    lastName: item.lastName,
    dateOfBirth: item.dateOfBirth,
    email: item.email,
    address: item.address,
    city: item.city,
    cap: item.cap,
    phoneNumber: item.phoneNumber,
    comments: item.comments,
  };
  const [inputState, setInputState] = useState(defaultSubscriber);
  const [showModify, setShowModify] = useState({ state: false, id: 0 });
  const [inputComment, setInputComment] = useState({ content: "" });

  // toggle per button
  const toggleComment = () => {
    setModify(false);
    setShow(!show);
  };
  const toggleModify = () => {
    setShow(false);
    setModify(!modify);
  };
  const toggleCommentModify = (commentId) => {
    // se non è mai stato cliccato
    if (showModify.state === false && showModify.id === 0) {
      setShowModify({ state: true, id: commentId });
    }
    // se in memoria c'è ed è stato cliccato allora chiudi
    if (showModify.state === true && showModify.id === commentId) {
      setShowModify({ state: false, id: 0 });
    }
    // se in memoria c'è ed è stato cliccato un altro allora cambi
    if (showModify.state === true && showModify.id !== commentId) {
      setShowModify({ state: true, id: commentId });
    }
  };
  // handle per metodi
  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };
  const handleSubmit = () => {
    toggleModify();
    handlePutSubscriber(item.id, inputState);
  };
  const handleInputCommentChange = (input, value) => {
    const newInputComment = { ...inputComment, [input]: value };
    setInputComment(newInputComment);
  };
  const handleSubmitComment = (event) => {
    event.preventDefault();
    handlePutComment(item.id, showModify.id, inputComment);
    toggleCommentModify(showModify.id);
  };
  // form subscriber
  let contentModify = <></>;
  if (modify) {
    contentModify = (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="username">
              <Form.Control
                type="text"
                placeholder={item.username}
                value={inputState.username}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="danger" className="mb-1" type="submit">
              Modify
            </Button>
          </Col>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Control
                type="text"
                placeholder={item.firstName}
                value={inputState.firstName}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Control
                type="text"
                placeholder={item.lastName}
                value={inputState.lastName}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dateOfBirth">
              <Form.Control
                type="date"
                placeholder={item.dateOfBirth}
                value={inputState.dateOfBirth}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder={item.email}
                value={inputState.email}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Control
                type="text"
                placeholder={item.address}
                value={inputState.address}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="city">
              <Form.Control
                type="text"
                placeholder={item.city}
                value={inputState.city}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="cap">
              <Form.Control
                type="number"
                placeholder={item.cap}
                value={inputState.cap}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phoneNumber">
              <Form.Control
                type="text"
                placeholder={item.phoneNumber}
                value={inputState.phoneNumber}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    );
  } else {
    contentModify = <></>;
  }
  // form comment e button
  let contentForm = <></>;
  const comments = item.comments.map((comment) => {
    if (showModify.id === comment.id) {
      contentForm = (
        <>
          <Form className="mb-3" onSubmit={handleSubmitComment}>
            <Form.Group className="my-1" controlId="content">
              <Form.Control
                type="text"
                placeholder={comment.content}
                value={inputComment.content}
                onChange={(e) => {
                  handleInputCommentChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit comment
            </Button>
          </Form>
        </>
      );
    } else {
      contentForm = <></>;
    }

    return (
      <div key={comment.id}>
        <div>
          <Button
            variant="warning"
            size="sm"
            className="mb-1 me-1"
            type="button"
            onClick={() => {
              toggleCommentModify(comment.id);
            }}
          >
            <BsPencilFill />
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="mb-1 me-1"
            type="button"
            onClick={() => {
              handleDeleteComment(item.id, comment.id);
            }}
          >
            <BsFillTrashFill />
          </Button>
          ({comment.id}){comment.content}
        </div>
        {contentForm}
      </div>
    );
  });

  // buttons subscriber
  let contentComment = (
    <Row className="mb-1">
      <Col>
        <Button variant="primary" type="button" onClick={() => toggleComment()}>
          Comments
        </Button>
      </Col>
      <Col>
        <Button variant="warning" type="button" onClick={() => toggleModify()}>
          Modify Subscriber
        </Button>
      </Col>
      <Col>
        <Button
          variant="danger"
          type="button"
          onClick={() => handleDeleteSubscriber(item.id)}
        >
          Delete Subscriber
        </Button>
      </Col>
    </Row>
  );
  if (show) {
    contentComment = (
      <>
        <Row className="mb-1">
          <Col>
            <Button
              variant="primary"
              type="button"
              onClick={() => toggleComment()}
            >
              Comments
            </Button>
          </Col>
          <Col>
            <Button
              variant="warning"
              type="button"
              onClick={() => toggleModify()}
            >
              Modify Subscriber
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              type="button"
              onClick={() => handleDeleteSubscriber(item.id)}
            >
              Delete Subscriber
            </Button>
          </Col>
          <Row className="text-start">{comments}</Row>
        </Row>
      </>
    );
  }
  // return
  return (
    <div key={item.id} className="my-1">
      <Row>
        <Col>
          ({item.id}) {item.username}
        </Col>
        <Col>
          {item.firstName} - {item.lastName}
        </Col>
        <Col>{item.dateOfBirth}</Col>
        <Col>{item.email}</Col>
        <Col>{item.address}</Col>
        <Col>
          {item.city} - {item.cap}
        </Col>
        <Col>{item.phoneNumber}</Col>
      </Row>
      {contentComment}
      {contentModify}
    </div>
  );
};
export default SubscriberItem;

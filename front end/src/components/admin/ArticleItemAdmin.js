import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

const ArticleItemAdmin = ({
  article,
  handleDeleteArticle,
  handlePutArticle,
  show,
  setShow,
  showComments,
  setShowComments,
  showModify,
  setShowModify,
  defaultArticle,
  handleDeleteCommentId,
}) => {
  const [inputState, setInputState] = useState(defaultArticle);

  //toggles di selezione
  const toggleShow = (idArticle) => {
    const id = parseInt(idArticle);
    //show descrizione
    if (show.state === false && show.id === 0) {
      setShow({ state: true, id: id });
      //chiudi eventuali commenti
      setShowComments({ state: false, id: 0 });
      //chiudi eventuali schede di modifica
      setShowModify({ state: false, id: 0 });
    }
    //show off descrizione
    if (show.state === true && show.id === id) {
      setShow({ state: false, id: 0 });
    }
    //show un'altra descrizione
    if (show.state === true && show.id !== id) {
      setShow({ state: true, id: id });
      //chiudi eventuali commenti
      setShowComments({ state: false, id: 0 });
      //chiudi eventuali schede di modifica
      setShowModify({ state: false, id: 0 });
    }
  };
  const toggleComments = (idArticle) => {
    const id = parseInt(idArticle);
    if (showComments.state === false && showComments.id === 0) {
      //show comment
      setShowComments({ state: true, id: id });
      //chiudi eventuali descrizioni
      setShow({ state: false, id: 0 });
      //chiudi eventuali schede di modifica
      setShowModify({ state: false, id: 0 });
    }
    //show off commenti
    if (showComments.state === true && showComments.id === id) {
      setShowComments({ state: false, id: 0 });
    }
    if (showComments.state === true && showComments.id !== id) {
      //mostra commenti di un altro articolo
      setShowComments({ state: true, id: id });
      //chiudi eventuali descrizioni
      setShow({ state: false, id: 0 });
      //chiudi eventuali schede di modifica
      setShowModify({ state: false, id: 0 });
    }
  };
  const toggleModifyArticle = (idArticle) => {
    const id = parseInt(idArticle);
    if (showModify.state === false && showModify.id === 0) {
      //show modify
      setShowModify({ state: true, id: id });
      //chiudi eventuali descrizioni
      setShow({ state: false, id: 0 });
      //chiudi eventuali commenti
      setShowComments({ state: false, id: 0 });
    }
    //show off modify
    if (showModify.state === true && showModify.id === id) {
      setShowModify({ state: false, id: 0 });
    }
    if (showModify.state === true && showModify.id !== id) {
      //mostra modify di un altro articolo
      setShowModify({ state: true, id: id });
      //chiudi eventuali descrizioni
      setShow({ state: false, id: 0 });
      //chiudi eventuali commenti
      setShowComments({ state: false, id: 0 });
    }
  };

  //handles
  const handleInputChange = (input, value) => {
    if (inputState.id === 0) {
      setInputState({
        id: article.id,
        title: article.title,
        description: article.description,
        category: article.category,
        date: article.date,
        comments: article.comments,
      });
    }
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };
  const handleSubmitModify = (event) => {
    event.preventDefault();
    handlePutArticle(article.id, inputState);
  };

  const articleBody = (
    <>
      <div>
        <h3>
          Id: {article.id} - Title: {article.title}
        </h3>
        <h6>Date: {article.date}</h6>
      </div>
      <Button value={article.id} onClick={(e) => toggleShow(e.target.value)}>
        Show
      </Button>
      <Button
        className="ms-2"
        value={article.id}
        onClick={(e) => toggleComments(e.target.value)}
      >
        Comments
      </Button>
      <Button
        className="ms-2"
        variant="warning"
        value={article.id}
        onClick={(e) => toggleModifyArticle(e.target.value)}
      >
        Modify
      </Button>
      <Button
        className="ms-2"
        variant="danger"
        value={article.id}
        onClick={(e) => handleDeleteArticle(e.target.value)}
      >
        Delete
      </Button>
    </>
  );

  //form per la modifica
  const modifyForm = (
    <>
      <Form
        style={{ border: "solid 2px grey" }}
        className="p-3 mb-3"
        onSubmit={handleSubmitModify}
      >
        <Row>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title service</Form.Label>
              <Form.Control
                type="text"
                placeholder={article.title}
                value={inputState.title}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Article category</Form.Label>
              <Form.Control
                type="text"
                placeholder={article.category}
                value={inputState.category}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Article description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder={article.description}
                value={inputState.description}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Button variant="primary" className="my-5" type="submit">
              Modify article
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );

  // genero lista commenti per mostrarla
  const articleComments = article.comments.map((comment) => {
    return (
      <div key={comment.id}>
        <div>
          Id: {comment.id}
          <Button
            className="ms-1"
            variant="danger"
            style={{ padding: "3px", paddingTop: "1px" }}
            onClick={() => {
              handleDeleteCommentId(comment.id, article.id);
            }}
          >
            <BsFillTrashFill />
          </Button>
        </div>
        <div>Message: {comment.content} </div>
      </div>
    );
  });

  // come si presenta di base
  let descriptionArticle = (
    <>
      <div key={article.id} id={article.id} className="mb-3">
        <div>{articleBody}</div>
      </div>
    </>
  );

  // per mostrare la descrizione
  if (show.state === true && show.id === article.id) {
    descriptionArticle = (
      <>
        <div key={article.id} id={article.id} className="mb-3">
          {articleBody}
          <div>
            <div>Description: </div>
            <div>{article.description}</div>
          </div>
        </div>
      </>
    );
  }

  //per vedere i commenti
  if (showComments.state === true && showComments.id === article.id) {
    descriptionArticle = (
      <>
        <div key={article.id} id={article.id} className="mb-3">
          {articleBody}
          <div>
            <div>Comments:</div>
            <div>{articleComments}</div>
          </div>
        </div>
      </>
    );
  }
  // se si vuole modificare
  if (showModify.state === true && showModify.id === article.id) {
    descriptionArticle = (
      <>
        <div key={article.id} id={article.id} className="mb-3">
          {articleBody}
          <div>
            <div>Description: </div>
            <div>{modifyForm}</div>
          </div>
        </div>
      </>
    );
  }
  return <>{descriptionArticle}</>;
};

export default ArticleItemAdmin;

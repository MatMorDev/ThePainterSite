import { Form, Row, Col, Button } from "react-bootstrap";
import ArticleItemAdmin from "./ArticleItemAdmin";
import { useState } from "react";

const ArticlesContent = ({
  articleList,
  handlePostArticle,
  handleDeleteArticle,
  handlePutArticle,
  handleDeleteCommentId,
}) => {
  const defaultArticle = {
    id: 0,
    title: "",
    description: "",
    category: "",
    date: "",
    comments: [],
  };
  const [inputState, setInputState] = useState(defaultArticle);
  const [show, setShow] = useState({ state: false, id: 0 });
  const [showComments, setShowComments] = useState({ state: false, id: 0 });
  const [showModify, setShowModify] = useState({ state: false, id: 0 });

  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePostArticle(inputState);
  };

  const articleContent = articleList.map((element) => {
    return (
      <div key={element.id}>
        <Row>
          <ArticleItemAdmin
            article={element}
            handleDeleteArticle={handleDeleteArticle}
            defaultArticle={defaultArticle}
            handlePutArticle={handlePutArticle}
            show={show}
            setShow={setShow}
            showComments={showComments}
            setShowComments={setShowComments}
            showModify={showModify}
            setShowModify={setShowModify}
            handleDeleteCommentId={handleDeleteCommentId}
          />
        </Row>
      </div>
    );
  });
  return (
    <div className="d-flex  flex-column my-3">
      <h1 className="mb-1 text-center">Your Articles</h1>
      <Form
        style={{ border: "solid 2px grey" }}
        className="p-3 mb-3"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title service</Form.Label>
              <Form.Control
                type="text"
                placeholder="New article title.."
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
                placeholder="New category.."
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
                rows={3}
                placeholder="New article description.."
                value={inputState.description}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Button variant="primary" className="my-5" type="submit">
              Submit new article
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="row mb-3">{articleContent}</div>
    </div>
  );
};
export default ArticlesContent;

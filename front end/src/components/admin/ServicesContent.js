import { Form, Row, Col, Button } from "react-bootstrap";
import ServiceItemAdmin from "./ServiceItemAdmin";
import { useState } from "react";

const ServicesContent = ({
  serviceList,
  handlePostService,
  handleDeleteService,
  handlePutService,
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
  imgFive,
}) => {
  const defaultService = {
    img: "",
    title: "",
    description: "",
    price: 0,
    rate: 1,
  };
  const [inputState, setInputState] = useState(defaultService);
  const [modify, setModify] = useState({ state: false, id: 0 });
  let arrayImg = [];
  arrayImg.push(imgOne);
  arrayImg.push(imgTwo);
  arrayImg.push(imgThree);
  arrayImg.push(imgFour);
  arrayImg.push(imgFive);

  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePostService(inputState);
    console.log(inputState);
  };

  const serviceContent = serviceList.map((element) => {
    return (
      <div key={element.id} className="col-12 col-sm-6 col-lg-4">
        <ServiceItemAdmin
          service={element}
          arrayImg={arrayImg[element.id - 1]}
          handleDeleteService={handleDeleteService}
          defaultService={defaultService}
          handlePutService={handlePutService}
          modify={modify}
          setModify={setModify}
        />
      </div>
    );
  });
  return (
    <div className="d-flex  flex-column my-3">
      <h1 className="mb-1 text-center">Your Services</h1>
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
                placeholder="New service title.."
                value={inputState.title}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price service</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                min={0}
                value={inputState.price}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3" controlId="rate">
              <Form.Label>Rate service</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                min={1}
                max={5}
                value={inputState.rate}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Service description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="New service description.."
                value={inputState.description}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Button variant="primary" className="my-5" type="submit">
              Submit new service
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="row gy-3">{serviceContent}</div>
    </div>
  );
};
export default ServicesContent;

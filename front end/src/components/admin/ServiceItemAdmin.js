import Brush from "../services/Brush";
import { useState } from "react";
import { Form } from "react-bootstrap";
const Service = ({
  service,
  arrayImg,
  handleDeleteService,
  defaultService,
  handlePutService,
  modify,
  setModify,
}) => {
  const [inputState, setInputState] = useState(defaultService);

  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };

  const handlePut = (event) => {
    event.preventDefault();
    toggleModify(service.id);
    handlePutService(service.id, inputState);
  };

  const toggleModify = (idService) => {
    if (modify.state === false && modify.id === 0) {
      setModify({ state: true, id: idService });
    }
    if (modify.state === true && modify.id === idService) {
      setModify({ state: false, id: 0 });
    }
    if (modify.state === true && modify.id !== idService) {
      setModify({ state: true, id: idService });
    }
  };

  let item = (
    <div className="card h-100">
      <div className="card-header text-center" style={{ height: "200px" }}>
        <img
          src={arrayImg}
          alt="product"
          className="img-fluid"
          style={{ height: "100%" }}
        />
      </div>
      <div className="card-body d-flex  flex-wrap p-3 flex-column text-center">
        <h4>{service.title}</h4>
        <div className="mb-2">
          {service.description}
          <div className="d-flex align-items-center justify-content-center">
            Price: <span className="display-6 mx-1">{service.price}</span>
            <span style={{ fontSize: "x-large" }}>&#8364;</span>
          </div>
        </div>
        <Brush value={service.rate} max={5} idService={service.id} />
      </div>
      <div className="card-footer d-flex justify-content-center flex-wrap">
        <button
          className="btn btn-warning me-2 mb-1"
          onClick={() => toggleModify(service.id)}
        >
          Modify service
        </button>
        <button
          className="btn btn-danger me-2 mb-1"
          onClick={() => handleDeleteService(service.id)}
        >
          Delete service
        </button>
      </div>
    </div>
  );
  if (modify.state === true && modify.id === service.id) {
    item = (
      <div className="card h-100">
        <Form onSubmit={handlePut}>
          <div className="card-header text-center" style={{ height: "200px" }}>
            <div>Modify image</div>
          </div>
          <div className="card-body d-flex justify-content-center flex-wrap p-3 flex-column text-center">
            <Form.Group controlId="title">
              <Form.Label>Title service</Form.Label>
              <Form.Control
                type="text"
                placeholder={service.title}
                value={inputState.title}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <div className="mb-2">
              <Form.Group controlId="description">
                <Form.Label>Service description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={service.description}
                  value={inputState.description}
                  onChange={(e) => {
                    handleInputChange(e.target.id, e.target.value);
                  }}
                />
              </Form.Group>
              <div className="d-flex align-items-center justify-content-center">
                <Form.Group controlId="price">
                  <Form.Label>Price service</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    placeholder={service.price}
                    value={inputState.price}
                    onChange={(e) => {
                      handleInputChange(e.target.id, e.target.value);
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            <Form.Group controlId="rate">
              <Form.Label>Rate service</Form.Label>
              <Form.Control
                type="number"
                placeholder={service.rate}
                min={1}
                max={5}
                value={inputState.rate}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </div>
          <div className="card-footer d-flex justify-content-center flex-wrap">
            <button
              className="btn btn-warning me-2 mb-1"
              onClick={() => toggleModify(service.id)}
              type="button"
            >
              Return
            </button>
            <button className="btn btn-success me-2 mb-1" type="submit">
              Submit changes
            </button>
          </div>
        </Form>
      </div>
    );
  }

  return <>{item}</>;
};
export default Service;

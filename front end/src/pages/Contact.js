import imgContact from "../images/Fdcx0EuXEAEVxuF.jpg";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "../components/contact/Contact.css";

const Contact = () => {
  return (
    <>
      <div className="position-relative overflow-scroll text-center">
        <img
          src={imgContact}
          className="img-fluid img-chaos"
          alt="chaos-miniature"
          style={{ height: "100%", width: "100%" }}
        />
        <div
          className="position-absolute back-shadow"
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.60)",
            color: " #fff8cd",
            top: "0",
            left: "0",
          }}
        >
          <h1 className="mt-5 customFont">CONTACT</h1>
          <p
            className="mt-2 mb-0 customFont"
            style={{
              fontSize: "larger",
            }}
          >
            Get a Quote, or More Information
          </p>
          <Container className="mt-5">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="my-1" controlId="formFirstName">
                    <Form.Label className="customFont">First name</Form.Label>
                    <Form.Control type="text" placeholder="First name" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="my-1" controlId="formLastName">
                    <Form.Label className="customFont">Last name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="my-1" controlId="formEmail">
                <Form.Label className="customFont">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="my-1" controlId="formSubject">
                <Form.Label className="customFont">Subject</Form.Label>
                <Form.Control type="text" placeholder="Subject" />
              </Form.Group>
              <Form.Group className="my-1" controlId="formMessage">
                <Form.Label className="customFont">Message</Form.Label>
                <Form.Control rows={3} as="textarea" placeholder="Message" />
              </Form.Group>
              <Button className="mt-4" variant="primary">
                Submit message
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Contact;

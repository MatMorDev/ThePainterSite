import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Footer.css";
const Footer = () => {
  return (
    <div id="footer">
      <div className="px-5 pt-2 pb-3 footerContainer ">
        <Row className="d-flex flex-wrap rowFooter">
          <Col sm={2} className="mt-2">
            <h5>THE PAINTER</h5>
            <div>
              <Link to={`/about`}>About us</Link>
            </div>
            <div>
              <Link to={`/contact`}>Contact</Link>
            </div>
            <div>
              <Link to={`/services`}>Store</Link>
            </div>{" "}
            <div>
              <Link to={`/`}>Shipping</Link>
            </div>
            <div>Trade Terms & Return Policy</div>
          </Col>
          <Col sm={2} className="mt-2">
            <h5> TUTORIALS</h5>
            <div>
              <Link to={`/blog`}>Basic Painting</Link>
            </div>
            <div>Advanced Techniques</div>
            <div>Speedpaint</div>
            <div>Video Tutorials</div>
            <div>PDF Tutorials</div>
          </Col>
          <Col sm={2} className="mt-2">
            <h5> SHOP</h5>
            <div>
              <Link to={`/services`}>Painting service</Link>
            </div>
            <div>Teaching one to one</div>
            <div>Painting course</div>
            <div>Private Discord channel</div>
          </Col>
          <Col sm className="mt-2">
            <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
            <div className="noHover">
              Never miss out on exciting news, upcoming products and exclusive
              promotions.
            </div>
            <Form className="mt-2 noHover">
              <Form.Group className="mb-1 noHover" controlId="formName">
                <Form.Label className="noHover">Name</Form.Label>
                <Form.Control
                  className="noHover"
                  type="password"
                  placeholder="Your name"
                />
              </Form.Group>
              <Form.Group className="mb-3 noHover" controlId="formEmail">
                <Form.Label className="noHover">Email address</Form.Label>
                <Form.Control
                  className="noHover"
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Button className="noHover" variant="primary">
                Yes, please sign me up!*
              </Button>
            </Form>
            <div className="noHover" style={{ fontSize: "small" }}>
              *We promise to treat you nice and never share your information
              with others. Se our Privacy Policy. You can unsubscribe from our
              newsletter at any time.
            </div>
            <div className="d-flex wrap justify-content-evenly mt-3 noHover">
              <div>
                <FaFacebookF className="iconFooter" />
              </div>
              <div>
                <FaInstagram className="iconFooter" />
              </div>
              <div>
                <FaYoutube className="iconFooter" />
              </div>
              <div>
                <FaTwitter className="iconFooter" />
              </div>
              <div>
                <FaLinkedin className="iconFooter" />
              </div>
              <div>
                <FaDiscord className="iconFooter" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="text-center py-3  footerFinalRow ">
        <Col>
          Matteo Mor 2023 - The Painter - Italy | contact@thepainter.com
        </Col>
      </Row>
    </div>
  );
};

export default Footer;

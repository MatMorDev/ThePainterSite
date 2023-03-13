import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.css";
const Footer = () => {
  return (
    <div id="footer">
      <div className="mt-5 px-5 pt-2 pb-3 footerContainer ">
        <Row className="d-flex flex-wrap rowFooter">
          <Col sm={2}>
            <h5>THE PAINTER</h5>
            <div>About us</div>
            <div>Contact</div>
            <div>Contact</div>
            <div>Store</div> <div>Shipping</div>
            <div>Trade Terms & Return Policy</div>
          </Col>
          <Col sm={2}>
            <h5>TUTORIALS</h5>
            <div>Basic Painting</div>
            <div>Advanced Techniques</div>
            <div>Speedpaint</div>
            <div>Video Tutorials</div>
            <div>PDF Tutorials</div>
          </Col>
          <Col sm={2}>
            <h5>SHOP</h5>
            <div>Painting service</div>
            <div>Teaching one to one</div>
            <div>Painting course</div>
            <div>Private Discord channel</div>
          </Col>
          <Col sm>
            <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
            <div>
              Never miss out on exciting news, upcoming products and exclusive
              promotions.
            </div>
            <div>first name form</div>
            <div>email form</div>
            <div>Yes, please sign me up!* button</div>
            <div>
              *We promise to treat you nice and never share your information
              with others. Se our Privacy Policy. You can unsubscribe from our
              newsletter at any time.
            </div>
            <div>
              social icon large: facebook, instagram, youtube, twitter linkedin,
              discord
            </div>
          </Col>
        </Row>
      </div>
      <Row className="text-center py-3  footerFinalRow ">
        <Col>
          &#169;Matteo Moretto 2023 - The Painter - Italy |
          contact@thepainter.com
        </Col>
      </Row>
    </div>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import CookieModal from "../components/navbar-app-footer/Cookie";

const Home = ({ handleCookie, cookie }) => {
  let cookieModal = <CookieModal handleCookie={handleCookie} />;
  if (cookie) {
    cookieModal = <></>;
  }

  return (
    <>
      <div className="mt-2 container">
        {cookieModal}
        <h1>Questa è la tua Home</h1>
        <Row>
          <Col>
            <Link to={`/about`}>About Us</Link>
          </Col>
          <Col>
            <Link to={`/services`}>Services</Link>
          </Col>
          <Col>
            <Link to={`/contact`}>Contact</Link>
          </Col>
          <Col>
            <Link to={`/blog`}>Blog</Link>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Home;

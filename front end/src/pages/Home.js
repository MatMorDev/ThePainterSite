import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import CookieModal from "../components/navbar-app-footer/Cookie";
import { FaPaintBrush, FaDiscord } from "react-icons/fa";
import { BsPaletteFill } from "react-icons/bs";
import "../components/home/Home.css";
import AlertLogin from "../components/login/AlertLogin";
import imgCorvusCabalWarband from "../images/corvus-cabal-resized.jpg";
import imgCommback from "../images/commissar-back.png";
import Image from "react-bootstrap/Image";
import logo from "../utilities/logo-navbar.png";

const Home = ({ handleCookie, cookie, lastUser, setLastUser, loggedUser }) => {
  const navigate = useNavigate();
  let cookieModal = <CookieModal handleCookie={handleCookie} />;
  if (cookie) {
    cookieModal = <></>;
  }

  return (
    <div className="mb-5">
      <div className="position-relative">
        <img
          src={imgCorvusCabalWarband}
          className="img-fluid"
          alt="corvus-cabal-warband"
          style={{ width: "100%" }}
        />
        <div className="homeDiv">
          <h1 className="title">
            Welcome to <p>The Painter</p>
          </h1>
        </div>
      </div>
      <div className="text-center mt-5 subTitle">
        <span
          className="display-3"
          style={{ fontWeight: "bold" }}
          onClick={() => navigate("/services")}
        >
          Look what we can do for you!
        </span>
      </div>

      <div className="text-center d-flex justify-content-center">
        <Row className="mt-5 container d-flex flex-wrap">
          <Col sm={12} md={4} lg={6}>
            <Card
              className="mb-5 cardShadow firstCard"
              onClick={() => navigate("/services")}
            >
              <Card.Body>
                <Card.Title>
                  You put the idea, we put the Colors!{" "}
                  <BsPaletteFill style={{ color: "rgb(182, 20, 20)" }} />
                </Card.Title>
                <Card.Text>
                  We paint for passion and we offer different types of services
                  for every type of hobbyist. See our reviews and our latest
                  works!
                  <FaPaintBrush style={{ color: "rgb(182, 20, 20)" }} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} lg={6}>
            <Card
              className="mb-5 cardShadow secondCard"
              onClick={() => navigate("/blog")}
            >
              <Card.Body>
                <Card.Title>
                  Become part of a great painting community!
                  <FaDiscord
                    className="iconFooter"
                    style={{ color: "rgba(62, 12, 198)" }}
                  />
                </Card.Title>
                <Card.Text>
                  Become a user of The painter, download the pdf, let us know
                  your opinion about our articles and share your experiences
                  with others!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} lg={12}>
            <Card
              className="mb-5 cardShadow thirdCard"
              onClick={() => navigate("/login-register")}
            >
              <Card.Body>
                <Card.Title>Do you want more?</Card.Title>
                <Card.Text>
                  Come and discover our Discord server: there are many painting
                  tutorials, examples, the works of our members and much more..
                  <span className="subTitle mb-2">
                    What are you waiting for? Come on board in The Painter!
                  </span>
                  <Image
                    src={logo}
                    className="img-fluid m-0"
                    alt="website logo"
                  ></Image>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={12} lg={12}>
            <Card>
              <img
                src={imgCommback}
                className="img-fluid cardShadow position-relative"
                alt="commissar-background"
                style={{ width: "100%" }}
              />
              <div className="text-center mb-3 position-absolute divMarine">
                <h1>Do you have any questions?</h1>
                <div>
                  <h1>
                    Contact us
                    <Link className="mx-1 linkMarine" to={`/contact`}>
                      HERE
                    </Link>
                    or search in our
                    <Link className="mx-1 linkMarine" to={`/about`}>
                      FAQ
                    </Link>
                  </h1>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mt-4 container">
        {cookieModal}

        <div className="mt-2">
          <AlertLogin
            loggedUser={loggedUser}
            lastUser={lastUser}
            setLastUser={setLastUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

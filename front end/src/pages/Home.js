import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import CookieModal from "../components/navbar-app-footer/Cookie";
import AlertLogin from "../components/login/AlertLogin";
import { getFaq } from "../api";
import { useEffect } from "react";
import AccordionFaq from "../components/home/AccordionFaq";

const Home = ({
  handleCookie,
  cookie,
  lastUser,
  setLastUser,
  loggedUser,
  setFaqList,
  faqList,
}) => {
  let cookieModal = <CookieModal handleCookie={handleCookie} />;
  if (cookie) {
    cookieModal = <></>;
  }

  useEffect(() => {
    const loadFaq = async () => {
      const result = await getFaq();
      if (result.ok) {
        setFaqList(result.data);
      } else {
        console.log(result.data);
      }
    };
    loadFaq();
    // eslint-disable-next-line
  }, []);

  let contentPage = (
    <>
      <h1>Loading.. please wait</h1>
    </>
  );
  if (faqList.length !== 0) {
    return (
      <div className="mb-5">
        <div className="mt-2 container">
          {cookieModal}
          <h1>Questa è la tua Home</h1>
          <div className="mt-2">
            <AlertLogin
              loggedUser={loggedUser}
              lastUser={lastUser}
              setLastUser={setLastUser}
            />
          </div>
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
        <AccordionFaq faqList={faqList} />
      </div>
    );
  } else {
    return contentPage;
  }
};

export default Home;

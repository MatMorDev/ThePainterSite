import { useNavigate } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import AccordionFaq from "../components/home/AccordionFaq";
import { getFaq } from "../api";
import { useEffect } from "react";
import imgTitan from "../images/240122770_1807204326117861_2821253475101208864_n.jpg";
import logo from "../utilities/logo-navbar.png";
const About = ({ setFaqList, faqList }) => {
  const navigate = useNavigate();
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
      <div>
        <img
          className="img-fluid"
          alt="titan"
          src={imgTitan}
          style={{
            width: "auto",
            height: "100%",
          }}
        />
        <div className="mt-2 mb-4 container">
          <Card className="mb-5 cardShadow text-center">
            <Card.Body>
              <Card.Title>
                <span className="titleAbout display-5">
                  Our mission, our vision
                </span>
              </Card.Title>
              <Card.Text>
                We are a passionate team about modeling and painting. We paint
                on commission but above all we do it for passion, we at The
                Painter are also a growing community. If you want to be part of
                our community consider to join the private server in Discord, we
                also offer workshops and tutorials from the beginner level to
                master level! We ship worldwide, if you want to know or can't
                find the answer to what you are looking for, you may consider to
                <span
                  className="subTitle mb-2 display-6 mx-2"
                  onClick={() => navigate("/contact")}
                >
                  contact us here
                </span>
                .
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{ background: "white", borderTop: "none" }}>
              <Image
                src={logo}
                className="img-fluid m-0"
                alt="website logo"
              ></Image>
            </Card.Footer>
          </Card>
          <AccordionFaq faqList={faqList} />
        </div>
      </div>
    );
  } else {
    return <>{contentPage}</>;
  }
};
export default About;

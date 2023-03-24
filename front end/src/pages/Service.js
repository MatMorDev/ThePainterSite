import { getServices } from "../api";
import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

import ServiceList from "../components/services/ServiceList";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "../components/services/Service.css";

const Service = ({
  serviceList,
  setServiceList,
  serviceCart,
  setServiceCart,
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
  imgFive,
}) => {
  useEffect(() => {
    const loadService = async () => {
      const result = await getServices();
      if (result.ok) {
        setServiceList(result.data);
      } else {
        console.log(result.data);
      }
    };
    loadService();
    // eslint-disable-next-line
  }, []);

  let contentPage = (
    <>
      <h1>Loading.. please wait</h1>
    </>
  );
  if (serviceList.length !== 0) {
    return (
      <>
        <div className="my-4 container text-center ">
          <h1 className="mb-4 serviceTitle ">Making your dreams reality</h1>
          <Carousel fade>
            <Carousel.Item>
              <img className="d-block w-100" src={imgOne} alt="First slide" />
              <Carousel.Caption>
                <h3>{serviceList[0].title}</h3>
                <p>{serviceList[0].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={imgTwo} alt="Second slide" />
              <Carousel.Caption>
                <h3>{serviceList[1].title}</h3>
                <p>{serviceList[1].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={imgThree} alt="Third slide" />
              <Carousel.Caption>
                <h3>{serviceList[2].title}</h3>
                <p>{serviceList[2].description}</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block w-100" src={imgFour} alt="Fourth slide" />

              <Carousel.Caption>
                <h3>{serviceList[3].title}</h3>
                <p>{serviceList[3].description}</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block w-100" src={imgFive} alt="Fifth slide" />

              <Carousel.Caption>
                <h3>{serviceList[4].title}</h3>
                <p>{serviceList[4].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <ServiceList
            serviceList={serviceList}
            serviceCart={serviceCart}
            setServiceCart={setServiceCart}
            imgOne={imgOne}
            imgTwo={imgTwo}
            imgThree={imgThree}
            imgFour={imgFour}
            imgFive={imgFive}
          />
          <BsFillArrowUpCircleFill
            id="arrowUp"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
        </div>
      </>
    );
  } else {
    return contentPage;
  }
};
export default Service;

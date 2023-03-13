import { Alert, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import notFound from "../utilities/3747371.jpg";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-start vh-100 mt-5">
      <Alert variant="warning" className="p-1 mb-0">
        <h1>
          Ops page not found, maybe the resource you are looking for is removed
          or missing..
        </h1>
      </Alert>
      <Image
        src={notFound}
        className="img-fluid shadow-4"
        alt="website logo"
      ></Image>
      <span className="align-self-end fs-6">
        <a href="http://www.freepik.com">Designed by stories / Freepik</a>
      </span>
    </Container>
  );
};

export default NotFound;

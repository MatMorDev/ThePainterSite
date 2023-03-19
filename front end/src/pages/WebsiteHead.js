import Image from "react-bootstrap/Image";
import logo from "../utilities/logo-navbar.png";

const WebHead = () => {
  return (
    <>
      <a href=".">
        <Image src={logo} className="img-fluid m-0" alt="website logo"></Image>
      </a>
    </>
  );
};
export default WebHead;

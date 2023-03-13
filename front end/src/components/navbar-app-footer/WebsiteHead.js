import Image from "react-bootstrap/Image";
import logo from "../../utilities/logo-navbar.png";

const WebHead = () => {
  return (
    <>
      <a href=".">
        <Image
          src={logo}
          className="img-fluid shadow-4 ml-2 me-3"
          alt="website logo"
        ></Image>
      </a>
    </>
  );
};
export default WebHead;

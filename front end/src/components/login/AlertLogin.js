import { useState, useEffect } from "react";
import { Alert, Modal } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "../login/AlertLogin.css";

const AlertLogin = ({ loggedUser, lastUser, setLastUser }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loggedUser.idSub !== 0 && lastUser.count === false) {
      setShow(true);
      setLastUser({ idSub: loggedUser.idSub, count: true });
      setTimeout(() => {
        setShow(false);
      }, 1500);
    }
  }, [loggedUser]);

  return (
    <Modal.Dialog>
      <Modal
        backdrop="true"
        animation="true"
        show={show}
        onHide={() => setShow(false)}
        className="myModal d-flex"
      >
        <Alert variant="success" className="myAlert mb-0 ">
          <AiOutlineInfoCircle
            className="me-1"
            style={{ height: "25px", width: "auto" }}
          />
          {loggedUser.username} logged in!
        </Alert>
      </Modal>
    </Modal.Dialog>
  );
};
export default AlertLogin;

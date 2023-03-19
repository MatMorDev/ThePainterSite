import { Modal, Button } from "react-bootstrap";
import { BsPaypal } from "react-icons/bs";
import { RiVisaFill } from "react-icons/ri";
import { SiMastercard, SiBitcoin } from "react-icons/si";
import "./Cart.css";

const AlertOrder = ({ showCompleted, setShowCompleted }) => {
  return (
    <Modal.Dialog>
      <Modal
        size="lg"
        backdrop="true"
        animation="true"
        show={showCompleted}
        className="d-flex"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="headModal">
          <Modal.Title>
            <h1>Congratulations! Your order has been placed!</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModal">
          <p>Now your order has been loaded correctly. </p>
          <p>
            You will receive an email to complete the payment or click on the
            "Pay Now" button below or manage your order in your Dashboard.
          </p>
          <div className="d-flex flex-row justify-content-center flex-wrap">
            <div>
              <BsPaypal className="icon" />
              <p>Paypal</p>
            </div>
            <div>
              <RiVisaFill className="icon" />
              <p>Visa</p>
            </div>
            <div>
              <SiMastercard className="icon" />
              <p>Mastercard</p>
            </div>
            <div>
              <SiBitcoin className="icon" />
              <p>Crypto</p>
            </div>
          </div>
          <p>
            Please note that the email may have ended up in the spam folder, in
            case of any clarification you can view the FAQ or send us a question
            via the "Contact" section.
          </p>
        </Modal.Body>
        <Modal.Footer className="footerModal">
          <Button
            variant="secondary"
            onClick={() => {
              setShowCompleted(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowCompleted(false);
            }}
          >
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal.Dialog>
  );
};

export default AlertOrder;

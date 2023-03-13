import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../navbar-app-footer/Cookie.css";

// questo componente modale simula l'ottenimento dei cookie si avvia unicamente all'avvio(e quindi al caricamento della pagina)
// in una situazione reale si potrebbe associare la ricerca del cookie dopo averlo ottenuto per poi mantere il modale falso
// fintato che nel broser dell'utente rimane traccia di aver cliccato una scelta
const CookieModal = ({ handleCookie }) => {
  const [show, setShow] = useState(true);

  const handleClose = (event) => {
    switch (event.target.value) {
      case "accepted":
        console.log("accepted");
        break;
      case "refused":
        console.log("refused");
        break;
      case "cookieSettings":
        console.log("cookieSettings");
        break;
      default:
    }
    setShow(!show);
    handleCookie(true);
  };

  return (
    <Modal show={show} backdrop="static" centered size="lg">
      <Modal.Body className="modalBody">
        <Row>
          <p className="p">
            Usiamo i cookies per fornirti contenuti e pubblicità personalizzati,
            per mostrarti i contenuti social media che vuoi vedere e per
            analizzare il nostro traffico. Potremmo condividere le informazioni
            sul tuo utilizzo del sito con i nostri partner dei social media,
            pubblicitari e analitici.
          </p>
        </Row>
        <Row>
          <Col md={12} lg={4} className="mt-3">
            <Button
              variant="warning"
              value="accepted"
              onClick={(event) => handleClose(event)}
              className="c_button w-100 h-100"
            >
              Accetta i cookies
            </Button>
          </Col>
          <Col md={12} lg={4} className="mt-3">
            <Button
              variant="warning"
              value="refused"
              onClick={(event) => handleClose(event)}
              className="c_button w-100 h-100"
            >
              Rifiuta tutti
            </Button>
          </Col>
          <Col md={12} lg={4} className="mt-3">
            <Button
              variant="warning"
              value="cookieSettings"
              onClick={(event) => handleClose(event)}
              className="c_button w-100 h-100 "
            >
              Impostazioni dei cookies
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CookieModal;

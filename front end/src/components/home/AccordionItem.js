import Accordion from "react-bootstrap/Accordion";
const AccordionItem = ({ faqList }) => {
  const faqAccordion = faqList.map((faq) => {
    return (
      <Accordion.Item eventKey={faq.id} key={faq.id}>
        <Accordion.Header>{faq.question}</Accordion.Header>
        <Accordion.Body>{faq.answer}</Accordion.Body>
      </Accordion.Item>
    );
  });

  return <Accordion>{faqAccordion}</Accordion>;
};
export default AccordionItem;

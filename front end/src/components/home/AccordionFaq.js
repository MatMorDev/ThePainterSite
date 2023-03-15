import { Container } from "react-bootstrap";
import AccordionItem from "./AccordionItem";
import SearchBar from "./SearchBar";
import { useState, useCallback } from "react";

const AccordionFaq = ({ faqList }) => {
  const [updateFaq, setUpdateFaq] = useState([]);

  const filterData = (term) => {
    let updatedData = faqList;
    if (term !== "") {
      //filtro per tutti gli elmenti che contengono gli input inseriti
      updatedData = faqList.filter((element) => {
        return (
          element.question.toLowerCase().includes(term.toLowerCase()) ||
          element.answer.toLowerCase().includes(term.toLowerCase())
        );
      });
    }
    setUpdateFaq(updatedData);
  };
  // useCallback mi permette di cachare la definizione di una funzione
  // memoizzazione tramite useCallback, non fa il rendering nuovamente ma lavora sul virtual Dom di React

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cachedFilterData = useCallback(filterData, []);

  return (
    <Container className="mt-2">
      <SearchBar filterData={cachedFilterData} />
      <AccordionItem faqList={updateFaq} />
    </Container>
  );
};
export default AccordionFaq;

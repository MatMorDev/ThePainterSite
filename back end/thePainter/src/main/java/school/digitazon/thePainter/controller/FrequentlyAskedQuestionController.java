package school.digitazon.thePainter.controller;

import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import school.digitazon.thePainter.entity.Article;
import school.digitazon.thePainter.entity.FrequentlyAskedQuestion;
import school.digitazon.thePainter.repository.ArticleRepository;
import school.digitazon.thePainter.repository.FrequentlyAskedQuestionRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/faqs")
public class FrequentlyAskedQuestionController {

    @Autowired
    FrequentlyAskedQuestionRepository frequentlyAskedQuestionRepository;

    // http://localhost:8080/faqs/get
    // http://localhost:8080/faqs/get?question=&answer=
    /* GET all endpoint per poter vedere tutte le faqs
    e poterli anche cercare tramite titolo o descrizione */
    @GetMapping("/get")
    public List<FrequentlyAskedQuestion> getAll(
            @RequestParam(name = "question", required = false) String questionParam,
            @RequestParam(name = "answer", required = false) String answerParam)
    {
        if(Strings.isNotBlank(questionParam) && Strings.isNotBlank(answerParam)){
            // caso in cui title e description sono entrambi valorizzati
            return frequentlyAskedQuestionRepository.findByQuestionContainsIgnoreCaseAndAnswerContainsIgnoreCase(questionParam,answerParam);
        }else if(Strings.isNotBlank(questionParam)){
            // caso in cui solo la question è valorizzata
            return frequentlyAskedQuestionRepository.findByQuestionContainsIgnoreCase(questionParam);
        }else if(Strings.isNotBlank(answerParam)){
            // caso in cui solo l'answer è valorizzato
            return frequentlyAskedQuestionRepository.findByAnswerContainsIgnoreCase(answerParam);
        }
        // ritorno la lista non filtrata se nessuno dei due è valorizzato ed il risultato è presente
        return frequentlyAskedQuestionRepository.findAll();
    }

    // http://localhost:8080/faqs/get/3
    /* GET by id endpoint per prendere una faq per il suo id */
    @GetMapping("/get/{id}")
    public FrequentlyAskedQuestion getById(@PathVariable Integer id) {
        Optional<FrequentlyAskedQuestion> result = frequentlyAskedQuestionRepository.findById(id);
        if(result.isPresent()){
            // restituisce la faq con l'id che viene passato
            return result.get();
        } else {
            // se non trova la faq con l'id passato ritorna HTTP 404 non trovato
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Faq with id " + id + " not found");
        }
    }

    // http://localhost:8080/faqs/admin/post
    /* POST endpoint per creare una faq */
    @PostMapping("/admin/post")
    public FrequentlyAskedQuestion create(@Valid @RequestBody FrequentlyAskedQuestion newFaq) {
        newFaq.setId(0);// mi assicuro che la faq abbia un id vuoto
        return frequentlyAskedQuestionRepository.save(newFaq); // salvo la faq sul DB
    }

    // http://localhost:8080/faqs/admin/put/2
    /* PUT endpoint per modificare una faq*/
    @PutMapping("/admin/put/{id}")
    public FrequentlyAskedQuestion update(@PathVariable Integer id, @Valid @RequestBody FrequentlyAskedQuestion faq) {
        Optional<FrequentlyAskedQuestion> result = frequentlyAskedQuestionRepository.findById(id);
        if (result.isPresent()) {
            // restituisco la faq modificata
            FrequentlyAskedQuestion faqToUpdate = result.get();
            faqToUpdate.setQuestion(faq.getQuestion());
            faqToUpdate.setAnswer(faq.getAnswer());
            // modifico la faq sul database
            return frequentlyAskedQuestionRepository.save(faqToUpdate);
        } else {
            // se non trovo la faq con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Faq with id " + id + " not found");
        }
    }

    // http://localhost:8080/faqs/admin/delete/5
    // DELETE endpoint per eliminare una faq
    @DeleteMapping("/admin/delete/{id}")
    public void delete(@PathVariable Integer id) {
        Optional<FrequentlyAskedQuestion> faqResult = frequentlyAskedQuestionRepository.findById(id);
        if (faqResult.isPresent()) {
            // elimino la faq presa per id
            frequentlyAskedQuestionRepository.deleteById(id);
        } else {
            // se non trovo la faq con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Faq with id " + id + " not found");
        }
    }

}

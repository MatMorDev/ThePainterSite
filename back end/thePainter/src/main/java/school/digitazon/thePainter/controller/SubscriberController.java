package school.digitazon.thePainter.controller;

import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import school.digitazon.thePainter.DTO.SubscriberDTO;
import school.digitazon.thePainter.entity.*;
import school.digitazon.thePainter.repository.ArticleRepository;
import school.digitazon.thePainter.repository.CommentRepository;
import school.digitazon.thePainter.repository.CustomerRepository;
import school.digitazon.thePainter.repository.SubscriberRepository;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/subscribers")
public class SubscriberController {
    @Autowired
    SubscriberRepository subscriberRepository;
    @Autowired
    ArticleRepository articleRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    CustomerRepository customerRepository;

    // http://localhost:8080/subscribers/admin/get
    // http://localhost:8080/subscribers/admin/get?firstName=&lastName=
    /* GET all endpoint lato admin per poter vedere tutti i subscribers
    e poterli anche cercare tramite nome e/o cognome */
    @GetMapping("/admin/get")
    public List<Subscriber> getAll(
            @RequestParam(name = "firstName", required = false) String firstNameParam,
            @RequestParam(name = "lastName", required = false) String lastNameParam)
    {
        if(Strings.isNotBlank(firstNameParam) && Strings.isNotBlank(lastNameParam)){
            // caso in cui firstName e lastName sono entrambi valorizzati
            return subscriberRepository.findByFirstNameContainsIgnoreCaseAndLastNameContainsIgnoreCase(firstNameParam,lastNameParam);
        }else if(Strings.isNotBlank(firstNameParam)){
            // caso in cui solo il firstName è valorizzato
            return subscriberRepository.findByFirstNameContainsIgnoreCase(firstNameParam);
        }else if(Strings.isNotBlank(lastNameParam)){
            // caso in cui solo il lastName è valorizzato
            return subscriberRepository.findByLastNameContainsIgnoreCase(lastNameParam);
        }
        // ritorno la lista non filtrata se nessuno dei due è valorizzato ed il risultato è presente
        return subscriberRepository.findAll();
    }

    // http://localhost:8080/subscribers/admin/username?username
    /* GET by username endpoint per prendere un subscriber per username */
    @GetMapping("/admin/username")
    public List<Subscriber> getByUsername(
            @RequestParam(name = "username", required = false)String usernameParam) {
        if(Strings.isNotBlank((usernameParam))){
            return subscriberRepository.findByUsernameContainsIgnoreCase(usernameParam);
        } else { return subscriberRepository.findAll();}
    }

    // http://localhost:8080/subscribers/user/username?username=
    /* GET by username endpoint per prendere un subscriber per username DA PARTE DI UN USER
    * sfrutta una classe d'appoggio DTO per restituire una porzione di dati interessati*/
    @GetMapping("/user/username")
    public List<SubscriberDTO> getByUsernameFromUser(
            @RequestParam(name = "username", required = false)String usernameParam) {
        List<Subscriber> subscribersList;
        if(Strings.isNotBlank((usernameParam))){
            subscribersList = subscriberRepository.findByUsernameContainsIgnoreCase(usernameParam);
        } else { subscribersList = subscriberRepository.findAll();}
        return forEachSubDTO(subscribersList);
    }
    // metodo per iterare su liste diverse di subscriber ed ottenere una lista di subscriber con solo id, username e comments
    public List<SubscriberDTO> forEachSubDTO(List<Subscriber> listSubscriber){
        List<SubscriberDTO> subscriberListFiltered = new ArrayList<>();
        for (Subscriber singleSub:listSubscriber) {
            SubscriberDTO subscriberReducted = new SubscriberDTO(singleSub.getId(), singleSub.getUsername(), singleSub.getComments());
            subscriberListFiltered.add(subscriberReducted);
        }
        return subscriberListFiltered;
    }

    // http://localhost:8080/subscribers/admin/get/5
    /* GET by id endpoint per prendere un subscriber per id */
    @GetMapping("/admin/get/{id}")
    public Subscriber getById(@PathVariable Integer id) {
        Optional<Subscriber> result = subscriberRepository.findById(id);
        if(result.isPresent()){
            // restituisce il subscriber con l'id che viene passato
            return result.get();
        } else {
            // se non trova l'utente con l'id passato ritorna HTTP 404 non trovato
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscriber with id " + id + " not found");
        }
    }

    // http://localhost:8080/subscribers/user/post
    /* POST endpoint per creare un subscriber */
    @PostMapping("/user/post")
    public Subscriber create(@Valid @RequestBody Subscriber newSubscriber) {
        newSubscriber.setId(0);// mi assicuro che il nuovo subscriber abbia un id vuoto
        return subscriberRepository.save(newSubscriber); // permango il subscriber sul DB
    }

    // http://localhost:8080/subscribers/admin/put/4
    /* PUT endpoint per modificare un subscriber */
    // NOTA: modifica id su FE se è lo stesso dell'id loggato od è id admin loggato
    @PutMapping("/admin/put/{id}")
    public Subscriber update(@PathVariable Integer id, @Valid @RequestBody Subscriber subscriber) {
        Optional<Subscriber> result = subscriberRepository.findById(id);
        if (result.isPresent()) {
            // restituisco il subscriber modificato
            Subscriber subscriberToUpdate = result.get();
            subscriberToUpdate.setUsername(subscriber.getUsername());
            subscriberToUpdate.setPassword(subscriber.getPassword());
            subscriberToUpdate.setFirstName(subscriber.getFirstName());
            subscriberToUpdate.setLastName(subscriber.getLastName());
            subscriberToUpdate.setDateOfBirth(subscriber.getDateOfBirth());
            subscriberToUpdate.setEmail(subscriber.getEmail());
            subscriberToUpdate.setAddress(subscriber.getAddress());
            subscriberToUpdate.setCity(subscriber.getCity());
            subscriberToUpdate.setCap(subscriber.getCap());
            subscriberToUpdate.setPhoneNumber(subscriber.getPhoneNumber());
            subscriberToUpdate.setComments(result.get().getComments());
            // modifico il subscriber sul database
            return subscriberRepository.save(subscriberToUpdate);
        } else {
            // se non trovo il subscriber con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscriber with id " + id + " not found");
        }
    }

    // http://localhost:8080/subscribers/delete/4
    // DELETE endpoint per eliminare un subscriber,
    // NOTA: cancella id su FE se è lo stesso dell'id loggato od è id admin loggato
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        if (subscriberRepository.existsById(id)) {
            // elimino il subscriber preso per id
            subscriberRepository.deleteById(id);
        } else {
            // se non trovo il subscriber con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscriber with id " + id + " not found");
        }
    }

    // http://localhost:8080/subscribers/2/comments
    /* GET endpoint per vedere solo i commenti di un subscriber */
    @GetMapping("/{id}/comments")
    public List<Comment> getSubscriberComments(@PathVariable Integer id) {
        // verifico che il subscriber esista
        Optional<Subscriber> result = subscriberRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscriber with id " + id + " not found");
        } else {
            Subscriber subscriber = result.get();
            // restituisco i comments del subscribers
            return subscriber.getComments();
        }
    }

    // http://localhost:8080/subscribers/5/comments/4
    /* POST endpoint per inserire un commento da un subscriber in un articolo */
    @PostMapping("/{idSub}/comments/{idArt}")
    public Comment createSubscriberComment(@Valid @RequestBody Comment comment,
                                           @PathVariable Integer idSub,
                                           @PathVariable Integer idArt) {
        Optional<Subscriber> resultSub = subscriberRepository.findById(idSub);
        Optional<Article> resultArt = articleRepository.findById(idArt);
        // verifico che il subscriber esista e che esista l'articolo
        if (resultSub.isEmpty() || resultArt.isEmpty()) {
            if(resultSub.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscriber with id " + idSub + " not found");
            }else{
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article with id " + idArt + " not found");
            }
        } else {
            // creo un nuovo oggetto comment settando il contenuto, ed i riferimenti articolo e subscriber
            Comment newComment = new Comment();
            newComment.setContent(comment.getContent());
            newComment.setArticle(resultArt.get());
            newComment.setSubscriber(resultSub.get());
            // persisto il nuovo commento sul database
            return commentRepository.save(newComment);
        }
    }

    // http://localhost:8080/subscribers/5/comments/9
    /* PUT endpoint per modificare un commento di un subscriber in un articolo */
    @PutMapping("/{idSub}/comments/{idCom}")
    public Comment updateSubscriberComment(@PathVariable Integer idSub,
                                           @PathVariable Integer idCom,
                                           @Valid @RequestBody Comment comment){
        Optional<Comment> result = commentRepository.findById(idCom);
        // verifico che il commento da modificare esista
        if(result.isPresent()){
            Optional<Subscriber> subscriberResult= subscriberRepository.findById(idSub);
            if(subscriberResult.isPresent()) {
                // copio il precedente commento dentro a commentToUpdate
                Comment commentToUpdate = result.get();
                // cambio il contenuto del commento con quello nuovo
                commentToUpdate.setContent(comment.getContent());
                return commentRepository.save(commentToUpdate);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscriber with id " + idSub + " not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment with id " + idCom + " not found");
        }
    }

    // http://localhost:8080/subscribers/5/comments/9
    /* DELETE endpoint per eliminare un commento di un subscriber in un articolo */
    @DeleteMapping("/{idSub}/comments/{idCom}")
    public void delete(@PathVariable Integer idSub, @PathVariable Integer idCom) {
        Optional<Subscriber> result = subscriberRepository.findById(idSub);
        // verifico che il subscriber esista, se non esiste restituisco che non lo trovo
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscriber with id " + idSub + " not found");
        } else {
            // prendo il subscriber
            Subscriber subscriber = result.get();
            Optional<Comment> comment = commentRepository.findById(idCom);
            // testo se il commento è vuoto, altrimenti restituisco non lo trovo
            if(comment.isEmpty()){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment with id " + idCom + " not found");
            }
            Comment commentToDelete = comment.get();
            // se l'id del subscriber e l'id del commento non sono identici allora è una richiesta errata
            if(commentToDelete.getSubscriber().getId() != subscriber.getId()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Comment with id " + idCom + " does not belong to subscriber with id " + idSub);
            }
            commentRepository.delete(commentToDelete);
        }
    }



};





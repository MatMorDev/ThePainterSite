package school.digitazon.thePainter.controller;

import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import school.digitazon.thePainter.entity.FrequentlyAskedQuestion;
import school.digitazon.thePainter.entity.Login;
import school.digitazon.thePainter.entity.Subscriber;
import school.digitazon.thePainter.repository.LoginRepository;
import school.digitazon.thePainter.repository.SubscriberRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/logins")
public class LoginController {

    @Autowired
    SubscriberRepository subscriberRepository;
    @Autowired
    LoginRepository loginRepository;

    // http://localhost:8080/logins/user/username/{log}
    /* POST by username e password endpoint per prendere un subscriber per username
    * quindi confronto l'username e la password che arriva dal front end con un subscriber con
    * stessa username e password e se lo trova allora restituisce al FE l'id
    * ((simulazione di autenticazione))*/
    @PostMapping("/user/username/{log}")
    public Login login(@Valid @RequestBody Login newLogin,@PathVariable String log) {
        Subscriber subscriber = subscriberRepository.findByUsernameEquals(newLogin.getUsername());
        System.out.println(subscriber);
            if (subscriber == null) {
                throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED, log + " not allowed. Check if username or password are valid.");
            } else {
                Login login = new Login();
                login.setId(0);
                login.setUsername(newLogin.getUsername());
                login.setEmail(newLogin.getEmail());
                login.setPassword(newLogin.getPassword());
                // testo se email e password corrispondono ad un subscriber nel DB
                if (subscriber.getUsername().equals(login.getUsername()) && subscriber.getPassword().equals(login.getPassword())) {
                    login.setSubId(subscriber.getId());
                    login.setEmail(subscriber.getEmail());
                    login.setAction(log);
                    login.setSubscriber(subscriber);
                    // registro la connessione effettuata
                    return loginRepository.save(login);
                }else {throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED, log + " not allowed. Check if username or password are valid.");}
            }
    }
}

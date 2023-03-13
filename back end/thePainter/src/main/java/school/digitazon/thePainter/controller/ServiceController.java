package school.digitazon.thePainter.controller;

import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import school.digitazon.thePainter.entity.Customer;
import school.digitazon.thePainter.entity.Service;
import school.digitazon.thePainter.entity.ServiceBought;
import school.digitazon.thePainter.repository.ServiceBoughtRepository;
import school.digitazon.thePainter.repository.ServiceRepository;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/services")
public class ServiceController {

    @Autowired
    ServiceBoughtRepository serviceBoughtRepository;
    @Autowired
    ServiceRepository serviceRepository;

    // http://localhost:8080/services/get
    // http://localhost:8080/services/get?title=&description=
    /* GET all endpoint per poter vedere tutti i services
    e poterli anche cercare tramite titolo o descrizione */
    @GetMapping("/get")
    public List<Service> getAll(
            @RequestParam(name = "title", required = false) String titleParam,
            @RequestParam(name = "description", required = false) String descriptionParam)
    {
        if(Strings.isNotBlank(titleParam) && Strings.isNotBlank(descriptionParam)){
            // caso in cui title e description sono entrambi valorizzati
            return serviceRepository.findByTitleContainsIgnoreCaseAndDescriptionContainsIgnoreCase(titleParam,descriptionParam);
        }else if(Strings.isNotBlank(titleParam)){
            // caso in cui solo il title è valorizzato
            return serviceRepository.findByTitleContainsIgnoreCase(titleParam);
        }else if(Strings.isNotBlank(descriptionParam)){
            // caso in cui solo il description è valorizzato
            return serviceRepository.findByDescriptionContainsIgnoreCase(descriptionParam);
        }
        // ritorno la lista non filtrata se nessuno dei due è valorizzato ed il risultato è presente
        return serviceRepository.findAll();
    }

    // http://localhost:8080/services/get/3
    /* GET by id endpoint per prendere un service per il suo id */
    @GetMapping("/get/{id}")
    public Service getById(@PathVariable Integer id) {
        Optional<Service> result = serviceRepository.findById(id);
        if(result.isPresent()){
            // restituisce il service con l'id che viene passato
            return result.get();
        } else {
            // se non trova il service con l'id passato ritorna HTTP 404 non trovato
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service with id " + id + " not found");
        }
    }

    // http://localhost:8080/services/admin/post
    /* POST endpoint per creare un nuovo service */
    @PostMapping("/admin/post")
    public Service create(@Valid @RequestBody Service newService) {
        newService.setId(0);// mi assicuro che il nuovo service abbia un id vuoto
        return serviceRepository.save(newService); // permango il service sul DB
    }

    // http://localhost:8080/services/admin/put/2
    /* PUT endpoint per modificare un service */
    @PutMapping("/admin/put/{id}")
    public Service update(@PathVariable Integer id, @Valid @RequestBody Service service) {
        Optional<Service> result = serviceRepository.findById(id);
        if (result.isPresent()) {
            // restituisco il service modificato
            Service serviceToUpdate = result.get();
            serviceToUpdate.setImg(service.getImg());
            serviceToUpdate.setTitle(service.getTitle());
            serviceToUpdate.setDescription(service.getDescription());
            serviceToUpdate.setPrice(service.getPrice());
            serviceToUpdate.setRate(service.getRate());
            // modifico il service sul database
            return serviceRepository.save(serviceToUpdate);
        } else {
            // se non trovo il service con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service with id " + id + " not found");
        }
    }

    // http://localhost:8080/services/admin/delete/5
    /* DELETE endpoint per eliminare un singolo service
    * attenzione: verranno eliminati anche i riferimenti corrispondenti se ne possiede
    * verranno eliminate nella tabella di relazione service_bought_service tutte i riferimenti */
    @DeleteMapping("/admin/delete/{id}")
    public void delete(@PathVariable Integer id) {
        Optional<Service> serviceResult = serviceRepository.findById(id);
        if (serviceResult.isPresent()) {
            // elimino prima le relazioni del service perso per id con ServiceBought
            Service service = serviceResult.get();
            List<ServiceBought> serviceBoughtList = serviceBoughtRepository.findAll();
            for (ServiceBought serviceBought: serviceBoughtList) {
                service.getServiceBought().remove(serviceBought);
                serviceBought.getService().remove(service);
            }
            // elimino il service preso per id
            serviceRepository.deleteById(id);
        } else {
            // se non trovo il service con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service with id " + id + " not found");
        }
    }
}

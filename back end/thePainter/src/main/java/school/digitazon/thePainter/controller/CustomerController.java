package school.digitazon.thePainter.controller;

import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import school.digitazon.thePainter.StatusOrder;
import school.digitazon.thePainter.entity.*;
import school.digitazon.thePainter.repository.CustomerRepository;
import school.digitazon.thePainter.repository.ServiceBoughtRepository;
import school.digitazon.thePainter.repository.ServiceRepository;

import java.util.List;
import java.util.Optional;

import static java.time.LocalDateTime.now;

@CrossOrigin
@RestController
@RequestMapping("/shop/customers")
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    ServiceBoughtRepository serviceBoughtRepository;

    // http://localhost:8080/shop/customers/admin/get?firstName=&lastName=
    /* GET all endpoint lato admin per poter vedere tutti i subscribers
    e poterli anche cercare tramite nome e/o cognome */
    @GetMapping("/admin/get")
    public List<Customer> getAll(
            @RequestParam(name = "firstName", required = false) String firstNameParam,
            @RequestParam(name = "lastName", required = false) String lastNameParam)
    {
        if(Strings.isNotBlank(firstNameParam) && Strings.isNotBlank(lastNameParam)){
            // caso in cui firstName e lastName sono entrambi valorizzati
            return customerRepository.findByFirstNameContainsIgnoreCaseAndLastNameContainsIgnoreCase(firstNameParam,lastNameParam);
        }else if(Strings.isNotBlank(firstNameParam)){
            // caso in cui solo il firstName è ad essere valorizzato
            return customerRepository.findByFirstNameContainsIgnoreCase(firstNameParam);
        }else if(Strings.isNotBlank(lastNameParam)){
            // caso in cui solo il lastName è ad essere valorizzato
            return customerRepository.findByLastNameContainsIgnoreCase(lastNameParam);
        }
        // ritorno la lista non filtrata se nessuno dei due è valorizzato ed il risultato è presente
        return customerRepository.findAll();
    }

    // http://localhost:8080/shop/customers/admin/get/5
    /* GET by id endpoint per prendere un customer per id */
    @GetMapping("/admin/get/{id}")
    public Customer getById(@PathVariable Integer id) {
        Optional<Customer> result = customerRepository.findById(id);
        if(result.isPresent()){
            // restituisce il customer con l'id che viene passato
            return result.get();
        } else {
            // se non trova il costumer con l'id passato ritorna HTTP 404 non trovato
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Costumer with id " + id + " not found");
        }
    }

    // http://localhost:8080/shop/customers/user/post
    /* POST endpoint per creare un customer */
    @PostMapping("/user/post")
    public Customer create(@Valid @RequestBody Customer newCustomer) {
        newCustomer.setId(0);// mi assicuro che il nuovo customer abbia un id vuoto
        return customerRepository.save(newCustomer); // permango il customer sul DB
    }

    // http://localhost:8080/shop/customers/admin/put/3
    /* PUT endpoint per modificare un customer */
    // NOTA: modifica id su FE se è lo stesso dell'id loggato od è id admin loggato
    @PutMapping("/admin/put/{id}")
    public Customer update(@PathVariable Integer id, @Valid @RequestBody Customer customer) {
        Optional<Customer> result = customerRepository.findById(id);
        if (result.isPresent()) {
            // restituisco il customer modificato
            Customer customerToUpdate = result.get();
            customerToUpdate.setPassword(customer.getPassword());
            customerToUpdate.setFirstName(customer.getFirstName());
            customerToUpdate.setLastName(customer.getLastName());
            customerToUpdate.setDateOfBirth(customer.getDateOfBirth());
            customerToUpdate.setEmail(customer.getEmail());
            customerToUpdate.setAddress(customer.getAddress());
            customerToUpdate.setCity(customer.getCity());
            customerToUpdate.setCap(customer.getCap());
            customerToUpdate.setPhoneNumber(customer.getPhoneNumber());
            customerToUpdate.setServiceBought(result.get().getServiceBought());
            // modifico il customer sul database
            return customerRepository.save(customerToUpdate);
        } else {
            // se non trovo il customer con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with id " + id + " not found");
        }
    }

    // http://localhost:8080/shop/customers/admin/delete/2
    // DELETE endpoint per eliminare un customer,
    // NOTA: la delete di un utente che ha richiesto dei servizi è più delicato di un delete fatto per
    // cancellare un utente di un blog, fatta questa premessa il delete di un utente che richiede un servizio è di
    // uso esclusivo dell'admin, un'idea è avere comunque la possibilità di fare la richiesta da parte dell'utente
    // ma la delete avrà successo solo se i suoi ordini sono stati pagati ed evasi
    // è un'idea mettere un popup avvisando che l'eliminazione comporterà la perdita dei dati -- ipotesi
    /* rimuove customer e relazione customer_bought_service services_bought rimane nel DB e tiene traccia degli ordini
    * avvenuti per motivi statistici o per storico */
    @DeleteMapping("/admin/delete/{id}")
    public void delete(@PathVariable Integer id) {
        if (customerRepository.existsById(id)) {
            // elimino il customer preso per id
            customerRepository.deleteById(id);
        } else {
            // se non trovo il customer con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with id " + id + " not found");
        }
    }

    // http://localhost:8080/shop/customers/2/servicesbought
    /* GET endpoint per vedere solo i servizi acquistati di un customer */
    @GetMapping("/{id}/servicesbought")
    public List<ServiceBought> getCustomerServices(@PathVariable Integer id) {
        // verifico che il customer esista
        Optional<Customer> result = customerRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with id " + id + " not found");
        } else {
            Customer customer = result.get();
            // restituisco i prodotti acquistati del customer
            return customer.getServiceBought();
        }
    }

    // http://localhost:8080/shop/customers/2/servicesbought/3qty=2
    /* POST endpoint per registrare l'ordine di un acquisto
    * verifica prima che esista il customer e che esista il servizio
    * poi crea il nuovo servicesBought(un ordine di acquisto) e salva anche i riferimenti bidirezionali  */
    @PostMapping("/{idCustomer}/servicesbought/{idService}qty={quantity}")
    public ServiceBought createCustomerOrder(@PathVariable Integer idCustomer,
                                       @PathVariable Integer idService,
                                       @PathVariable Integer quantity) {
        Optional<Customer> resultCustomer = customerRepository.findById(idCustomer);
        Optional<Service> resultService = serviceRepository.findById(idService);
        // verifico che il customer esista e che esista il servizio
        if (resultCustomer.isEmpty() || resultService.isEmpty()) {
            if(resultCustomer.isEmpty()){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with id " + idCustomer + " not found");
            }else{
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service with id " + idService + " not found");
            }
        } else {
            // creo un nuovo oggetto ServiceBought
            ServiceBought newOrder = new ServiceBought();
            newOrder.setQuantity(quantity);
            newOrder.setLocalDateTime(now());
            newOrder.setPaid(false);
            newOrder.setOrderStatus(String.valueOf(StatusOrder.NEW));
            // salvo i riferimenti customer e service dentro al nuovo oggetto dell'ordine
            List<Customer> thisCustomer = customerRepository.findByIdEquals(idCustomer);
            newOrder.setCustomers(thisCustomer);
            List<Service> thisService = serviceRepository.findByIdEquals(idService);
            newOrder.setService(thisService);
            // persisto il nuovo oggetto nel DB, si salva il riferimento bidirezionale per tabella service_bought
            ServiceBought orderToAdd = serviceBoughtRepository.save(newOrder);
            // salvo anche il riferimento bidirezionale anche nella tabella customer_bought_services
            resultCustomer.get().getServiceBought().add(orderToAdd);
            customerRepository.save(resultCustomer.get());
            // ritorno il nuovo ordine (ServiceBought) creato
            return orderToAdd;
        }
    }


    // http://localhost:8080/shop/customers/admin/2/servicesbought/5
    /* PUT endpoint per modificare un ServiceBought effettuato da un customer
    * verifica prima che esista l'ordine piazzato ed anche il customer associato
    * serve all'admin per modificare lo status, la quantità o tener traccia del pagamento */
    @PutMapping("/admin/{idCustomer}/servicesbought/{idSerBought}")
    public ServiceBought updateCustomerOrder(@PathVariable Integer idCustomer,
                                           @PathVariable Integer idSerBought,
                                           @Valid @RequestBody ServiceBought serviceBought){
        Optional<ServiceBought> resultSerBought = serviceBoughtRepository.findById(idSerBought);
        // verifico che l'ordine del servizio del customer da modificare esista
        if(resultSerBought.isPresent()){
            Optional<Customer> customerResult= customerRepository.findById(idCustomer);
            // verifico inoltre che esista anche il customer
            if(customerResult.isPresent()) {
                // copio il precedente ServiceBought dentro a orderToUpdate
                ServiceBought orderToUpdate = resultSerBought.get();
                // cambio il contenuto dell'orderToUpdate con i nuovi parametri
                // per settare una nuova quantità, se è stato pagato o lo status dell'ordine passandoli nel doby
                orderToUpdate.setQuantity(serviceBought.getQuantity());
                orderToUpdate.setPaid(serviceBought.getPaid());
                orderToUpdate.setOrderStatus(serviceBought.getOrderStatus());
                // NOTA: seppur sia possibile, valuto che la modifica del servizio è una modifica forte,
                // ed è preferibile da parte dell'admin cancellare l'ordine ed invitare l'utente a realizzarne uno nuovo
                return serviceBoughtRepository.save(orderToUpdate);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with id " + idCustomer + " not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order with id " + idSerBought + " not found");
        }
    }

    // http://localhost:8080/shop/customers/admin/2/servicesbought/6
    /* DELETE endpoint per eliminare un singolo ServiceBought effettuato da un Customer presi per id
     * Se il ServiceBought esiste ed anche il Customer esiste allora rimuovo l'associazione
     * Se il ServiceBought oppure il Customer non esistono allora ritorno status HTTP 404 */
    @DeleteMapping("/admin/{idCustomer}/servicesbought/{idSerBought}")
    public List<ServiceBought> removeServiceBought(@PathVariable Integer idCustomer,
                              @PathVariable Integer idSerBought) {
        Optional<Customer> customerResult = customerRepository.findById(idCustomer);
        Optional<ServiceBought> serBoughtResult = serviceBoughtRepository.findById(idSerBought);
        if (customerResult.isPresent() && serBoughtResult.isPresent()) {
            // verifico che l'id dell'ordine appartenga proprio al customer selezionato
            List<ServiceBought> customerOrders = customerResult.get().getServiceBought();
            boolean found = false;
            for (ServiceBought order:customerOrders) {
                found = (idSerBought == order.getId()) ? true : false ;
                if (found) {
                    // rimuovo associazione da entrambi i lati in customer_bought_services
                    Customer customer = customerResult.get();
                    ServiceBought serviceBought = serBoughtResult.get();
                    customer.getServiceBought().remove(serviceBought);
                    serviceBought.getCustomers().remove(customer);
                    customerRepository.save(customer);
                    // rimuovo associazione da entrambi i lati in service_bought_service
                    Service service = serviceBought.getService().get(0);
                    service.getServiceBought().remove(serviceBought);
                    serviceBought.getService().remove(service);
                    serviceRepository.save(service);
                    // rimuovo l'ordine ServiceBought
                    serviceBoughtRepository.deleteById(idSerBought);
                    return customer.getServiceBought();
                }
            }
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Customer id: " + idCustomer
                        + " hasn't this order with id: " + idSerBought);

        } else {
            String message = "";
            if (customerResult.isEmpty()) {
                message += "Customer with id " + idCustomer + " not found \n";
            }
            if (serBoughtResult.isEmpty()) {
                message += "Order with id " + idSerBought + " not found";
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, message);
        }
    }


    /* GET lato admin per cercare un customer per email */
    @GetMapping("/admin/getemail/{email}")
    public Customer getByEmail(@PathVariable String email) {
        Optional<Customer> result = customerRepository.findByEmailEquals(email);
        if(result.isPresent()){
            return result.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Costumer with email " + email+ " not found");
        }
    }
}

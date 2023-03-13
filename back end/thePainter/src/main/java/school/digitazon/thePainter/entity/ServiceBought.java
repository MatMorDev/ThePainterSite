package school.digitazon.thePainter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "services_bought")
public class ServiceBought {
    /* fields */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity;
    private LocalDateTime localDateTime;
    private boolean paid;
    // CANCELED PAYMENTFAILED NEW INPROGRESS DELIVERED CLOSED
    private String orderStatus;

    @ManyToMany
    @JoinTable(name = "serviceBought_service", joinColumns = {
            @JoinColumn(name = "bought_id")}, inverseJoinColumns = {
            @JoinColumn(name = "service_id")})
    private List<Service> service;

    @ManyToMany(mappedBy = "serviceBought")
    @JsonIgnore
    private List<Customer> customers;

    /* constructors */
    // inizializzo a falso, se ci fosse la conferma da api esterne che la transazione è avvenuta allora
    // poi verrebbe modificato sul db per farlo diventare true
    public ServiceBought() {
        this.paid = false;
    }

    /* getters & setters */

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public boolean getPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public List<Service> getService() {
        return service;
    }

    public void setService(List<Service> service) {
        this.service = service;
    }

    public List<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }


}

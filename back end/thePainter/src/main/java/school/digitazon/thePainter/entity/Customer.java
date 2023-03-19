package school.digitazon.thePainter.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "customers")
public class Customer {
    /* fields */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Pattern(regexp = "^(?=.*\\d)(?=.*[A-Z]).{6,14}$", message = "Password must be between 6 and 14 characters and include a capital letter")
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    @Email(message = "Email should be valid")
    @Column(unique=true)
    private String email;
    private String address;
    private String city;
    private int cap;
    @Column(unique=true)
    private String phoneNumber;
    @ManyToMany
    @JoinTable(name = "customer_boughtServices", joinColumns = {
            @JoinColumn(name = "customer_id")}, inverseJoinColumns = {
            @JoinColumn(name = "boughtService_id")})
    private List<ServiceBought> serviceBought;

    /* constructors */
    public Customer() {}

    /* getters & setters*/

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getCap() {
        return cap;
    }

    public void setCap(int cap) {
        this.cap = cap;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<ServiceBought> getServiceBought() {
        return serviceBought;
    }

    public void setServiceBought(List<ServiceBought> serviceBought) {
        this.serviceBought = serviceBought;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", cap=" + cap +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", serviceBought=" + serviceBought +
                '}';
    }


}

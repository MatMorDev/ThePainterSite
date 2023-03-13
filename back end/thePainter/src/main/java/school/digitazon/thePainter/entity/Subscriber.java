package school.digitazon.thePainter.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "subscribers")
public class Subscriber {

    /* fields */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique=true)
    private String username;
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
    private String phoneNumber;
    @OneToMany(mappedBy = "subscriber", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Comment> comments;
    @OneToMany(mappedBy = "subscriber", orphanRemoval = false, cascade = CascadeType.ALL)
    private List<Login> logins;

    /* constructors */
    public Subscriber() {}

    /* getters & setters*/
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}
    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}
    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}
    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}
    public LocalDate getDateOfBirth() {return dateOfBirth;}
    public void setDateOfBirth(LocalDate dateOfBirth) {this.dateOfBirth = dateOfBirth;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    public String getAddress() {return address;}
    public void setAddress(String address) {this.address = address;}

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

    public String getPhoneNumber() {return phoneNumber;}
    public void setPhoneNumber(String phoneNumber) {this.phoneNumber = phoneNumber;}
    public List<Comment> getComments() {return comments;}
    public void setComments(List<Comment> comments) {this.comments = comments;}


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Subscriber that = (Subscriber) o;

        if (!username.equals(that.username)) return false;
        return password.equals(that.password);
    }

}

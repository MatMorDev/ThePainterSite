package school.digitazon.thePainter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "services")
public class Service {
    /* fields */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String img;
    @NotBlank
    private String title;
    @NotBlank
    @Column(columnDefinition="TEXT")
    private String description;
    @Min(value = 0, message = "Price should not be less than 0")
    private BigDecimal price;
    @Min(value = 1, message = "Rate should not be less than 1")
    @Max(value = 5, message = "Rate should not be greater than 5")
    private int rate;

    @ManyToMany(mappedBy = "service")
    @JsonIgnore
    private List<ServiceBought> serviceBought;
    /* constructors */
    public Service() {}

    /* getters & setters */

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public List<ServiceBought> getServiceBought() {
        return serviceBought;
    }

    public void setServiceBought(List<ServiceBought> serviceBought) {
        this.serviceBought = serviceBought;
    }


}

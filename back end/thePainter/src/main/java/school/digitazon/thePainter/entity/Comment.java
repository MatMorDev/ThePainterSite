package school.digitazon.thePainter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "comments")
public class Comment {

    /* fields */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank
    @Column(columnDefinition="TEXT")
    private String content;
    @ManyToOne
    @JoinColumn(name = "subscriber_id", nullable = false)
    @JsonIgnore
    private Subscriber subscriber;
    @ManyToOne
    @JoinColumn(name="fk_article")
    @JsonIgnore
    private Article article;

    /* constructors */
    public Comment() {}

    /* getters & setters*/
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}
    public Subscriber getSubscriber() {return subscriber;}
    public void setSubscriber(Subscriber subscriber) {this.subscriber = subscriber;}
    public Article getArticle() {return article;}
    public void setArticle(Article article) {this.article = article;}
}

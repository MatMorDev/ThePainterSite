package school.digitazon.thePainter.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "faqs")
public class FrequentlyAskedQuestion {

    /* fields */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank
    private String question;
    @NotBlank
    @Column(columnDefinition="TEXT")
    private String answer;

    /* constructors */
    public FrequentlyAskedQuestion() {}

    /* getters & setters*/
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getQuestion() {return question;}
    public void setQuestion(String question) {this.question = question;}
    public String getAnswer() {return answer;}
    public void setAnswer(String answer) {this.answer = answer;}

}

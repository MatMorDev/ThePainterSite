package school.digitazon.thePainter.DTO;

import school.digitazon.thePainter.entity.Comment;

import java.util.List;

// classe DataTransferObject è la mia classe di appoggio per trasferire
// solo i campi che mi interessano per determinati endpoint (mostrare ai subscribers solo riferimenti generici)
public class SubscriberDTO {
    /* fields */
    private int id;
    private String username;
    private List<Comment> comments;

    /* constructor */
    public SubscriberDTO(int id, String username, List<Comment> comments) {
        this.username = username;
        this.comments = comments;
        this.id = id;
    }
    /* getters & setters*/

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public List<Comment> getComments() {return comments;}
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}

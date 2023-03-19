package school.digitazon.thePainter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import school.digitazon.thePainter.repository.CommentRepository;

@CrossOrigin
@RestController
@RequestMapping("/blog/comments")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    // http://localhost:8080/blog/comments/delete/4
    // DELETE endpoint per eliminare un comment per id
    @DeleteMapping("/admin/delete/{id}")
    public void deleteComment(@PathVariable Integer id) {
        if (commentRepository.existsById(id)) {
            // elimino il comment preso per id
            commentRepository.deleteById(id);
        } else {
            // se non trovo il comment con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Comment with id " + id + " not found");
        }
    }

}

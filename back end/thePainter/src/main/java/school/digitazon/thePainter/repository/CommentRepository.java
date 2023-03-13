package school.digitazon.thePainter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import school.digitazon.thePainter.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}

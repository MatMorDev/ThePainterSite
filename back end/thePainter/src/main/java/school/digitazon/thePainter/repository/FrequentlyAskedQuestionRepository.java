package school.digitazon.thePainter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import school.digitazon.thePainter.entity.FrequentlyAskedQuestion;

import java.util.List;

public interface FrequentlyAskedQuestionRepository extends JpaRepository<FrequentlyAskedQuestion, Integer> {

    List<FrequentlyAskedQuestion> findByQuestionContainsIgnoreCaseAndAnswerContainsIgnoreCase(String question, String answer);
    List<FrequentlyAskedQuestion> findByQuestionContainsIgnoreCase(String question);
    List<FrequentlyAskedQuestion> findByAnswerContainsIgnoreCase(String answer);
}

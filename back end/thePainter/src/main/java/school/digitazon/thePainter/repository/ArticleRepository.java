package school.digitazon.thePainter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import school.digitazon.thePainter.entity.Article;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    List<Article> findByCategoryContainsIgnoreCase(String category);
    List<Article> findByTitleContainsIgnoreCaseAndDescriptionContainsIgnoreCase(String title, String description);

    List<Article> findByTitleContainsIgnoreCase(String title);

    List<Article> findByDescriptionContainsIgnoreCase(String description);



}

package school.digitazon.thePainter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import school.digitazon.thePainter.entity.Service;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Integer> {
    List<Service> findByIdEquals(Integer id);

    List<Service> findByTitleContainsIgnoreCaseAndDescriptionContainsIgnoreCase(String title, String description);
    List<Service> findByTitleContainsIgnoreCase(String title);
    List<Service> findByDescriptionContainsIgnoreCase(String description);

}

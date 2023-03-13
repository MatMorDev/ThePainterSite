package school.digitazon.thePainter.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import school.digitazon.thePainter.entity.Subscriber;

public interface SubscriberRepository extends JpaRepository<Subscriber, Integer> {

    // scritture di Jpa per query custom di ricerca
    List<Subscriber> findByFirstNameContainsIgnoreCaseAndLastNameContainsIgnoreCase(String firstName, String LastName);
    List<Subscriber> findByFirstNameContainsIgnoreCase(String firstName);
    List<Subscriber> findByLastNameContainsIgnoreCase(String lastName);

    Subscriber findByUsernameEquals(String username);
    List<Subscriber> findByUsernameContainsIgnoreCase(String username);

}

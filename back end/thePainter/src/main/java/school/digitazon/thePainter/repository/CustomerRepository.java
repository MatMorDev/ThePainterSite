package school.digitazon.thePainter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import school.digitazon.thePainter.entity.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    // scritture di Jpa per query custom di ricerca
    List<Customer> findByFirstNameContainsIgnoreCaseAndLastNameContainsIgnoreCase(String firstName, String LastName);
    List<Customer> findByFirstNameContainsIgnoreCase(String firstName);
    List<Customer> findByLastNameContainsIgnoreCase(String lastName);
    List<Customer> findByIdEquals(int id);

    Optional<Customer> findByEmailEquals(String email);


}

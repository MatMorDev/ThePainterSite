package school.digitazon.thePainter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import school.digitazon.thePainter.entity.ServiceBought;

import java.util.List;

public interface ServiceBoughtRepository extends JpaRepository<ServiceBought, Integer> {

List<ServiceBought> findByServiceEquals(int id);

}

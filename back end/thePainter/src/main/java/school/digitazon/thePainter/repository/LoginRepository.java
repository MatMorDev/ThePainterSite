package school.digitazon.thePainter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import school.digitazon.thePainter.entity.Login;

public interface LoginRepository extends JpaRepository<Login, Integer> {
}

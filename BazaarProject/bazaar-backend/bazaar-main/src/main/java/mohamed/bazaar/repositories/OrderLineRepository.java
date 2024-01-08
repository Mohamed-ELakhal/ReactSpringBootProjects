package mohamed.bazaar.repositories;

import mohamed.bazaar.domain.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Mohamed Magdy
 */
public interface OrderLineRepository extends JpaRepository<OrderLine, Long> {
}

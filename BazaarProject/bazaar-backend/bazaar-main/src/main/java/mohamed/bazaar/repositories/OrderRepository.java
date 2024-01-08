package mohamed.bazaar.repositories;

import mohamed.bazaar.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Mohamed Magdy
 */

public interface OrderRepository extends JpaRepository<Order, Long> {
}

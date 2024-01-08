package mohamed.bazaar.services;

import mohamed.bazaar.domain.Order;

import java.util.Optional;

/**
 * @author Mohamed Magdy
 */
public interface OrderService {
    Optional<Order> findById(Long id);
    Order saveOrder(Order order);
}

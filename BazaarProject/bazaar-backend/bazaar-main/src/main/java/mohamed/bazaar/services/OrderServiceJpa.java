package mohamed.bazaar.services;

import lombok.RequiredArgsConstructor;
import mohamed.bazaar.domain.Order;
import mohamed.bazaar.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Mohamed Magdy
 */
@Service
@RequiredArgsConstructor
public class OrderServiceJpa implements OrderService{

    private final OrderRepository orderRepository;

    @Override
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}

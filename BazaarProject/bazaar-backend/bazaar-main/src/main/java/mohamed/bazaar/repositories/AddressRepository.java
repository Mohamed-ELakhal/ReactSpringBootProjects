package mohamed.bazaar.repositories;

import mohamed.bazaar.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Mohamed Magdy
 */
public interface AddressRepository extends JpaRepository<Address, Long> {
}

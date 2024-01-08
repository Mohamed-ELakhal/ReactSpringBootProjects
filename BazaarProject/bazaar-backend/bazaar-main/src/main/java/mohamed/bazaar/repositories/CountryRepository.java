package mohamed.bazaar.repositories;

import mohamed.bazaar.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Mohamed Magdy
 */
public interface CountryRepository extends JpaRepository<Country, Integer> {
}

package mohamed.bazaar.repositories;

import mohamed.bazaar.domain.Country;
import mohamed.bazaar.domain.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Mohamed Magdy
 */
@Repository
public interface StateRepository extends JpaRepository<State, Integer> {
    List<State> findAllByCountry(Country country);
    List<State> findAllByCountry_Id(Integer countryId);
}

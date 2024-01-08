package mohamed.bazaar.repositories;

import mohamed.bazaar.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Mohamed Magdy
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNameIsLikeIgnoreCase(String name);
}

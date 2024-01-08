package mohamed.bazaar.repositories;

import mohamed.bazaar.domain.Category;
import mohamed.bazaar.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Mohamed Magdy
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAllByCategories(Category category, Pageable pageable);
    Page<Product> findAllByCategories_Id(Long id, Pageable pageable);
    Page<Product> findAllByNameContainingIgnoreCase(String name, Pageable pageable);
}

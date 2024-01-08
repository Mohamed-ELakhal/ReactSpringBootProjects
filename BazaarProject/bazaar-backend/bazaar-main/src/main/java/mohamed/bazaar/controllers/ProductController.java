package mohamed.bazaar.controllers;

import lombok.RequiredArgsConstructor;
import mohamed.bazaar.domain.Product;
import mohamed.bazaar.exceptions.ProductNotFoundException;
import mohamed.bazaar.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

/**
 * @author Mohamed Magdy
 */
@RestController
@RequiredArgsConstructor
@RequestMapping
public class ProductController {

    public static final String PRODUCT_API = "/api/v1/products";
    public static final String PRODUCT_API_ID = "/api/v1/products/{id}";

    private final ProductService productService;
    @GetMapping(PRODUCT_API_ID)
    public ResponseEntity<Product> findProductById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(productService.findById(id).orElseThrow(() -> new ProductNotFoundException(id)));
    }
    @GetMapping(PRODUCT_API)
    public Page<Product> findAllProducts(
            @RequestParam(required = false) Integer pageNumber,
            @RequestParam(required = false) Integer pageSize,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String search
    ) {
        return productService.findAll(pageNumber, pageSize, categoryId, search);
    }

    @PostMapping(PRODUCT_API)
    public ResponseEntity<?> saveProduct(@RequestBody Product product) {
        Product savedProduct = productService.save(product);
        String location = PRODUCT_API +"/"+ savedProduct.getId();
        return ResponseEntity.created(URI.create(location)).build();
    }

    @PutMapping(PRODUCT_API_ID)
    public ResponseEntity<?> updateProduct(@PathVariable("id")  Long id, @RequestBody Product product) {
        if(productService.update(id, product).isPresent()) {
            return ResponseEntity.ok().build();
        }
        throw new ProductNotFoundException(id);
    }

    @DeleteMapping(PRODUCT_API_ID)
    public ResponseEntity<?> deleteProduct(@PathVariable("id")  Long id) {
        if(productService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        throw new ProductNotFoundException(id);
    }
}

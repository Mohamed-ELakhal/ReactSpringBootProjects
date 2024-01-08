package mohamed.bazaar.controllers;

import lombok.RequiredArgsConstructor;
import mohamed.bazaar.domain.Category;
import mohamed.bazaar.services.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Mohamed Magdy
 */
@RestController
@RequiredArgsConstructor
@RequestMapping
public class CategoryController {

    public static final String CATEGORY_API = "/api/v1/categories";
    private final CategoryService categoryService;
    @GetMapping(CATEGORY_API)
    public Page<Category> findAllCategories(
            @RequestParam(required = false) Integer pageNumber,
            @RequestParam(required = false) Integer pageSize
    ) {
        return categoryService.findAll(pageNumber, pageSize);
    }
}

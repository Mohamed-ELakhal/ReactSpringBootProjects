package mohamed.bazaar.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * @author Mohamed Magdy
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class OrderLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;

    private BigDecimal unitPrice;

    private Integer quantity;
}

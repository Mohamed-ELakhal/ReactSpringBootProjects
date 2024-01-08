package mohamed.bazaar.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Mohamed Magdy
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne()
    @JoinColumn(name = "country_id")
    private Country country;
}

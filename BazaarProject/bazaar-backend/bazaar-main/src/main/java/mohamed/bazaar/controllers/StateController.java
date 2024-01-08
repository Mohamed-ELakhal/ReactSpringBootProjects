package mohamed.bazaar.controllers;

import lombok.RequiredArgsConstructor;
import mohamed.bazaar.domain.State;
import mohamed.bazaar.repositories.StateRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Mohamed Magdy
 */
@RestController
@RequiredArgsConstructor
@RequestMapping
public class StateController {
    public static final String STATE_API = "/api/v1/states";
    public static final String STATE_API_ID = STATE_API + "/{countryId}";
    private final StateRepository stateRepository;
    @GetMapping(STATE_API_ID)
    public List<State> getStatesByCountry(@PathVariable Integer countryId) {
        return stateRepository.findAllByCountry_Id(countryId);
    }
}

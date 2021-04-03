package compliance.qualita.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LoginResponse {

    private Role role;
    private List<Feature> features;
    private String name;

}

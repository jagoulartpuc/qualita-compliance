package compliance.forumdapropriedade.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

@Data
@Document(collection = "person")
public class Person {

    @Id
    private String id;
    @NonNull
    private String name;
    @NonNull
    private String cpf;
    @NonNull
    private String schooling;
    @NonNull
    private String profession;
    private String occupation;
    private String password;
    @NonNull
    private String email;
    @NonNull
    private Company company;
    private String phone;
    @NonNull
    private String birthday;

}

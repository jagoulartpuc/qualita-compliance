package compliance.qualita.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

@Data
@Document(collection = "person")
public class Person {

    @Id
    private String cpf;
    @NonNull
    private String name;
    @NonNull
    private String schooling;
    @NonNull
    private String profession;
    private String occupation;
    private String password;
    @NonNull
    private String email;
    @NonNull
    private String companyCnpj;
    private String phone;
    @NonNull
    private String birthday;
    private boolean isAdmin;

}

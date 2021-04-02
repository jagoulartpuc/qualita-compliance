package compliance.qualita.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "company")
public class Company {

    @Id
    @NonNull
    private String cnpj;
    @NonNull
    private String name;
    private String password;
    @NonNull
    private String adress;
    @NonNull
    private List<String> phones;
    @NonNull
    private String email;
    @NonNull
    private String owner;
    @NonNull
    private String business;
    private String site;
    @JsonIgnoreProperties
    private List<Person> persons = new ArrayList<>();
    private List<Report> reports = new ArrayList<>();
    @NonNull
    private List<Feature> features;

}

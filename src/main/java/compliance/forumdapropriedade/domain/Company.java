package compliance.forumdapropriedade.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.util.List;

@Data
@Document(collection = "company")
public class Company {

    @Id
    private String companyId;
    @NonNull
    private String name;
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
    private List<Person> persons;
    private List<Report> reports;
    private List<String> features;
}

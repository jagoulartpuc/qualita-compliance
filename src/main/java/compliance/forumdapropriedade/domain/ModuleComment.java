package compliance.forumdapropriedade.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "comment")
public class ModuleComment {

    @Id
    private String id;
    private String comment;
    private String name;

}

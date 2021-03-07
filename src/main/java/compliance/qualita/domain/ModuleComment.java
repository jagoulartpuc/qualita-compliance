package compliance.qualita.domain;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "comment")
public class ModuleComment {

    @Id
    private String id;
    @NonNull
    private String comment;
    @NonNull
    private String name;

}

package compliance.qualita.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NonNull;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "module")
public class TrainingModule {

    @Id
    private String id;
    @NonNull
    private String title;
    private String description;
    @NonNull
    private String videoLink;
    @Transient
    private List<String> attachmentsAsBase64 = new ArrayList<>();
    @JsonIgnore
    private List<Binary> attachments = new ArrayList<>();
    private Map<String, List<ModuleComment>> comments = new HashMap<>();
    private List<String> validations = new ArrayList<>();
}

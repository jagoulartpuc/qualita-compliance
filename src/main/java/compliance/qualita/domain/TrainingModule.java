package compliance.qualita.domain;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Data
@Document(collection = "module")
public class TrainingModule {

    private String id;
    @NonNull
    private String title;
    private String description;
    @NonNull
    private String videoLink;
    private List<Attachment> attachments = new ArrayList<>();
    private Map<String, List<ModuleComment>> comments = new HashMap<>();
    private Set<String> validations = new HashSet<>();
    private boolean validated = false;
}

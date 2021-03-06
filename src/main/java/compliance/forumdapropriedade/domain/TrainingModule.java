package compliance.forumdapropriedade.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
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
    private String title;
    private String description;
    private String videoLink;
    private List<byte[]> attachments = new ArrayList<>();
    private Map<String, List<ModuleComment>> comments = new HashMap<>();
}

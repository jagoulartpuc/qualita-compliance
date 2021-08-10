package compliance.qualita.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Document(collection = "report")
public class Report {

    @Id
    private String trackingId;
    private String author;
    private String cpf;
    private String email;
    private String phone;
    @NonNull
    private String companyName;
    @NonNull
    private String local;
    @NonNull
    private String category;
    @NonNull
    private List<String> dates = new ArrayList<>();
    @NonNull
    private boolean urgent;
    @NonNull
    private boolean isManagerKnowledge;
    @NonNull
    private String description;
    private Set<String> sharedWith = new HashSet<>();
    private ReportDetails reportDetails;
    private List<Attachment> attachments;
    private String status;
    private ReportAnswer answerToInformer;

}

package compliance.qualita.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

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
    private String category;
    @NonNull
    private boolean urgent;
    @NonNull
    private String description;
    private List<String> envolvedPeople = new ArrayList<>();
    private List<String> dates = new ArrayList<>();
    private List<byte[]> attachments = new ArrayList<>();
    private List<ReportAnswer> reportAnswers;
    private ReportAnswer answerToInformer;
}

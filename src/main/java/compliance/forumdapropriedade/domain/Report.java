package compliance.forumdapropriedade.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

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
    private List<String> envolvedPeople;
    private List<String> dates;
    private List<byte[]> attachments;
    private List<ReportAnswer> reportAnswers;
    private ReportAnswer answerToInformer;
}

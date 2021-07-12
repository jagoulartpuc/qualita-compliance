package compliance.qualita.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Transient;

import java.util.ArrayList;
import java.util.List;

@Data
public class ReportAnswer {

    private String message;
    @Transient
    private List<String> attachmentsAsBase64 = new ArrayList<>();
    @JsonIgnore
    private List<Binary> attachments = new ArrayList<>();

}

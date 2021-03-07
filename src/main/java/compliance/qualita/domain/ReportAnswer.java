package compliance.qualita.domain;

import lombok.Data;

import java.util.List;

@Data
public class ReportAnswer {

    private String message;
    private List<byte[]> attachment;

}

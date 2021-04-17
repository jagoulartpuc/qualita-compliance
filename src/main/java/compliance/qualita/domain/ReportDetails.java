package compliance.qualita.domain;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ReportDetails {

    private String period;
    private List<String> envolvedPeople = new ArrayList<>();
    private List<String> suspects;
    private List<String> witnesses;

}

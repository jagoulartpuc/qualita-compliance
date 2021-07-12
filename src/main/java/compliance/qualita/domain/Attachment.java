package compliance.qualita.domain;

import lombok.Data;
import org.bson.types.Binary;

@Data
public class Attachment {

    private String name;
    private String base64adress;
    private Binary binaryAdress;
}

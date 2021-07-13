package compliance.qualita.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Transient;

@Data
public class Attachment {

    private String name;
    @Transient
    private String base64Adress;
    @JsonIgnore
    private Binary binaryAdress;
    private String mimeType;
}

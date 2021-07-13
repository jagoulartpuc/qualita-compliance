package compliance.qualita.util;

import compliance.qualita.domain.Attachment;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AttachmentsConverter {

    public List<Attachment> fromBase64(List<Attachment> attachments) {
        return attachments
                .parallelStream()
                .peek(attach -> attach.setBinaryAdress(new Binary(BsonBinarySubType.BINARY, Base64.getDecoder().decode(attach.getBase64Adress()))))
                .collect(Collectors.toList());
    }

    public List<Attachment> fromBinary(List<Attachment> attachments) {
        return attachments
                .parallelStream()
                .peek(attach -> attach.setBase64Adress(new String(Base64.getEncoder().encode(attach.getBinaryAdress().getData()))))
                .collect(Collectors.toList());
    }
}

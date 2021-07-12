package compliance.qualita.util;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AttachmentsConverter {

    public List<Binary> fromBase64(List<String> attachmentsAsBase64) {
        return attachmentsAsBase64
                .parallelStream()
                .map(attach64 -> new Binary(BsonBinarySubType.BINARY, Base64.getDecoder().decode(attach64)))
                .collect(Collectors.toList());
    }

    public List<String> fromBinary(List<Binary> attachmentsAsBinary) {
        return attachmentsAsBinary
                .parallelStream()
                .map(attachBinary -> new String(Base64.getEncoder().encode(attachBinary.getData())))
                .collect(Collectors.toList());
    }
}

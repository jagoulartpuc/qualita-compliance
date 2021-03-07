package compliance.qualita.util;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class AttachmentsUploader {

    public List<byte[]> uploadFiles(List<MultipartFile> files) throws IOException {
        List<byte[]> filesBytes = new ArrayList<>();
        for (MultipartFile file: files) {
            filesBytes.add(uploadFile(file));
        }
        return filesBytes;
    }

    public byte[] uploadFile(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        Path path = Paths.get(Objects.requireNonNull(file.getOriginalFilename()));
        Files.write(path, bytes);

        return bytes;
    }
}

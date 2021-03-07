package compliance.qualita.service;

import compliance.qualita.domain.ModuleComment;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.repository.ModuleCommentRepository;
import compliance.qualita.repository.TrainingModuleRepository;
import compliance.qualita.util.AttachmentsUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static java.util.Arrays.asList;

@Service
public class TrainingModuleService {

    @Autowired
    private TrainingModuleRepository moduleRepository;

    @Autowired
    private AttachmentsUploader attachmentsUploader;

    @Autowired
    private ModuleCommentRepository commentRepository;

    public TrainingModule addTrainingModule(TrainingModule trainingModule) {
        return moduleRepository.insert(trainingModule);
    }

    public TrainingModule addTrainingModuleWithAttachments(TrainingModule trainingModule, List<MultipartFile> files) throws IOException {
        trainingModule.setAttachments(attachmentsUploader.uploadFiles(files));
        return moduleRepository.insert(trainingModule);
    }

    public TrainingModule editTrainingModule(TrainingModule trainingModule) {
        return moduleRepository.save(trainingModule);
    }

    public TrainingModule putAttachmentToTrainingModule(String trainingModuleId, MultipartFile file) throws IOException {
        TrainingModule trainingModule = getTrainingModuleById(trainingModuleId);
        trainingModule.getAttachments().add(attachmentsUploader.uploadFile(file));
        return moduleRepository.save(trainingModule);
    }

    public List<TrainingModule> getTrainingModules() {
        return moduleRepository.findAll();
    }

    public TrainingModule getTrainingModuleById(String id) {
        return moduleRepository.findById(id).orElseThrow();
    }

    public boolean deleteTrainingModule(String id) {
        moduleRepository.deleteById(id);
        return true;
    }

    public TrainingModule commentModule(String trainingModuleId, ModuleComment moduleComment) {
        TrainingModule trainingModule = getTrainingModuleById(trainingModuleId);
        ModuleComment moduleCommentSaved = commentRepository.insert(moduleComment);
        trainingModule.getComments().put(moduleCommentSaved.getId(), asList(moduleCommentSaved));
        return editTrainingModule(trainingModule);
    }

    public TrainingModule answerCommentModule(String trainingModuleId, ModuleComment commentAnswer, String commentId) {
        TrainingModule trainingModule = getTrainingModuleById(trainingModuleId);
        trainingModule.getComments().get(commentId).add(commentAnswer);
        return editTrainingModule(trainingModule);
    }
}

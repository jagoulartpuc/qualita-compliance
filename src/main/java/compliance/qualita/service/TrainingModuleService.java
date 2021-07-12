package compliance.qualita.service;

import compliance.qualita.domain.ModuleComment;
import compliance.qualita.domain.Person;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.repository.ModuleCommentRepository;
import compliance.qualita.repository.TrainingModuleRepository;
import compliance.qualita.util.AttachmentsConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static java.util.Arrays.asList;

@Service
public class TrainingModuleService {

    @Autowired
    private TrainingModuleRepository moduleRepository;

    @Autowired
    private AttachmentsConverter attachmentsConverter;

    @Autowired
    private ModuleCommentRepository commentRepository;

    @Autowired
    private PersonService personService;

    public TrainingModule addTrainingModule(TrainingModule trainingModule) {
        if (!CollectionUtils.isEmpty(trainingModule.getAttachmentsAsBase64())) {
            trainingModule.setAttachments(attachmentsConverter.fromBase64(trainingModule.getAttachmentsAsBase64()));
        }
        return moduleRepository.insert(trainingModule);
    }

    public TrainingModule editTrainingModule(TrainingModule trainingModule) {
        return moduleRepository.save(trainingModule);
    }

    public TrainingModule putAttachmentToTrainingModule(String trainingModuleId, List<String> attachments) {
        TrainingModule trainingModule = getTrainingModuleById(trainingModuleId);
        trainingModule.getAttachments().addAll(attachmentsConverter.fromBase64(attachments));
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

    public boolean isValidatedFromPersonCompany(String moduleId, String cpf) {
        return getTrainingModuleById(moduleId).getValidations().contains(personService.getPersonByCPF(cpf).getCompanyCnpj());
    }
}

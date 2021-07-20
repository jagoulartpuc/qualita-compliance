package compliance.qualita.service;

import compliance.qualita.domain.Attachment;
import compliance.qualita.domain.Company;
import compliance.qualita.domain.ModuleComment;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.repository.ModuleCommentRepository;
import compliance.qualita.repository.TrainingModuleRepository;
import compliance.qualita.util.AttachmentsConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

import static java.util.Arrays.asList;
import static java.util.stream.Collectors.toList;

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

    @Autowired
    private CompanyService companyService;

    public TrainingModule addTrainingModule(TrainingModule trainingModule) {
        if (!CollectionUtils.isEmpty(trainingModule.getAttachments())) {
            attachmentsConverter.fromBase64(trainingModule.getAttachments());
        }
        return moduleRepository.insert(trainingModule);
    }

    public TrainingModule editTrainingModule(TrainingModule trainingModule) {
        return moduleRepository.save(trainingModule);
    }

    public TrainingModule putAttachmentToTrainingModule(String trainingModuleId, List<Attachment> attachments) {
        TrainingModule trainingModule = getTrainingModuleById(trainingModuleId);
        trainingModule.getAttachments().addAll(attachmentsConverter.fromBase64(attachments));
        return moduleRepository.save(trainingModule);
    }

    public List<TrainingModule> getTrainingModules(String cpf) {
        if (cpf != null) {
            return getTrainingModulesByCpf(cpf);
        }
        return moduleRepository.findAll();
    }

    public TrainingModule getTrainingModuleById(String id) {
        TrainingModule trainingModule = moduleRepository.findById(id).orElseThrow();
        attachmentsConverter.fromBinary(trainingModule.getAttachments());
        return trainingModule;
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

    private List<TrainingModule> getTrainingModulesByCpf(String cpf) {
        return moduleRepository.findAll()
                .stream()
                .peek(mod -> mod.setValidated(mod.getValidations().contains(personService.getPersonByCPF(cpf).getCompanyCnpj())))
                .collect(toList());

    }
}

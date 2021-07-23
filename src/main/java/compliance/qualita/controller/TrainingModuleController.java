package compliance.qualita.controller;

import compliance.qualita.domain.Attachment;
import compliance.qualita.domain.ModuleComment;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.service.TrainingModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/modulos")
public class TrainingModuleController {

    @Autowired
    private TrainingModuleService moduleService;

    @PostMapping
    public TrainingModule postTrainingModule(
            @RequestBody TrainingModule trainingModule
    ) {
        return moduleService.addTrainingModule(trainingModule);
    }

    @GetMapping
    public List<TrainingModule> getAllTrainingModules(
            @RequestParam(required = false) String cpf,
            @RequestParam(required = false) String cnpj

    ) {
        return moduleService.getTrainingModules(cpf, cnpj);
    }

    @GetMapping("/{id}")
    public TrainingModule getTrainingModuleById(
            @PathVariable String id
    ) {
        return moduleService.getTrainingModuleById(id);
    }

    @PutMapping
    public TrainingModule editTrainingModule(
            @RequestBody TrainingModule trainingModule
    ) {
        return moduleService.editTrainingModule(trainingModule);
    }

    @PutMapping("/anexo")
    public TrainingModule putAttachmentsToTrainingModule(
            @RequestParam String trainingModuleId,
            @RequestBody List<Attachment> attachments
    ) {
        return moduleService.putAttachmentToTrainingModule(trainingModuleId, attachments);
    }

    @PutMapping("/comentario")
    public TrainingModule commentModule(
            @RequestParam String trainingModuleId,
            @RequestBody ModuleComment moduleComment
            ) {
        return moduleService.commentModule(trainingModuleId, moduleComment);
    }

    @PutMapping("/resposta-comentario")
    public TrainingModule answerCommentModule(
            @RequestParam String trainingModuleId,
            @RequestBody ModuleComment commentAnswer,
            @RequestParam String commentId
    ) {
        return moduleService.answerCommentModule(trainingModuleId, commentAnswer, commentId);
    }

    @DeleteMapping
    public boolean deleteTrainingModule(
            @RequestParam String id
    ) {
        return moduleService.deleteTrainingModule(id);
    }

}

package compliance.forumdapropriedade.controller;

import compliance.forumdapropriedade.domain.ModuleComment;
import compliance.forumdapropriedade.domain.TrainingModule;
import compliance.forumdapropriedade.service.TrainingModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
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

    @PostMapping("/com-anexo")
    public TrainingModule postTrainingModuleWithAttachments(
            @RequestBody TrainingModule trainingModule,
            @RequestPart("files") List<MultipartFile> files
    ) throws IOException {
        return moduleService.addTrainingModuleWithAttachments(trainingModule, files);
    }

    @GetMapping
    public List<TrainingModule> getAllTrainingModules() {
        return moduleService.getTrainingModules();
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
    public TrainingModule putAttachmentToTrainingModule(
            @RequestParam String trainingModuleId,
            @RequestPart("file") MultipartFile file
    ) throws IOException {
        return moduleService.putAttachmentToTrainingModule(trainingModuleId, file);
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

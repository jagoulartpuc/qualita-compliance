package compliance.forumdapropriedade.controller;

import compliance.forumdapropriedade.domain.Company;
import compliance.forumdapropriedade.domain.Person;
import compliance.forumdapropriedade.domain.Report;
import compliance.forumdapropriedade.domain.ReportAnswer;
import compliance.forumdapropriedade.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/denuncia")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public Report postReport(
            @RequestBody Report report
    ) {
        return reportService.addReport(report);
    }

    @PostMapping("/com-anexo")
    public Report postReportWithAttachments(
            @RequestPart("files") List<MultipartFile> files,
            @RequestBody Report report
    ) throws IOException {

        return reportService.addReportWithAttachment(report, files);
    }

    @PutMapping("/encaminhamento")
    public List<Report> shareReportWithEnvolved(
            @RequestParam String cnpj,
            @RequestParam String trackingId,
            @RequestParam String moreDestinations
    ) {
        return reportService.shareReportWithEnvolved(cnpj, trackingId, moreDestinations);
    }

    @PutMapping("/encaminhamento/com-anexo")
    public List<Report> shareReportWithEnvolvedWithAttachments(
            @RequestParam String cnpj,
            @RequestParam String trackingId,
            @RequestParam String moreDestinations,
            @RequestPart("files") List<MultipartFile> files
    ) throws IOException {
        return reportService.shareReportWithEnvolvedWithAttachments(cnpj, trackingId, moreDestinations, files);
    }

    @PutMapping("/resposta-empresa")
    public Report answerCompanyReport(
            @RequestParam String trackingId,
            @RequestBody ReportAnswer answer
            ) {
        return reportService.answerCompanyReport(trackingId, answer);
    }

    @PutMapping("/resposta-empresa/com-anexo")
    public Report answerCompanyReportWithAttachments(
            @RequestParam String trackingId,
            @RequestBody ReportAnswer answer,
            @RequestPart("files") List<MultipartFile> files
    ) throws IOException {
        return reportService.answerCompanyReportWithAttachments(trackingId, answer, files);
    }

    @PutMapping("/resposta-informante")
    public Report answerInformerReport(
            @RequestParam String trackingId,
            @RequestBody ReportAnswer answer
    ) {
        return reportService.answerInformerReport(trackingId, answer);
    }

    @PutMapping("/resposta-informante/com-anexo")
    public Report answerInformerReportWithAttachments(
            @RequestParam String trackingId,
            @RequestBody ReportAnswer answer,
            @RequestPart("files") List<MultipartFile> files
    ) throws IOException {
        return reportService.answerInformerReportWithAttachments(trackingId, answer, files);
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getReports();
    }

    @DeleteMapping
    public boolean deleteReport(
            @RequestParam String trackingId
    ) {
        return reportService.deleteReport(trackingId);
    }
}

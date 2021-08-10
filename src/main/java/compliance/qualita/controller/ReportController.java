package compliance.qualita.controller;

import compliance.qualita.domain.Attachment;
import compliance.qualita.domain.Report;
import compliance.qualita.domain.ReportAnswer;
import compliance.qualita.service.ReportService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
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

    @PutMapping("/encaminhamento")
    public List<Report> shareReportWithEnvolved(
            @RequestParam String cnpj,
            @RequestParam String trackingId,
            @RequestParam(required = false) String moreDestinations,
            @RequestBody List<Attachment> attachments
    ) {
        return reportService.shareReportWithEnvolved(cnpj, trackingId, moreDestinations, attachments);
    }

    @PutMapping("/resposta-empresa")
    public Report answerCompanyReport(
            @RequestParam String trackingId,
            @RequestBody List<Attachment> attachments
            ) {
        return reportService.answerCompanyReport(trackingId, attachments);
    }

    @PutMapping("/resposta-informante")
    public Report answerInformerReport(
            @RequestParam String trackingId,
            @RequestBody ReportAnswer answer
    ) {
        return reportService.answerInformerReport(trackingId, answer);
    }

    @GetMapping
    public List<Report> getAllReports(
    ) {
        return reportService.getReports();
    }

    @GetMapping("/filtro")
    public Page<Report> getAllFilteredReports(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String urgent,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return reportService.filterReports(category, date, urgent, PageRequest.of(page, size));
    }

    @GetMapping("/{trackingId}")
    public Report getReportById(
            @PathVariable String trackingId
    ) {
        return reportService.getReportByTrackingId(trackingId);
    }

    @DeleteMapping("/{trackingId}")
    public boolean deleteReport(
            @PathVariable String trackingId
    ) {
        return reportService.deleteReport(trackingId);
    }
}

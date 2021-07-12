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
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/denuncia")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public Report postReport(
            @RequestBody Report report
    ) throws MessagingException {
        return reportService.addReport(report);
    }

    @PutMapping("/encaminhamento")
    public List<Report> shareReportWithEnvolved(
            @RequestParam String cnpj,
            @RequestParam String trackingId,
            @RequestParam String moreDestinations,
            @RequestParam List<Attachment> attachments
    ) throws MessagingException {
        return reportService.shareReportWithEnvolved(cnpj, trackingId, moreDestinations, attachments);
    }

    @PutMapping("/resposta-empresa")
    public Report answerCompanyReport(
            @RequestParam String trackingId,
            @RequestParam List<Attachment> attachments
            ) throws MessagingException {
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
    public Page<Report> getAllReports(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return reportService.getReports(PageRequest.of(page, size));
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

    @DeleteMapping
    public boolean deleteReport(
            @RequestParam String trackingId
    ) {
        return reportService.deleteReport(trackingId);
    }
}

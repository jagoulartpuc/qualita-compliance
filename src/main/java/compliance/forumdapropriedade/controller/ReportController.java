package compliance.forumdapropriedade.controller;

import compliance.forumdapropriedade.domain.Company;
import compliance.forumdapropriedade.domain.Person;
import compliance.forumdapropriedade.domain.Report;
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

    @PostMapping
    public Report postReportWithAttachments(
            @RequestPart("files") List<MultipartFile> files,
            @RequestBody Report report
    ) throws IOException {

        return reportService.addReportWithAttachment(report, files);
    }

    @PutMapping
    public List<Report> shareReportWithEnvolved(
            @RequestParam String cnpj,
            @RequestParam String trackingId,
            @RequestParam String moreDestinations
    ) {
        return reportService.shareReportWithEnvolved(cnpj, trackingId, moreDestinations);
    }

    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getReports();
    }

    @DeleteMapping
    public boolean deletePerson(
            @RequestParam String trackingId
    ) {
        return reportService.deleteReport(trackingId);
    }
}

package compliance.forumdapropriedade.service;

import compliance.forumdapropriedade.domain.Company;
import compliance.forumdapropriedade.domain.Report;
import compliance.forumdapropriedade.domain.ReportAnswer;
import compliance.forumdapropriedade.repository.ReportRepository;
import compliance.forumdapropriedade.util.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EmailSender emailSender;

    public Report addReport(Report report) {
        emailSender.sendEmail("Denúncia recebida", "Uma nova denúncia foi recebida. Protocolo: " + report.getTrackingId(), "host@gmail.com");
        return reportRepository.insert(report);
    }

    public Report addReportWithAttachment(Report report, List<MultipartFile> files) throws IOException {
        report.setAttachments(uploadFiles(files));
        emailSender.sendEmail("Denúncia recebida", "Uma nova denúncia foi recebida. Protocolo: " + report.getTrackingId(), "host@gmail.com");
        return reportRepository.insert(report);
    }

    private List<byte[]> uploadFiles(List<MultipartFile> files)  throws IOException{
        List<byte[]> filesBytes = new ArrayList<>();
        for (MultipartFile file: files) {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(Objects.requireNonNull(file.getOriginalFilename()));
            Files.write(path, bytes);
            filesBytes.add(bytes);
        }
        return filesBytes;
    }

    public List<Report> shareReportWithEnvolved(String companyCNPJ, String trackingId, String moreDestinations) {
        Company company = companyService.getCompanyByCNPJ(companyCNPJ);
        company.getReports().add(getReportByTrackingId(trackingId));
        companyService.editCompany(company);
        emailSender.sendEmail("Denúncia encaminhada", "Uma nova denúncia foi encaminhada através do fórum da probidade. Protocolo: " + trackingId,
                company.getEmail() + moreDestinations);
        return company.getReports();
    }

    public List<Report> shareReportWithEnvolvedWithAttachments(String companyCNPJ, String trackingId, String moreDestinations, List<MultipartFile> files) throws IOException {
        Report report = getReportByTrackingId(trackingId);
        report.setAttachments(uploadFiles(files));
        Company company = companyService.getCompanyByCNPJ(companyCNPJ);
        company.getReports().add(report);
        companyService.editCompany(company);
        emailSender.sendEmail("Denúncia encaminhada", "Uma nova denúncia foi encaminhada através do fórum da probidade. Protocolo: " + trackingId,
                company.getEmail() + moreDestinations);
        return company.getReports();
    }

    public Report answerCompanyReport(String trackingId, ReportAnswer answer) {
        Report report = getReportByTrackingId(trackingId);
        report.getReportAnswers().add(answer);
        return reportRepository.save(report);
    }

    public Report answerCompanyReportWithAttachments(String trackingId, ReportAnswer answer, List<MultipartFile> files) throws IOException {
        Report report = getReportByTrackingId(trackingId);
        report.setAttachments(uploadFiles(files));
        report.getReportAnswers().add(answer);
        return reportRepository.save(report);
    }

    public Report answerInformerReport(String trackingId, ReportAnswer answer) {
        Report report = getReportByTrackingId(trackingId);
        report.setAnswerToInformer(answer);
        return reportRepository.save(report);
    }

    public Report answerInformerReportWithAttachments(String trackingId, ReportAnswer answer, List<MultipartFile> files) throws IOException {
        Report report = getReportByTrackingId(trackingId);
        report.setAttachments(uploadFiles(files));
        report.setAnswerToInformer(answer);
        return reportRepository.save(report);
    }

    public List<Report> getReports() {
        return reportRepository.findAll();
    }

    public Report getReportByTrackingId(String trackingId) {
        return reportRepository.findById(trackingId).orElseThrow();
    }

    public boolean deleteReport(String trackingId) {
        reportRepository.deleteById(trackingId);
        return true;
    }
}

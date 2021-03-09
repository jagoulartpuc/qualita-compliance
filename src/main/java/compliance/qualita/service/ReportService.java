package compliance.qualita.service;

import compliance.qualita.domain.Company;
import compliance.qualita.domain.Report;
import compliance.qualita.domain.ReportAnswer;
import compliance.qualita.repository.ReportRepository;
import compliance.qualita.util.AttachmentsUploader;
import compliance.qualita.util.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private AttachmentsUploader attachmentsUploader;

    @Value("${admin.email}")
    private String adminEmail;

    public Report addReport(Report report) throws MessagingException {
        String trackingId = reportRepository.insert(report).getTrackingId();
        emailSender.sendEmail("Denúncia recebida", "Uma nova denúncia foi recebida. Protocolo: " + trackingId, adminEmail);
        return report;
    }

    public Report addReportWithAttachment(Report report, List<MultipartFile> files) throws IOException, MessagingException {
        report.setAttachments(attachmentsUploader.uploadFiles(files));
        String trackingId = reportRepository.insert(report).getTrackingId();
        emailSender.sendEmail("Denúncia recebida", "Uma nova denúncia foi recebida. Protocolo: " + trackingId, adminEmail);
        return report;
    }

    public List<Report> shareReportWithEnvolved(String companyCNPJ, String trackingId, String moreDestinations) throws MessagingException {
        Company company = companyService.getCompanyByCNPJ(companyCNPJ);
        company.getReports().add(getReportByTrackingId(trackingId));
        companyService.editCompany(company);
        emailSender.sendEmail("Denúncia encaminhada", "Uma nova denúncia foi encaminhada através do Qualitá Compliance. Protocolo: " + trackingId,
                company.getEmail() + moreDestinations);
        return company.getReports();
    }

    public List<Report> shareReportWithEnvolvedWithAttachments(String companyCNPJ, String trackingId, String moreDestinations, List<MultipartFile> files) throws IOException, MessagingException {
        Report report = getReportByTrackingId(trackingId);
        report.setAttachments(attachmentsUploader.uploadFiles(files));
        Company company = companyService.getCompanyByCNPJ(companyCNPJ);
        company.getReports().add(report);
        companyService.editCompany(company);
        emailSender.sendEmail("Denúncia encaminhada", "Uma nova denúncia foi encaminhada através do Qualitá Compliance. Protocolo: " + trackingId,
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
        report.setAttachments(attachmentsUploader.uploadFiles(files));
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
        report.setAttachments(attachmentsUploader.uploadFiles(files));
        report.setAnswerToInformer(answer);
        return reportRepository.save(report);
    }

    public Page<Report> getReports(Pageable pageable) {
        return reportRepository.findAll(pageable);
    }

    public Page<Report> filterReports(String category, String date, String urgent, Pageable pageable) {
        List<Report> filteredReports = new ArrayList<>();
        List<Report> reports = reportRepository.findAll();

        for (Report report: reports) {
            if (urgent != null && category != null && !report.getDates().isEmpty() && date != null) {
                if (report.isUrgent() && report.getCategory().equals(category) && report.getDates().get(0).equals(date)) {
                    filteredReports.add(report);
                }
            } else if (urgent != null && category != null) {
                if (report.isUrgent() && report.getCategory().equals(category)) {
                    filteredReports.add(report);
                }
            } else if (category != null && !report.getDates().isEmpty() && date != null) {
                if (report.getCategory().equals(category) && report.getDates().get(0).equals(date)) {
                    filteredReports.add(report);
                }
            } else if (urgent != null && !report.getDates().isEmpty() && date != null) {
                if (report.isUrgent() && report.getDates().get(0).equals(date)) {
                    filteredReports.add(report);
                }
            } else if (urgent != null && date == null) {
                if (report.isUrgent()) {
                    filteredReports.add(report);
                }
            } else if (!report.getDates().isEmpty() && date != null && urgent == null && category == null) {
                if (report.getDates().get(0).equals(date)) {
                    filteredReports.add(report);
                }
            } else if (category != null && date == null) {
                if (report.getCategory().equals(category)) {
                    filteredReports.add(report);
                }
            }
        }
        return new PageImpl<>(filteredReports, pageable, filteredReports.size());
    }

    public Report getReportByTrackingId(String trackingId) {
        return reportRepository.findById(trackingId).orElseThrow();
    }

    public boolean deleteReport(String trackingId) {
        reportRepository.deleteById(trackingId);
        return true;
    }
}

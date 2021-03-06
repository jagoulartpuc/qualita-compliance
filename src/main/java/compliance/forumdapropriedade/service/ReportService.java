package compliance.forumdapropriedade.service;

import compliance.forumdapropriedade.domain.Company;
import compliance.forumdapropriedade.domain.Report;
import compliance.forumdapropriedade.domain.ReportAnswer;
import compliance.forumdapropriedade.repository.ReportRepository;
import compliance.forumdapropriedade.util.AttachmentsUploader;
import compliance.forumdapropriedade.util.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.ArrayOperators.Filter.filter;
import static org.springframework.data.mongodb.core.aggregation.ComparisonOperators.valueOf;

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
        emailSender.sendEmail("Denúncia encaminhada", "Uma nova denúncia foi encaminhada através do fórum da probidade. Protocolo: " + trackingId,
                company.getEmail() + moreDestinations);
        return company.getReports();
    }

    public List<Report> shareReportWithEnvolvedWithAttachments(String companyCNPJ, String trackingId, String moreDestinations, List<MultipartFile> files) throws IOException, MessagingException {
        Report report = getReportByTrackingId(trackingId);
        report.setAttachments(attachmentsUploader.uploadFiles(files));
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

    //TODO
    public Page<Report> filterReports(String category, String date, String urgent, Pageable pageable) {
        //List<Report> filteredReports = new ArrayList<>();
        List<Report> reports = reportRepository.findAll();

        Predicate<Report> urgency = Report::isUrgent;
        Predicate<Report> byCategory = r -> r.getCategory().equals(category);
        Predicate<Report> byDate = r -> r.getDates().get(0).equals(date);

        if (urgent != null) {
            reports.stream().filter(urgency).collect(Collectors.toList());
            if (category != null) {
                reports.stream().filter(byCategory).collect(Collectors.toList());
                if (date != null) {
                    reports.stream().filter(byDate).collect(Collectors.toList());
                }
            }
        }

        return new PageImpl<>(reports, pageable, reports.size());
    }

    public Report getReportByTrackingId(String trackingId) {
        return reportRepository.findById(trackingId).orElseThrow();
    }

    public boolean deleteReport(String trackingId) {
        reportRepository.deleteById(trackingId);
        return true;
    }
}

package compliance.qualita.service;

import compliance.qualita.domain.*;
import compliance.qualita.repository.ReportRepository;
import compliance.qualita.util.AttachmentsConverter;
import compliance.qualita.util.EmailSender;
import compliance.qualita.util.TemplateBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;


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
    private AttachmentsConverter attachmentsConverter;

    @Autowired
    private TemplateBuilder templateBuilder;

    @Value("${admin.email}")
    private String adminEmail;

    public Report addReport(Report report)  {
        if (!CollectionUtils.isEmpty(report.getAttachments())) {
            attachmentsConverter.fromBase64(report.getAttachments());
        }
        report.setStatus("RECEBIDA");
        String trackingId = reportRepository.insert(report).getTrackingId();
        Runnable runnable = () -> {
            try{
                emailSender.sendEmail("Denúncia recebida", templateBuilder.buildReportReceived(trackingId), adminEmail);
                System.out.println("E-mail has been sent");
            }catch (Exception e){
                e.printStackTrace();
                System.out.println("Thread has been finished:");
            }
        };

        new Thread(runnable).start();
        return report;
    }

    public Report shareReportWithEnvolved(String companyCNPJ, String trackingId, String moreDestinations, List<Attachment> attachments) {
        Company company = companyService.getCompanyByCNPJ(companyCNPJ);
        Report report = getReportByTrackingId(trackingId);
        report.setStatus("ENCAMINHADA");
        if (attachments != null) {
            report.getAttachments().addAll(attachmentsConverter.fromBase64(attachments));
        }
        report.getSharedWith().add(companyCNPJ);
        Report reportUpdated = reportRepository.save(report);
        String destinations = company.getEmail();
        if (moreDestinations != null) {
            destinations += moreDestinations;
        }

        String finalDestinations = destinations;
        Runnable runnable = () -> {
            try{
                emailSender.sendEmail("Denúncia encaminhada", templateBuilder.buildReportShared(trackingId), finalDestinations);
                System.out.println("E-mail has been sent");
            }catch (Exception e){
                e.printStackTrace();
                System.out.println("Thread has been finished:");
            }
        };

        new Thread(runnable).start();
        return reportUpdated;
    }

    public Report answerCompanyReport(String trackingId, List<Attachment> attachments) {
        Report report = getReportByTrackingId(trackingId);
        report.setStatus("EM ANÁLISE");

        if (attachments != null) {
            report.getAttachments().addAll(attachmentsConverter.fromBase64(attachments));
        }

        Runnable runnable = () -> {
            try{
                emailSender.sendEmail("Resposta de denúncia", templateBuilder.buildReportAnswered(trackingId), adminEmail);
                System.out.println("E-mail has been sent");
            } catch (Exception e){
                e.printStackTrace();
                System.out.println("Thread has been finished:");
            }
        };

        new Thread(runnable).start();
        return reportRepository.save(report);
    }

    public Report answerInformerReport(String trackingId, ReportAnswer answer) {
        Report report = getReportByTrackingId(trackingId);
        if (answer.getAttachments() != null) {
            attachmentsConverter.fromBase64(answer.getAttachments());
        }
        report.setAnswerToInformer(answer);
        report.setStatus("FINALIZADA");
        return reportRepository.save(report);
    }

    public List<Report> getReports() {
        return reportRepository.findAll();
    }

    public Page<Report> filterReports(String category, String date, String urgent, Pageable pageable) {
        List<Report> filteredReports = new ArrayList<>();
        List<Report> reports = reportRepository.findAll();

        for (Report report : reports) {
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

        Report report = reportRepository.findById(trackingId).orElseThrow();
        attachmentsConverter.fromBinary(report.getAttachments());
        return report;
    }

    public boolean deleteReport(String trackingId) {
        reportRepository.deleteById(trackingId);
        return true;
    }
}

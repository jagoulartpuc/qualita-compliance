package compliance.qualita.service;

import br.com.caelum.stella.validation.CNPJValidator;
import compliance.qualita.domain.Company;
import compliance.qualita.domain.Report;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.repository.CompanyRepository;
import compliance.qualita.util.EmailSender;
import compliance.qualita.util.PasswordGenerator;
import compliance.qualita.util.TemplateBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private PasswordGenerator passwordGenerator;

    @Autowired
    private TrainingModuleService moduleService;

    @Autowired
    private TemplateBuilder templateBuilder;

    @Autowired
    private ReportService reportService;

    public Company addCompany(Company company) throws Exception {
        CNPJValidator validator = new CNPJValidator();
        try {
            validator.assertValid(company.getCnpj());
            String password = passwordGenerator.generatePassword();
            emailSender.sendEmail("Qualitá Compliance: Registro e recebimento de senha",
                    templateBuilder.buildCompanyWelcomeTemplate(company.getName(), password), company.getEmail());
            company.setPassword(password);
            return companyRepository.insert(company);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public Company getCompanyByCNPJ(String cnpj) {
        return companyRepository.findById(cnpj).orElseThrow();
    }

    public List<Report> getCompanyReports(String cnpj) {
        return editCompany(getCompanyByCNPJ(cnpj))
                .getReports()
                .parallelStream()
                .map(Report::getTrackingId)
                .distinct()
                .map(id -> reportService.getReportByTrackingId(id))
                .filter(report -> !report.getStatus().equals("FINALIZADA"))
                .collect(Collectors.toList());
    }

    public List<Report> getCompanyReports2(String cnpj) {
        Company company = getCompanyByCNPJ(cnpj);
        List<Report> reports = company.getReports();
        for (int i = 0; i < reports.size(); i++) {
            for (int j = 0; j < reports.size(); j++) {
                if (i != j) {
                    if (reports.get(i).getTrackingId().equals(reports.get(j).getTrackingId())) {
                        reports.remove(reports.get(j));
                    }
                }
            }
            assert reports.get(i) != null;
            if (reports.get(i).getStatus().equals("FINALIZADA")) {
                reports.remove(reports.get(i));
            }
        }
        return editCompany(company).getReports();
    }

    public Company editCompany(Company company) {
        return companyRepository.save(company);
    }

    public List<Company> getCompanies() {
        return companyRepository.findAll();
    }

    public boolean deleteCompany(String cnpj) {
        companyRepository.deleteById(cnpj);
        return true;
    }

    public TrainingModule validateTrainingModule(String trainingModuleId, String companyCnpj) {
        TrainingModule module = moduleService.getTrainingModuleById(trainingModuleId);
        module.getValidations().add(companyCnpj);
        moduleService.editTrainingModule(module);
        return module;
    }

    public Company changePassword(String cnpj, String password) {
        Company company = getCompanyByCNPJ(cnpj);
        company.setPassword(password);
        return companyRepository.save(company);
    }
}

package compliance.qualita.controller;

import compliance.qualita.domain.Company;
import compliance.qualita.domain.Report;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.service.CompanyService;
import compliance.qualita.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/empresa")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ReportService reportService;

    @PostMapping
    public Company postCompany(
            @RequestBody Company company
    ) throws Exception {
        return companyService.addCompany(company);
    }

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getCompanies();
    }

    @GetMapping("/{cnpj}")
    public Company getCompanyByCNPJ(
            @PathVariable String cnpj
    ) {
        return companyService.getCompanyByCNPJ(cnpj);
    }

    @GetMapping("/{cnpj}/denuncias")
    public List<Report> getCompanyReports(
            @PathVariable String cnpj
    ) {
        return companyService.getCompanyByCNPJ(cnpj)
                .getReports()
                .stream()
                .map(Report::getTrackingId)
                .distinct()
                .map(id -> reportService.getReportByTrackingId(id))
                .filter(report -> !report.getStatus().equals("FINALIZADA"))
                .collect(Collectors.toList());
    }

    @PutMapping
    public Company editCompany(
            @RequestBody Company company
    ) {
        return companyService.editCompany(company);
    }

    @PatchMapping("/mudar-senha")
    public Company changePassword(
            @RequestParam String cnpj,
            @RequestParam String password
    ) {
        return companyService.changePassword(cnpj, password);
    }

    @DeleteMapping("/{cnpj}")
    public boolean deleteCompany(
            @PathVariable String cnpj
    ) {
        return companyService.deleteCompany(cnpj);
    }

    @PutMapping("/validacao")
    public TrainingModule validateTrainingModule(
            @RequestParam String moduleId,
            @RequestParam String cnpj
    ) {
        return companyService.validateTrainingModule(moduleId, cnpj);
    }
}

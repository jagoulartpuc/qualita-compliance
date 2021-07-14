package compliance.qualita.controller;

import compliance.qualita.domain.Company;
import compliance.qualita.domain.Report;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/empresa")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

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
        return companyService.getCompanyByCNPJ(cnpj).getReports();
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

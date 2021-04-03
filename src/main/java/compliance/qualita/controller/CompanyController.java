package compliance.qualita.controller;

import compliance.qualita.domain.Company;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
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
    ) throws MessagingException {
        return companyService.addCompany(company);
    }

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getCompanies();
    }

    @DeleteMapping
    public boolean deleteCompany(
            @RequestParam String cnpj
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

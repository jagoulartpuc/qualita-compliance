package compliance.qualita.service;

import br.com.caelum.stella.validation.CNPJValidator;
import br.com.caelum.stella.validation.InvalidStateException;
import compliance.qualita.domain.Company;
import compliance.qualita.domain.TrainingModule;
import compliance.qualita.repository.CompanyRepository;
import compliance.qualita.util.EmailSender;
import compliance.qualita.util.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.List;

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

    public Company addCompany(Company company) throws MessagingException {
        CNPJValidator validator = new CNPJValidator();
        try {
            validator.assertValid(company.getCnpj());
            String password = passwordGenerator.generatePassword();
            emailSender.sendEmail("Qualitá Compliance: Registro e recebimento de senha",
                    "Bem vindos ao Qualitá Compliance, equipe da " + company.getName() + "! Sua senha é: " + password + ".", company.getEmail());
            company.setPassword(password);
            return companyRepository.insert(company);
        } catch (InvalidStateException e) {
            throw new InvalidStateException(e.getInvalidMessages());
        }
    }

    public Company getCompanyByCNPJ(String cnpj) {
        return companyRepository.findById(cnpj).orElseThrow();
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
        Company company = getCompanyByCNPJ(companyCnpj);
        module.getValidations().add(company.getName());
        moduleService.editTrainingModule(module);
        return module;
    }
}

package compliance.forumdapropriedade.service;

import br.com.caelum.stella.validation.CNPJValidator;
import br.com.caelum.stella.validation.InvalidStateException;
import compliance.forumdapropriedade.domain.Company;
import compliance.forumdapropriedade.repository.CompanyRepository;
import compliance.forumdapropriedade.util.EmailSender;
import compliance.forumdapropriedade.util.PasswordGenerator;
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

    public Company addCompany(Company company) throws MessagingException {
        CNPJValidator validator = new CNPJValidator();
        try {
            validator.assertValid(company.getCnpj());
            String password = passwordGenerator.generatePassword();
            emailSender.sendEmail("Fórum da Probidade: Registro e recebimento de senha",
                    "Bem vindos ao Fórum da Probidade, equipe da " + company.getName() + "! Sua senha é: " + password + ".", company.getEmail());
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
}

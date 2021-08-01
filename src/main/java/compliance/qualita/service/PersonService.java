package compliance.qualita.service;

import br.com.caelum.stella.validation.CPFValidator;
import compliance.qualita.domain.*;
import compliance.qualita.repository.PersonRepository;
import compliance.qualita.util.EmailSender;
import compliance.qualita.util.PasswordGenerator;
import compliance.qualita.util.TemplateBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private PasswordGenerator passwordGenerator;

    @Autowired
    private TemplateBuilder templateBuilder;

    public Person addPerson(Person person) throws Exception {
        System.out.println("PERSON: " + person);
        CPFValidator validator = new CPFValidator();
        try {
            validator.assertValid(person.getCpf());
            String password = passwordGenerator.generatePassword();
            emailSender.sendEmail("Qualitá Compliance: Registro e recebimento de senha",
                    templateBuilder.buildPersonWelcomeTemplate(person.getName(), password), person.getEmail());
            person.setPassword(password);
            Person personPersisted = personRepository.insert(person);
            Company company = companyService.getCompanyByCNPJ(personPersisted.getCompanyCnpj());
            company.getPersons().add(personPersisted);
            companyService.editCompany(company);
            return personPersisted;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public Person getPersonByCPF(String cpf) {
        return personRepository.findById(cpf).orElseThrow();
    }

    public boolean deletePerson(String cpf) {
        personRepository.deleteById(cpf);
        return true;
    }

    public Person changePassword(String cpf, String password) {
        Person person = getPersonByCPF(cpf);
        person.setPassword(password);
        return personRepository.save(person);
    }

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }
}

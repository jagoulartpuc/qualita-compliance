package compliance.forumdapropriedade.service;

import br.com.caelum.stella.validation.CPFValidator;
import br.com.caelum.stella.validation.InvalidStateException;
import compliance.forumdapropriedade.domain.Person;
import compliance.forumdapropriedade.repository.PersonRepository;
import compliance.forumdapropriedade.util.EmailSender;
import compliance.forumdapropriedade.util.PasswordGenerator;
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

    public Person addPerson(Person person) {
        CPFValidator validator = new CPFValidator();
        try {
            validator.assertValid(person.getCpf());
            String password = passwordGenerator.generatePassword();
            emailSender.sendEmail("Fórum da Probidade: Registro e recebimento de senha",
                    "Bem vindo ao Fórum da Probidade " + person.getName() + "! Sua senha é: " + password + ".", person.getEmail());
            person.setPassword(password);
            return personRepository.insert(person);
        } catch (InvalidStateException e) {
            throw new InvalidStateException(e.getInvalidMessages());
        }
    }

    public Person getPersonByCPF(String cpf) {
        return personRepository.findById(cpf).orElseThrow();
    }

    public List<Person> getPersons() {
        return personRepository.findAll();
    }

    public boolean deletePerson(String cpf) {
        personRepository.deleteById(cpf);
        return true;
    }

    public boolean validadeLogin(String cpfOrCnpj, String password) {
        return getPersonByCPF(cpfOrCnpj).getPassword().equals(password) || companyService.getCompanyByCNPJ(cpfOrCnpj).getPassword().equals(password);
    }
}

package compliance.forumdapropriedade.service;

import br.com.caelum.stella.validation.CPFValidator;
import br.com.caelum.stella.validation.InvalidStateException;
import compliance.forumdapropriedade.domain.Person;
import compliance.forumdapropriedade.repository.PersonRepository;
import compliance.forumdapropriedade.util.EmailSender;
import compliance.forumdapropriedade.util.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private EmailSender emailSender;

    public Person addPerson(Person person) {
        CPFValidator validator = new CPFValidator();
        try {
            validator.assertValid(person.getCpf());
            String password = PasswordGenerator.generatePassword();
            emailSender.sendEmail("Fórum da Probidade: Registro e recebimento de senha",
                    "Bem vindo ao Fórum da Probidade " + person.getName() + "! Sua senha é: " + password + ".", person.getEmail());
            person.setPassword(password);
            return personRepository.save(person);
        } catch (InvalidStateException e) {
            throw new InvalidStateException(e.getInvalidMessages());
        }
    }

    public Person getPersonById(String id) {
        return personRepository.findById(id).orElseThrow();
    }

    public Iterable<Person> getPersons() {
        return personRepository.findAll();
    }

    public boolean deletePerson(String id) {
        personRepository.deleteById(id);
        return true;
    }
}

package compliance.forumdapropriedade.controller;

import compliance.forumdapropriedade.domain.Person;
import compliance.forumdapropriedade.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping("/funcionario")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping
    public Person postPerson(
            @RequestBody Person person
    ) throws MessagingException {
        return personService.addPerson(person);
    }

    @GetMapping
    public List<Person> getAllPersons() {
        return personService.getPersons();
    }

    @PutMapping("/mudar-senha")
    public Person changePassword(
            @RequestParam String cpf,
            @RequestParam String password
    ) {
        return personService.changePassword(cpf, password);
    }

    @DeleteMapping
    public boolean deletePerson(
            @RequestParam String cpf
    ) {
        return personService.deletePerson(cpf);
    }

    @GetMapping("/login")
    public boolean login(
            @RequestParam String cpfOrCnpj,
            @RequestParam String password
    ) {
        return personService.validadeLogin(cpfOrCnpj, password);
    }
}

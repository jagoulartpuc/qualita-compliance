package compliance.qualita.controller;

import compliance.qualita.domain.Person;
import compliance.qualita.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/funcionario")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping
    public Person postPerson(
            @RequestBody Person person
    ) throws Exception {
        return personService.addPerson(person);
    }

    @GetMapping
    public List<Person> getPersons(
    ) {
        return personService.getAllPersons();
    }

    @PutMapping("/mudar-senha")
    public Person changePassword(
            @RequestParam String cpf,
            @RequestParam String password
    ) {
        return personService.changePassword(cpf, password);
    }

    @DeleteMapping("/{cpf}")
    public boolean deletePerson(
            @PathVariable String cpf
    ) {
        return personService.deletePerson(cpf);
    }


}

package compliance.qualita.service;

import compliance.qualita.domain.Feature;
import compliance.qualita.domain.LoginResponse;
import compliance.qualita.domain.Role;
import compliance.qualita.exception.IncorrectPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class LoginService {

    @Autowired
    private PersonService personService;

    @Autowired
    private CompanyService companyService;

    public LoginResponse validateLogin(String cpfOrCnpj, String password) {
        if (isCnpj(cpfOrCnpj)) {
            return validateCnpjLogin(cpfOrCnpj, password);
        } else {
            return validateCpfLogin(cpfOrCnpj, password);
        }
    }

    private LoginResponse validateCpfLogin(String cpf, String password) {
        if (personService.getPersonByCPF(cpf).getPassword().equals(password)) {
            return createLoginResponse(cpf);
        } else {
            throw new IncorrectPasswordException();
        }
    }

    private LoginResponse validateCnpjLogin(String cnpj, String password) {
        if (companyService.getCompanyByCNPJ(cnpj).getPassword().equals(password)) {
            return createLoginResponse(cnpj);
        } else {
            throw new IncorrectPasswordException();
        }
    }


    private LoginResponse createLoginResponse(String cpfOrCnpj) {
        Role role;
        List<Feature> features;
        String name;
        if (isCnpj(cpfOrCnpj)) {
            role = Role.COMPANY;
            features = getFeaturesFromCompany(cpfOrCnpj);
            name = companyService.getCompanyByCNPJ(cpfOrCnpj).getName();
        } else {
            name = personService.getPersonByCPF(cpfOrCnpj).getName();
            if (personService.getPersonByCPF(cpfOrCnpj).isAdmin()) {
                role = Role.ADMIN;
                features = Collections.singletonList(Feature.ADMIN_FEATURES);
            } else {
                role = Role.PERSON;
                features = getFeaturesFromPerson(cpfOrCnpj);
            }
        }
        return new LoginResponse(role, features, name);
    }

    private List<Feature> getFeaturesFromPerson(String cpf) {
        return companyService.getCompanyByCNPJ(personService.getPersonByCPF(cpf).getCompanyCnpj()).getFeatures();
    }

    private List<Feature> getFeaturesFromCompany(String cnpj) {
        return companyService.getCompanyByCNPJ(cnpj).getFeatures();
    }

    private boolean isCnpj(String cpfOrCnpj) {
        return cpfOrCnpj.length() == 14;
    }
}

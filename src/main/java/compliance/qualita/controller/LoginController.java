package compliance.qualita.controller;

import compliance.qualita.domain.LoginResponse;
import compliance.qualita.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @GetMapping
    public LoginResponse login(
            @RequestParam String cpfOrCnpj,
            @RequestParam String password
    ) {
        return loginService.validateLogin(cpfOrCnpj, password);
    }
}

package compliance.qualita.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class PasswordGenerator {

    public String generatePassword() {
        Random random = new Random();
        String numbers = "0123456789";
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < 7; i++) {
            int randomDigit = random.nextInt(numbers.length());
            password.append(randomDigit);
        }
        return password.toString();
    }
}

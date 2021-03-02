package compliance.forumdapropriedade.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class PasswordGenerator {

    public static String generatePassword() {
        Random random = new Random();
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = random.nextInt(12 - 8) + 8;

        return random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
}

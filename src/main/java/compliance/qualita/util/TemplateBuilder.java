package compliance.qualita.util;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Scanner;

@Component
public class TemplateBuilder {

    private final String ROOT_PATH = "C:\\Users\\a\\Desktop\\projetos\\qualita-compliance\\src\\main\\resources\\templates\\";

    public String buildPersonWelcomeTemplate(String name, String password) throws FileNotFoundException {
        Locale locale = new Locale("pt", "BR");
        Scanner scanner = new Scanner(new File(ROOT_PATH + "personWelcome.html"), "ISO-8859-1");
        scanner.useLocale(locale);

        return scanner.useDelimiter("\\A")
                .next()
                .replace("PERSON_NAME", name)
                .replace("PERSON_PASSWORD", password);
    }

    public String buildCompanyWelcomeTemplate(String name, String password) throws FileNotFoundException {
        Locale locale = new Locale("pt", "BR");
        Scanner scanner = new Scanner(new File(ROOT_PATH + "companyWelcome.html"), "ISO-8859-1");
        scanner.useLocale(locale);

        return scanner.useDelimiter("\\A")
                .next()
                .replace("COMPANY_NAME", name)
                .replace("COMPANY_PASSWORD", password);
    }
}

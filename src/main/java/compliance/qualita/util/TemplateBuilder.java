package compliance.qualita.util;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Scanner;

@Component
public class TemplateBuilder {

    private final String ROOT_PATH = "src/main/resources/templates/";

    public String buildPersonWelcomeTemplate(String name, String password) throws IOException {
        Locale locale = new Locale("pt", "BR");
        Scanner scanner = new Scanner(new File(ROOT_PATH + "personWelcome.html"), StandardCharsets.ISO_8859_1);
        scanner.useLocale(locale);

        return scanner.useDelimiter("\\A")
                .next()
                .replace("PERSON_NAME", name)
                .replace("PERSON_PASSWORD", password);
    }

    public String buildCompanyWelcomeTemplate(String name, String password) throws IOException {
        Locale locale = new Locale("pt", "BR");
        Scanner scanner = new Scanner(new File(ROOT_PATH + "companyWelcome.html"), StandardCharsets.ISO_8859_1);
        scanner.useLocale(locale);

        return scanner.useDelimiter("\\A")
                .next()
                .replace("COMPANY_NAME", name)
                .replace("COMPANY_PASSWORD", password);
    }

    public String buildReportReceived(String trackingId) throws IOException {
        Locale locale = new Locale("pt", "BR");
        Scanner scanner = new Scanner(new File(ROOT_PATH + "reportReceived.html"), StandardCharsets.ISO_8859_1);
        scanner.useLocale(locale);

        return scanner.useDelimiter("\\A")
                .next()
                .replace("TRACKING_ID", trackingId);
    }

    public String buildReportShared(String trackingId) throws IOException {
        Locale locale = new Locale("pt", "BR");
        Scanner scanner = new Scanner(new File(ROOT_PATH + "reportShared.html"), StandardCharsets.ISO_8859_1);
        scanner.useLocale(locale);

        return scanner.useDelimiter("\\A")
                .next()
                .replace("TRACKING_ID", trackingId);
    }

    public String buildReportAnswered(String trackingId) throws IOException {
        Locale locale = new Locale("pt", "BR");
        Scanner scanner = new Scanner(new File(ROOT_PATH + "reportAnswered.html"), StandardCharsets.ISO_8859_1);
        scanner.useLocale(locale);

        return scanner.useDelimiter("\\A")
                .next()
                .replace("TRACKING_ID", trackingId);
    }
}

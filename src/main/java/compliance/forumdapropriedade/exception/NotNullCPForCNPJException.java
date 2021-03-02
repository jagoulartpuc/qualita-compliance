package compliance.forumdapropriedade.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NotNullCPForCNPJException extends RuntimeException {

    private String message;
}

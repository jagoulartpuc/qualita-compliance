package compliance.qualita.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class FeatureNotAllowedException extends RuntimeException {

    private String message;
}
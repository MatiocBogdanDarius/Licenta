package backend.user.account.service.exception;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class CustomException extends Exception {
    private HttpStatus status;
    private String message;
}

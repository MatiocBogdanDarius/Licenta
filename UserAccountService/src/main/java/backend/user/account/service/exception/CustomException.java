package backend.user.account.service.exception;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class CustomException extends Exception {
    private HttpStatus status;
    private String message;
}

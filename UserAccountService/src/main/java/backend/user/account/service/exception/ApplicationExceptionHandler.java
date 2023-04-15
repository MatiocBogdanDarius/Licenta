package backend.user.account.service.exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.Map;

@ControllerAdvice
public class ApplicationExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Map<String, String>> handleException(CustomException exception)  {
        var errorResponse = Map.of("message", exception.getMessage());

        return new ResponseEntity<>(errorResponse, exception.getStatus());
    }
}

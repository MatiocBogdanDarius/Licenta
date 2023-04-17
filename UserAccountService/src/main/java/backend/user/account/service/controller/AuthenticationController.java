package backend.user.account.service.controller;

import backend.user.account.service.dto.request.*;
import backend.user.account.service.dto.response.*;
import backend.user.account.service.exception.*;
import backend.user.account.service.service.AuthenticationService;
import jakarta.servlet.http.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.io.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) throws CustomException {
        try
        {
            return ResponseEntity.ok(authService.authenticate(request));
        } catch (Exception exception){
            throw CustomException
                    .builder()
                    .status(HttpStatus.NOT_FOUND)
                    .message(exception.getMessage())
                    .build();
        }
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authService.refreshToken(request, response);
    }
}

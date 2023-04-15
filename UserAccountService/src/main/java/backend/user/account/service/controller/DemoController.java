package backend.user.account.service.controller;

import backend.user.account.service.dto.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth/demo")
@RequiredArgsConstructor
public class DemoController {
    @GetMapping("")
    public ResponseEntity<String> demo(){
        return ResponseEntity.ok("demo");
    }
}

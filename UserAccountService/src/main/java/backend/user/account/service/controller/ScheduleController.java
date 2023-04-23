package backend.user.account.service.controller;

import backend.user.account.service.dto.ScheduleDetails;
import backend.user.account.service.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/schedule")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping("/by_user_id")
    public ResponseEntity<List<ScheduleDetails>> getByUserId(@RequestParam long userId) {
        return ResponseEntity.ok(scheduleService.findAllByUserId(userId));
    }
}

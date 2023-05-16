package backend.user.account.service.controller;

import backend.user.account.service.dto.ScheduleDetails;
import backend.user.account.service.dto.request.AddSchedulesRequest;
import backend.user.account.service.exception.CustomException;
import backend.user.account.service.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    public void addSchedules(@RequestBody AddSchedulesRequest request) throws CustomException {
        try
        {
            scheduleService.addSchedules(request);
        } catch (Exception exception){
            var status = exception instanceof DataAccessException ?
                    HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.NOT_FOUND;
            var message = exception instanceof DataAccessException ?
                    "Insertion Failed" : exception.getMessage();

            throw CustomException
                    .builder()
                    .status(status)
                    .message(message)
                    .build();
        }
    }
}

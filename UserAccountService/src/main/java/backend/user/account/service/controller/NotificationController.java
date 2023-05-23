package backend.user.account.service.controller;

import backend.user.account.service.dto.NotificationDetails;
import backend.user.account.service.dto.request.AddNotificationsRequest;
import backend.user.account.service.exception.CustomException;
import backend.user.account.service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/by_user_id")
    public ResponseEntity<List<NotificationDetails>> getByUserId(
            @RequestParam long userId
    ) {
        return ResponseEntity
                .ok(notificationService.findPastNotificationsByUserId(userId));
    }

    @PostMapping
    public void addNotifications(
            @RequestBody AddNotificationsRequest request
    ) throws CustomException
    {
        try
        {
            notificationService.addNotifications(request);
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

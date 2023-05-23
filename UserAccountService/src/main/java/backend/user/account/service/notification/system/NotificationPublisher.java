package backend.user.account.service.notification.system;

import backend.user.account.service.dto.NotificationDetails;
import backend.user.account.service.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationPublisher {
    private final SimpMessagingTemplate messagingTemplate;

    public void sendNotification(Notification notification) {
        var userId = notification.getSchedule().getUser().getId();
        var destination =  "/topic/notification/" + userId;
        var notificationDetails =
                mapNotificationToNotificationDetails(notification);

        messagingTemplate.convertAndSend(destination, notificationDetails);
    }

    private NotificationDetails mapNotificationToNotificationDetails(
        Notification notification
    ){
        return NotificationDetails
                .builder()
                .id(notification.getId())
                .scheduleId(notification.getSchedule().getId())
                .date(notification.getDate())
                .description(notification.getDescription())
                .status(notification.getNotificationStatus().ordinal())
                .build();
    }
}


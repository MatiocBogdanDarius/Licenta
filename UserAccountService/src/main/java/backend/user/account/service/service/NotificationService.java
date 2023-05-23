package backend.user.account.service.service;

import backend.user.account.service.dto.NotificationDetails;
import backend.user.account.service.dto.request.AddNotificationsRequest;
import backend.user.account.service.entity.Notification;
import backend.user.account.service.entity.Schedule;
import backend.user.account.service.entity.enums.NotificationStatus;
import backend.user.account.service.respository.NotificationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    @Transactional
    public void addNotifications(AddNotificationsRequest request) {
        var notifications = request
                .getNotifications()
                .stream()
                .map(this::mapNotificationDetailsToNotification)
                .toList();

        notificationRepository.saveAll(notifications);
    }

    private Notification mapNotificationDetailsToNotification(
            NotificationDetails notification
    ) {
        return Notification
                .builder()
                .schedule(createSchedule(notification.getScheduleId()))
                .date(notification.getDate())
                .description(notification.getDescription())
                .build();
    }

    private Schedule createSchedule(Long id){
        return Schedule
                .builder()
                .id(id)
                .build();
    }

    public List<NotificationDetails> findPastNotificationsByUserId(long userId) {
        Timestamp currentDateTime = new Timestamp(System.currentTimeMillis());

        return notificationRepository
                .findBySchedule_User_IdAndDateLessThan(userId, currentDateTime)
                .stream()
                .map(this::mapNotificationToNotificationDetails)
                .toList();
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

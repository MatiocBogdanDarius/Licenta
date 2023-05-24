package backend.user.account.service.notification.system;

import backend.user.account.service.entity.Notification;
import backend.user.account.service.entity.enums.NotificationStatus;
import backend.user.account.service.respository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationScheduler {
    private final NotificationRepository notificationRepository;
    private final NotificationPublisher notificationPublisher;

    @Scheduled(fixedRate = 5 * 60 * 1000, initialDelay = 30 * 1000)
    public void checkAndSendNotifications() {
        List<Notification> notifications = findPastUnsentNotifications();

        for (Notification notification : notifications) {
            notification.setStatus(NotificationStatus.UNREAD);
            notificationPublisher.sendNotification(notification);
        }

        notificationRepository.saveAll(notifications);
    }

    private List<Notification> findPastUnsentNotifications() {
        var currentDateTime = new Timestamp(System.currentTimeMillis());

        return notificationRepository.findByStatusAndDateLessThan(
                NotificationStatus.UNSENT,
                currentDateTime
        );
    }
}

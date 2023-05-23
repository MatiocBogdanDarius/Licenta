package backend.user.account.service.respository;

import backend.user.account.service.entity.Notification;
import backend.user.account.service.entity.enums.NotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByNotificationStatusAndDateLessThan(
            NotificationStatus notificationStatus,
            Timestamp date
    );

    List<Notification> findBySchedule_User_IdAndDateLessThan(
            Long userId,
            Timestamp date
    );
}

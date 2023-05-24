package backend.user.account.service.service;

import backend.user.account.service.dto.NotificationDetails;
import backend.user.account.service.dto.ScheduleDetails;
import backend.user.account.service.dto.request.AddNotificationsRequest;
import backend.user.account.service.entity.Notification;
import backend.user.account.service.entity.Schedule;
import backend.user.account.service.entity.enums.NotificationStatus;
import backend.user.account.service.entity.enums.TimeUnitType;
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

    public List<NotificationDetails> findPastNotificationsByUserId(long userId) {
        Timestamp currentDateTime = new Timestamp(System.currentTimeMillis());

        return notificationRepository
                .findBySchedule_User_IdAndDateLessThan(userId, currentDateTime)
                .stream()
                .map(this::mapNotificationToNotificationDetails)
                .toList();
    }

    private Notification mapNotificationDetailsToNotification(
            NotificationDetails notification
    ) {
        return Notification
                .builder()
                .schedule(createSchedule(notification.getScheduleId()))
                .date(notification.getDate())
                .description(notification.getDescription())
                .status(NotificationStatus.UNSENT)
                .unit(TimeUnitType.valueOf(notification.getUnit()))
                .numberOfUnits(notification.getNumberOfUnits())
                .build();
    }

    private NotificationDetails mapNotificationToNotificationDetails(
            Notification notification
    ){
        var schedule = mapScheduleToScheduleDetails(
            notification.getSchedule()
        );

        return NotificationDetails
                .builder()
                .id(notification.getId())
                .scheduleId(notification.getSchedule().getId())
                .schedule(schedule)
                .date(notification.getDate())
                .description(notification.getDescription())
                .status(notification.getStatus().ordinal())
                .unit(notification.getUnit().name())
                .numberOfUnits(notification.getNumberOfUnits())
                .build();
    }

    private Schedule createSchedule(Long id){
        return Schedule
                .builder()
                .id(id)
                .build();
    }

    private ScheduleDetails mapScheduleToScheduleDetails(Schedule schedule) {
        return ScheduleDetails
                .builder()
                .id(schedule.getId())
                .itemId(schedule.getItemId())
                .start(schedule.getStart())
                .end(schedule.getEnd())
                .country(schedule.getCountry())
                .contest(schedule.getContest())
                .player1(schedule.getPlayer1())
                .player2(schedule.getPlayer2())
                .userId(schedule.getUser().getId())
                .sport(schedule.getSource().getName())
                .build();
    }
}

package backend.user.account.service.dto;

import lombok.*;
import java.sql.Timestamp;

@Data
@Builder
@ToString
public class NotificationDetails {
    private long id;
    private long scheduleId;
    private Timestamp date;
    private String description;
    private int status;
    private ScheduleDetails schedule;
    private String unit;
    private long numberOfUnits;
}


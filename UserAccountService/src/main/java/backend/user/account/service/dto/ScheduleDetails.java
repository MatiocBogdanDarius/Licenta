package backend.user.account.service.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class ScheduleDetails {
    private long id;
    private long itemId;
    private Timestamp start;
    private Timestamp end;
    private String title;
    private String description;
}

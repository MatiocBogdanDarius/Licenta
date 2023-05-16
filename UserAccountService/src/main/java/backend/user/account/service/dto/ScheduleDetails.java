package backend.user.account.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.sql.Timestamp;

@Data
@Builder
@ToString
public class ScheduleDetails {
    private long id;
    private long itemId;
    private Timestamp start;
    private Timestamp end;
    private String country;
    private String contest;
    private String player1;
    private String player2;
    private String sport;
    private long userId;
}

package backend.user.account.service.dto.request;

import backend.user.account.service.dto.ScheduleDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddSchedulesRequest {
    private List<ScheduleDetails> schedules;
}

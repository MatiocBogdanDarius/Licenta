package backend.user.account.service.service;

import backend.user.account.service.dto.ScheduleDetails;
import backend.user.account.service.respository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public List<ScheduleDetails> findAllByUserId(long userId) {
        return scheduleRepository
                .findAllByUser_Id(userId)
                .stream()
                .map(schedule -> ScheduleDetails
                        .builder()
                        .id(schedule.getId())
                        .itemId(schedule.getItemId())
                        .start(schedule.getStart())
                        .end(schedule.getEnd())
                        .title(schedule.getName())
                        .description(schedule.getDescription())
                        .build()
                )
                .toList();
    }
}

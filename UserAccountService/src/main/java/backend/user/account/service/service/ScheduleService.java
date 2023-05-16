package backend.user.account.service.service;

import backend.user.account.service.dto.ScheduleDetails;
import backend.user.account.service.dto.request.AddSchedulesRequest;
import backend.user.account.service.entity.Schedule;
import backend.user.account.service.entity.Source;
import backend.user.account.service.entity.User;
import backend.user.account.service.respository.ScheduleRepository;
import backend.user.account.service.respository.SourceRepository;
import backend.user.account.service.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final SourceRepository sourceRepository;

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
                        .country(schedule.getCountry())
                        .contest(schedule.getContest())
                        .player1(schedule.getPlayer1())
                        .player2(schedule.getPlayer2())
                        .sport(schedule.getSource().getName())
                        .build()
                )
                .toList();
    }

    public void addSchedules(AddSchedulesRequest request) throws Exception {
        var sourceName = request.getSchedules().get(0).getSport();
        var userId = request.getSchedules().get(0).getUserId();

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        var source = sourceRepository.findByName(sourceName)
                .orElseThrow(() -> new Exception("Source not found"));

        List<Schedule> schedules = request
                .getSchedules()
                .stream()
                .map(schedule -> mapScheduleDetailsToSchedule(
                        schedule,
                        user,
                        source
                ))
                .collect(Collectors.toList());

        scheduleRepository.saveAll(schedules);
    }

    public Schedule  mapScheduleDetailsToSchedule(
            ScheduleDetails scheduleDetails,
            User user,
            Source source
    ){
        return Schedule
                .builder()
                .itemId(scheduleDetails.getItemId())
                .start(scheduleDetails.getStart())
                .end(scheduleDetails.getEnd())
                .country(scheduleDetails.getCountry())
                .contest(scheduleDetails.getContest())
                .player1(scheduleDetails.getPlayer1())
                .player2(scheduleDetails.getPlayer2())
                .user(user)
                .source(source)
                .build();
    }
}

package backend.user.account.service.respository;

import backend.user.account.service.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findAllByUser_Id(long userId);
}

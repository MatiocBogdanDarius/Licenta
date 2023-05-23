package backend.user.account.service.entity;

import backend.user.account.service.entity.enums.NotificationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.sql.Timestamp;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "notification_table")
public class Notification implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;
    private Timestamp date;
    private String description;
    private NotificationStatus notificationStatus;
}
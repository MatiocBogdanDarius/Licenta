package backend.user.account.service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name="schedule_table")
public class Schedule implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "item_id", nullable = false)
    private long itemId;
    @Column(name = "start_date", nullable = false)
    private Timestamp start;
    @Column(name = "end_date", nullable = false)
    private Timestamp end;
    @Column(name = "country")
    private String country;
    @Column(name = "contest")
    private String contest;
    @Column(name = "player1")
    private String player1;
    @Column(name = "player2")
    private String player2;
    @ManyToOne
    @JoinColumn(name = "source", nullable = false)
    private Source source;
    @ManyToOne
    private User user;
}

package backend.user.account.service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "source", nullable = false)
    private Source source;
    @ManyToOne
    private User user;
}

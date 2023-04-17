package backend.user.account.service.entity;

import backend.user.account.service.entity.enums.ItemType;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.util.*;

import static jakarta.persistence.CascadeType.ALL;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="wishlist_table")
public class Wishlist implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "item_id", nullable = false)
    private long itemId;
    @Column(name = "item_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ItemType itemType;
    @ManyToOne
    private User user;
    @ManyToOne
    @JoinColumn(name = "source", nullable = false)
    private Source source;
    @OneToMany(cascade=ALL, mappedBy="wishList")
    private Set<Notification> notifications = new HashSet<>();

}

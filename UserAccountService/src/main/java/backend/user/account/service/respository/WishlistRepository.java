package backend.user.account.service.respository;

import backend.user.account.service.entity.User;
import backend.user.account.service.entity.Wishlist;
import backend.user.account.service.entity.enums.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Optional<Wishlist> findByItemIdAndItemTypeAndUser(long itemId, ItemType itemType, User user);
    Optional<List<Wishlist>> findAllByUser_Id(long id);

    void deleteByItemIdAndItemTypeAndUser(long itemId, ItemType itemType, User user);
}

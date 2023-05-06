package backend.user.account.service.service;

import backend.user.account.service.dto.WishListDetails;
import backend.user.account.service.entity.Wishlist;
import backend.user.account.service.entity.enums.ItemType;
import backend.user.account.service.respository.SourceRepository;
import backend.user.account.service.respository.UserRepository;
import backend.user.account.service.respository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final SourceRepository sourceRepository;

    public Map<Long, Map<String, List<WishListDetails>>> findByUserId(long userId) {
        Map<Long, Map<String, List<WishListDetails>>> wishlist = new HashMap<>();
        var wishlistItemsGroupBySource = wishlistRepository
                .findAllByUser_Id(userId)
                .orElse(new ArrayList<>())
                .stream()
                .map(wishlistItem -> WishListDetails
                        .builder()
                        .id(wishlistItem.getId())
                        .itemId(wishlistItem.getItemId())
                        .itemType(wishlistItem.getItemType().name())
                        .sourceId(wishlistItem.getSource().getId())
                        .userId(wishlistItem.getUser().getId())
                        .build()
                ).collect(groupingBy(WishListDetails::getSourceId));

        wishlistItemsGroupBySource.keySet()
                .forEach(sourceId -> {
                    var wishlistItemsFromSourceGroupedByType =  wishlistItemsGroupBySource
                            .get(sourceId)
                            .stream()
                            .collect(groupingBy(WishListDetails::getItemType));
                    wishlist.put(sourceId, wishlistItemsFromSourceGroupedByType);
                });

        return wishlist;
    }

    public void addItem(WishListDetails request) throws Exception {
        var itemType = ItemType.valueOf(request.getItemType());
        var user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new Exception("User not found"));
        var source = sourceRepository.findById(request.getSourceId())
                .orElseThrow(() -> new Exception("Source not found"));

        var wishlistItem = Wishlist
                .builder()
                .itemId(request.getItemId())
                .itemType(itemType)
                .user(user)
                .source(source)
                .build();

        var userAlreadyHaveItemInWishlist = wishlistRepository
                .findByItemIdAndItemTypeAndUserAndSource(request.getItemId(), itemType, user, source)
                .isPresent();

        if(!userAlreadyHaveItemInWishlist){
            wishlistRepository.save(wishlistItem);
        }
    }

    public void deleteItem(long itemId, String type, long userId, long sourceId) throws Exception {
        var itemType = ItemType.valueOf(type);
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        var source = sourceRepository.findById(sourceId)
                .orElseThrow(() -> new Exception("Source not found"));

        var wishlistItem =  wishlistRepository
                .findByItemIdAndItemTypeAndUserAndSource(itemId, itemType, user, source)
                .orElseThrow(() -> new Exception("Wishlist not contains item"));

        wishlistRepository.deleteById(wishlistItem.getId());
    }
}

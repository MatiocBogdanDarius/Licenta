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
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final SourceRepository sourceRepository;

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

    public Map<Long, Map<String, List<WishListDetails>>> findByUserId(long userId) {
        Map<Long, Map<String, List<WishListDetails>>> wishlist = new HashMap<>();

        var wishlistItemsGroupBySource =
                getWishlistItemsGroupBySource(userId);

        for(var sourceId : wishlistItemsGroupBySource.keySet()) {
            var wishlistForSource = wishlistItemsGroupBySource.get(sourceId);
            var wishlistForSourceGroupedByType = groupByType(wishlistForSource);
            wishlist.put(sourceId, wishlistForSourceGroupedByType);
        }

        return wishlist;
    }

    private Map<Long, List<WishListDetails>> getWishlistItemsGroupBySource(
            Long userId
    ){
        return wishlistRepository
                .findAllByUser_Id(userId)
                .orElse(new ArrayList<>())
                .stream()
                .map(this::mapWishlistToWishlistDetails)
                .collect(groupingBy(WishListDetails::getSourceId));
    }

    private Map<String, List<WishListDetails>> groupByType(
            List<WishListDetails> wishlist
    ){
        return wishlist
                .stream()
                .collect(groupingBy(WishListDetails::getItemType));

    }

    private WishListDetails mapWishlistToWishlistDetails(Wishlist wishlist){
        return WishListDetails
                .builder()
                .id(wishlist.getId())
                .itemId(wishlist.getItemId())
                .itemType(wishlist.getItemType().name())
                .sourceId(wishlist.getSource().getId())
                .userId(wishlist.getUser().getId())
                .build();
    }
}

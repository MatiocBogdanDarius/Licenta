package backend.user.account.service.service;

import backend.user.account.service.dto.WishListDetails;
import backend.user.account.service.dto.request.GetWishlistItemsRequest;
import backend.user.account.service.entity.Wishlist;
import backend.user.account.service.entity.enums.ItemType;
import backend.user.account.service.respository.SourceRepository;
import backend.user.account.service.respository.UserRepository;
import backend.user.account.service.respository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public Map<String, List<WishListDetails>> findByUserId(long userId) {
        return wishlistRepository
                .findAllByUser_Id(userId)
                .orElse(new ArrayList<Wishlist>())
                .stream()
                .map(wishlist -> WishListDetails
                        .builder()
                        .itemId(wishlist.getItemId())
                        .itemType(wishlist.getItemType().name())
                        .sourceId(wishlist.getSource().getId())
                        .userId(wishlist.getUser().getId())
                        .build()
                ).collect(groupingBy( WishListDetails::getItemType));
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
                .findByItemIdAndItemTypeAndUser(request.getItemId(), itemType, user)
                .isPresent();

        if(!userAlreadyHaveItemInWishlist){
            wishlistRepository.save(wishlistItem);
        }
    }

    public void deleteItem(long itemId, String type, long userId) throws Exception {
        var itemType = ItemType.valueOf(type);
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        var wishlistItem =  wishlistRepository
                .findByItemIdAndItemTypeAndUser(itemId, itemType, user)
                .orElseThrow(() -> new Exception("Wishlist not contains item"));

        wishlistRepository.deleteById(wishlistItem.getId());
    }
}

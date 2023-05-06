package backend.user.account.service.controller;

import backend.user.account.service.dto.WishListDetails;
import backend.user.account.service.exception.CustomException;
import backend.user.account.service.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/wishlist")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;

    @PostMapping
    public void addItem(@RequestBody WishListDetails request)
            throws CustomException {
        try
        {
            wishlistService.addItem(request);
        } catch (Exception exception){
            var status = exception instanceof DataAccessException ?
                    HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.NOT_FOUND;
            var message = exception instanceof DataAccessException ?
                    "Insertion Failed" : exception.getMessage();

            throw CustomException
                    .builder()
                    .status(status)
                    .message(message)
                    .build();
        }
    }

    @GetMapping("/by_user_id")
    public ResponseEntity<Map<Long, Map<String, List<WishListDetails>>>> getByUserId(@RequestParam long userId) {
        return ResponseEntity.ok(wishlistService.findByUserId(userId));
    }

    @DeleteMapping
    public void deleteItem(
            @RequestParam long itemId,
            @RequestParam String itemType,
            @RequestParam long userId,
            @RequestParam long sourceId
    ) throws CustomException {
        try
        {
            wishlistService.deleteItem(itemId, itemType, userId, sourceId);
        } catch (Exception exception){
            var status = exception instanceof DataAccessException ?
                    HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.NOT_FOUND;
            var message = exception instanceof DataAccessException ?
                    "Insertion Failed" : exception.getMessage();

            throw CustomException
                    .builder()
                    .status(status)
                    .message(message)
                    .build();
        }
    }
}

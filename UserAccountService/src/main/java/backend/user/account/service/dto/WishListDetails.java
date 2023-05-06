package backend.user.account.service.dto;

import lombok.*;

@Data
@Builder
public class WishListDetails {
    private long id;
    private long itemId;
    private String itemType;
    private long sourceId;
    private long userId;
}

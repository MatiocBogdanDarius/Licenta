package backend.user.account.service.dto.response;

import backend.user.account.service.dto.UserDetailsDTO;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String accessToken;
    private String refreshToken;
    private UserDetailsDTO user;
}

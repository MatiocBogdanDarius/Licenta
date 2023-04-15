package backend.user.account.service.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class UserDetailsDTO {
    private long id;
    private String email;
    private String firstname;
    private String lastname;
    private String password;
    private String role;
}

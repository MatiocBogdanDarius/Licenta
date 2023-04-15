package backend.user.account.service.service;

import backend.user.account.service.dto.UserDetailsDTO;

import java.util.List;
import java.util.UUID;


public interface UserService {
    UserDetailsDTO findById(UUID id);
    List<UserDetailsDTO> findAll();
    UserDetailsDTO findByUsername(String username);
}

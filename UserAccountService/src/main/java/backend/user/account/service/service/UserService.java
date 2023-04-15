package online.energy.utility.platform.services;

import online.energy.utility.platform.dtos.DeviceDTO;
import online.energy.utility.platform.dtos.UserDTO;
import online.energy.utility.platform.dtos.UserDetailsDTO;
import online.energy.utility.platform.dtos.UserDeviceMappingDTO;

import java.util.List;
import java.util.UUID;


public interface UserService {
    UserDetailsDTO findById(UUID id);
    List<UserDetailsDTO> findAll();
    UserDTO update(UUID id, UserDTO userDto);
    UserDTO add(UserDTO newUserDto);
    boolean delete(UUID id);
    void addRoleToUser(String username, String roleName);
    UserDetailsDTO findByUsername(String username);
    boolean addDeviceToUser(UserDeviceMappingDTO userDeviceMappingDTO);
    List<DeviceDTO> getDevicesByUserUsername(String username);
}

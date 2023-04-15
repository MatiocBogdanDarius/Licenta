package online.energy.utility.platform.services;

import lombok.extern.slf4j.Slf4j;
import online.energy.utility.platform.controllers.handlers.exceptions.model.ResourceNotFoundException;
import online.energy.utility.platform.dtos.DeviceDTO;
import online.energy.utility.platform.dtos.UserDTO;
import online.energy.utility.platform.dtos.UserDetailsDTO;
import online.energy.utility.platform.dtos.UserDeviceMappingDTO;
import online.energy.utility.platform.dtos.builders.DeviceBuilder;
import online.energy.utility.platform.dtos.builders.UserBuilder;
import online.energy.utility.platform.entities.Device;
import online.energy.utility.platform.entities.Role;
import online.energy.utility.platform.entities.User;
import online.energy.utility.platform.repositories.DeviceRepository;
import online.energy.utility.platform.repositories.RoleRepository;
import online.energy.utility.platform.repositories.UserRepository;
import online.energy.utility.platform.services.password.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service @Transactional @Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DeviceRepository deviceRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, DeviceRepository deviceRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.deviceRepository = deviceRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if(!optionalUser.isPresent()){
            throw new UsernameNotFoundException("User not found in database");
        }

        User user = optionalUser.get();
        Collection<SimpleGrantedAuthority> authorities = user
                .getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }

    @Override
    public UserDetailsDTO findByUsername(String username) {
        log.info("Find user by username");
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(!userOptional.isPresent()){
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with username: "+ username);
        }
        return UserBuilder.toUserDetailsDTO(userOptional.get());
    }

    @Override
    public UserDetailsDTO findById(UUID id){
        log.info("Find user by id");
        Optional<User> userOptional = userRepository.findById(id);
        if(!userOptional.isPresent()){
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: "+ id);
        }
        return UserBuilder.toUserDetailsDTO(userOptional.get());
    }

    @Override
    public List<UserDetailsDTO> findAll(){
        log.info("Get all users");
        return userRepository
                .findAll()
                .stream()
                .map(UserBuilder::toUserDetailsDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DeviceDTO> getDevicesByUserUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if(!userOptional.isPresent()){
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with username: "+ username);
        }
        return userOptional
                .get()
                .getDevices()
                .stream()
                .map(DeviceBuilder::toDeviceDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO update(UUID id, UserDTO userDTO){
        log.info("Update user");

        User user = userRepository.findById(id).get();
        user.setName(userDTO.getName());
        user.setUsername(userDTO.getUsername());
        User updatedUser = userRepository.save(user);

        return UserBuilder.toUserDTO(updatedUser);}

    @Override
    public UserDTO add(UserDTO newUserDto) {
        log.info("Save user");
        System.out.println("Save user");
        User user = UserBuilder.toEntity(newUserDto);
        String password = user.getPassword() == null ? PasswordGenerator.generate(8) : user.getPassword();
        System.out.println("ADD: " + newUserDto + " " + user + " " + password);
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        return UserBuilder.toUserDTO( userRepository.save(user));
    }

    @Override
    public boolean delete(UUID id){
        log.info("Delete user");
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Add role to the user");
        Optional<User> optionalUser = userRepository.findByUsername(username);
        Optional<Role> optionalRole = roleRepository.findByName(roleName);
        if(optionalUser.isPresent() && optionalRole.isPresent()){
            User user = optionalUser.get();
            Role role = optionalRole.get();
            user.getRoles().add(role);
        }
    }

    @Override
    public boolean addDeviceToUser(UserDeviceMappingDTO userDeviceMappingDTO) {
        log.info("Add device to the user");
        Optional<User> optionalUser = userRepository.findById(userDeviceMappingDTO.getUserId());
        Optional<Device> optionalDevice = deviceRepository.findById(userDeviceMappingDTO.getDeviceId());
        if(optionalUser.isPresent() && optionalDevice.isPresent()){
            User user = optionalUser.get();
            Device device = optionalDevice.get();
            user.getDevices().add(device);
            userRepository.save(user);
        }
        return true;
    }
}

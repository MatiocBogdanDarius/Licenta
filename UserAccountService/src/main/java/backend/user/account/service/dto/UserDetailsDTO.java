package online.energy.utility.platform.dtos;

import lombok.*;
import online.energy.utility.platform.entities.Device;
import online.energy.utility.platform.entities.Role;

import java.util.*;

@Getter
@Setter
@ToString
public class UserDetailsDTO {
    private UUID id;
    private String name;
    private String username;
    private String password;
    private Collection<Role> roles = new ArrayList<>();
    private Set<Device> devices = new TreeSet<>();
    public UserDetailsDTO(UUID id, String name, String username, String password, Collection<Role> roles, Set<Device> devices) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.devices = devices;
    }
}

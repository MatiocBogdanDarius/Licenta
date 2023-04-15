package online.energy.utility.platform.controllers;

import lombok.RequiredArgsConstructor;
import online.energy.utility.platform.dtos.DeviceDTO;
import online.energy.utility.platform.dtos.UserDTO;
import online.energy.utility.platform.dtos.UserDetailsDTO;
import online.energy.utility.platform.dtos.UserDeviceMappingDTO;

import online.energy.utility.platform.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/all_users")
    public ResponseEntity<List<UserDetailsDTO>> getUsers(){
        List<UserDetailsDTO> users = userService.findAll();
        ResponseEntity<List<UserDetailsDTO>> response =  ResponseEntity.ok().body(users);
        System.out.println("USERS: " + users);
        return response;
    }

    @GetMapping("/get_by_id/{id}")
    public ResponseEntity<UserDetailsDTO> getUserById(@PathVariable("id") UUID id){
        System.out.println("GET BY ID: " + id);
        UserDetailsDTO user = userService.findById(id);
        ResponseEntity<UserDetailsDTO> response =  ResponseEntity.ok().body(user);
        System.out.println("USER: " + user);
        return response;
    }

    @GetMapping("/get_user_devices/{username}")
    public ResponseEntity<List<DeviceDTO>> getDevicesByUserUsername(@PathVariable("username") String username){
        List<DeviceDTO> devices = userService.getDevicesByUserUsername(username);
        ResponseEntity<List<DeviceDTO>> response =  ResponseEntity.ok().body(devices);
        System.out.println("USER Devices: " + devices);
        return response;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable("id") UUID id, @RequestBody UserDTO user){
        return ResponseEntity.ok().body(userService.update(id, user));
    }

    @PostMapping("/save")
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO user){
        return ResponseEntity.ok().body(userService.add(user));
    }

    @PutMapping("/add_device")
    public ResponseEntity<Boolean> addUser(@RequestBody UserDeviceMappingDTO userDeviceMappingDTO){
        return ResponseEntity.ok().body(userService.addDeviceToUser(userDeviceMappingDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") UUID id){
        return ResponseEntity.ok().body(userService.delete(id));
    }
}

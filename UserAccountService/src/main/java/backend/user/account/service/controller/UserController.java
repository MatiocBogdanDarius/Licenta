//package backend.user.account.service.controller;
//
//import backend.user.account.service.dto.UserDetailsDTO;
//import lombok.RequiredArgsConstructor;
//import online.energy.utility.platform.dtos.DeviceDTO;
//import online.energy.utility.platform.dtos.UserDTO;
//import online.energy.utility.platform.dtos.UserDetailsDTO;
//import online.energy.utility.platform.dtos.UserDeviceMappingDTO;
//import online.energy.utility.platform.services.UserService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.UUID;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("api/v1/user")
//@RequiredArgsConstructor
//public class UserController {
//    private final UserService userService;
//
//    @GetMapping("/all_users")
//    public ResponseEntity<List<UserDetailsDTO>> getUsers(){
//        List<UserDetailsDTO> users = userService.findAll();
//        ResponseEntity<List<UserDetailsDTO>> response =  ResponseEntity.ok().body(users);
//        System.out.println("USERS: " + users);
//        return response;
//    }
//
//    @GetMapping("/get_by_id/{id}")
//    public ResponseEntity<UserDetailsDTO> getUserById(@PathVariable("id") UUID id){
//        System.out.println("GET BY ID: " + id);
//        UserDetailsDTO user = userService.findById(id);
//        ResponseEntity<UserDetailsDTO> response =  ResponseEntity.ok().body(user);
//        System.out.println("USER: " + user);
//        return response;
//    }
//}

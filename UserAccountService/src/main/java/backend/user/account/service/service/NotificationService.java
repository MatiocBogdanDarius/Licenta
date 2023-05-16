package backend.user.account.service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendNotificationToUser(String userId, String notification) {
        String destination = "/user/" + userId + "/queue/notifications";
        messagingTemplate.convertAndSend(destination, notification);
    }
}

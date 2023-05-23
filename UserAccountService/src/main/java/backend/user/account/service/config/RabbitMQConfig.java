package backend.user.account.service.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String RECOMMENDATION_EXCHANGE = "recommendation.exchange";
    public static final String RECOMMENDATION_QUEUE = "recommendation.queue";
    public static final String NOTIFICATION_EXCHANGE = "notification.exchange";
    public static final String NOTIFICATION_QUEUE = "notification.queue";

    @Bean
    public Exchange informationExchange() {
        return ExchangeBuilder
                .directExchange(RECOMMENDATION_EXCHANGE)
                .build();
    }

    @Bean
    public Queue informationQueue() {
        return QueueBuilder
                .durable(RECOMMENDATION_QUEUE)
                .build();
    }

    @Bean
    public Binding informationBinding() {
        return BindingBuilder
                .bind(informationQueue())
                .to(informationExchange())
                .with("")
                .noargs();
    }

    @Bean
    public Exchange notificationExchange() {
        return ExchangeBuilder
                .topicExchange(NOTIFICATION_EXCHANGE)
                .durable(true)
//                .directExchange(NOTIFICATION_EXCHANGE)
                .build();
    }

    @Bean
    public Queue notificationQueue() {
        return QueueBuilder
                .durable(NOTIFICATION_QUEUE)
                .build();
    }

    @Bean
    public Binding notificationBinding() {
        return BindingBuilder
                .bind(notificationQueue())
                .to(notificationExchange())
                .with("notifications.user.#")
                .noargs();
    }
}

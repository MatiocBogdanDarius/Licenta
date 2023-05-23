import {userAccountAxios, userAccountAxiosPrivate} from "./axios";
import {SPORTS} from "assets/constants/Data";

const getCurrentUser = () => {
    const user = localStorage.getItem("userDetails");
    return user ? JSON.parse(user) : undefined;
}

const getCurrentUserId = () => {
    return getCurrentUser()?.id;
}

const register = (user) => {
    return userAccountAxios
        .post("auth/register",user)
}

const login = async (credentials) => {
    return await userAccountAxios
        .post("auth/authenticate", credentials);
}

const addItemToWishlist = (sport, itemId, type) => {
    const item = {
        itemId: itemId,
        itemType: type,
        sourceId: SPORTS[sport].id,
        userId: getCurrentUserId()
    }

    userAccountAxiosPrivate.post("wishlist", item)
}

const getUserWishlist = () => {
    const userId = getCurrentUserId();

    return userAccountAxiosPrivate
        .get(
            "wishlist/by_user_id",
            {params:{userId: userId}}
        )
}

const removeItemFromWishlist = (sport, itemId, itemType) => {
    userAccountAxiosPrivate.delete(
        "wishlist",
        {params:
                {
                    itemId: itemId,
                    itemType: itemType,
                    userId: getCurrentUserId(),
                    sourceId: SPORTS[sport].id
                }
        })
}

const getUserCalendar = () => {
    const userId = getCurrentUserId();

    return userAccountAxiosPrivate.get("schedule/by_user_id",
            {params:{userId}}
    )
}

const createSchedule = (sport, game, userId, gameDuration) => {
    return {
        itemId: game.fixture.id,
        start: new Date(game.fixture.timestamp * 1000).toUTCString(),
        end: new Date(game.fixture.timestamp * 1000 + gameDuration * 60 * 60 * 1000).toUTCString(),
        country: game.league.country,
        contest: game.league.name,
        player1: game.teams.home.name,
        player2: game.teams.away.name,
        sport: sport,
        userId: userId
    }
}

const createSchedules = (sport, games) => {
    const gameDuration = 2;
    const userId = getCurrentUserId();

    return games.map(game => {
        return createSchedule(sport, game, userId, gameDuration);
    });
}

const addEventsToCalendar = (sport, games) => {
    const schedules = createSchedules(sport, games);

    return userAccountAxiosPrivate
        .post("schedule", {schedules: schedules});
}

const getNotificationDateTime = (scheduleStartDatetime, alarmTime) => {
    const notificationDate = new Date(scheduleStartDatetime);
    notificationDate.setMilliseconds(notificationDate.getMilliseconds() - alarmTime);

    return notificationDate;
}

const createNotification = (schedule, alarm) => {
    return {
        scheduleId: schedule.id,
        date: getNotificationDateTime(schedule.start, alarm.time),
        description: alarm.name
    };
}

const createNotifications = (sport, schedules, alarms) => {
    const notifications = schedules.map(schedule => {
        return alarms.map(alarm => createNotification(schedule, alarm));
    });

    return notifications.flat();
}


const addNotifications = (sport, schedules, alarms) => {
    const notifications = createNotifications(sport, schedules, alarms);
    console.log("Notifications:", notifications)

    userAccountAxiosPrivate
        .post("notification", {notifications: notifications});
}

const getUserNotifications = async () => {
    const userId = getCurrentUserId();

    return userAccountAxiosPrivate.get(
        "notification/by_user_id",
        {params:{userId}}
    );
}

export {
    getCurrentUser,
    getCurrentUserId,
    register,
    login,
    addItemToWishlist,
    getUserWishlist,
    removeItemFromWishlist,
    getUserCalendar,
    addEventsToCalendar,
    addNotifications,
    getUserNotifications,
};
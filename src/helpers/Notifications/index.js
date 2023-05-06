import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";


const channels = [
  {
    channelId: "starterDefault", // (required)
    channelName: "Starter Default", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    onCreated: (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  },
];

channels.forEach((channel) => {
  PushNotification.createChannel(
    {
      channelId: channel.channelId,
      channelName: channel.channelName,
      channelDescription: channel.channelDescription,
      playSound: channel.playSound,
      importance: channel.importance,
      vibrate: channel.vibrate,
    },
    channel.onCreated
  );
});

class Notification {
  defaultChannel = channels[0];

  localScheduled(args, ms = 1000) {
    PushNotification.localNotificationSchedule({
      channelId: this.defaultChannel.channelId,
      //... You can use all the options from localNotifications
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + ms), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  }

  local(args) {
    PushNotification.localNotification({
      channelId: this.defaultChannel.channelId,
      //... You can use all the options from localNotifications
      message: "My Notification Message", // (required)
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    });
  }
}

export const AppNotifications = new Notification();


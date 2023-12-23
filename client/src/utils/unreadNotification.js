export default function unreadNotification(notification) {
    console.log('notification---', notification);
    return notification.filter((n) => n.isRead === false);
}
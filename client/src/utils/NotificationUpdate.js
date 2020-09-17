import React from "react";

const NotificationUpdate = React.createContext({
    messages: 0,
    matches: 0,
    notifications: false,
    onClick: () => undefined
});

export default NotificationUpdate;
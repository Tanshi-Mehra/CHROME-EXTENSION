chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "setReminder") {
        chrome.alarms.create("dailyReminder", { periodInMinutes: 1440 });
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "dailyReminder") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Reminder",
            message: "Don't forget to check your assignments & exams!"
        });
    }
});

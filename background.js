chrome.runtime.onInstalled.addListener(() => {
    console.log("EduBoost Installed!");
});

// ✅ Only one listener
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.type === "setReminder") {
        const delayInMinutes = (message.time - Date.now()) / (1000 * 60);

        if (delayInMinutes <= 0) {
            console.warn("Reminder time must be in the future.");
            return;
        }

        // ✅ Clear any existing reminder alarm
        chrome.alarms.clear("eduReminder", () => {
            chrome.alarms.create("eduReminder", {
                delayInMinutes: delayInMinutes
            });

            chrome.storage.local.set({ reminderText: message.text });
            console.log("Reminder set for", delayInMinutes, "minutes");
        });
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "eduReminder") {
        chrome.alarms.clear("eduReminder"); // ✅ Ensure it fires only once

        chrome.storage.local.get("reminderText", (data) => {
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icons/icon48.png",
                title: "⏰ Eduboost-Reminder!",
                message: data.reminderText || "Don't forget your task!",
                priority: 2
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Notification error:", chrome.runtime.lastError.message);
                } else {
                    console.log("Reminder notification shown.");
                }
            });
        });
    }
});
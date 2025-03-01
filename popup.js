document.getElementById("darkModeToggle").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: toggleDarkMode
        });
    });
});

function toggleDarkMode() {
    let body = document.body;
    if (body.style.backgroundColor === "black") {
        body.style.backgroundColor = "";
        body.style.color = "";
    } else {
        body.style.backgroundColor = "black";
        body.style.color = "white";
    }
}

// Open selected resource link
document.getElementById("openResource").addEventListener("click", () => {
    let selectedResource = document.getElementById("resourceLinks").value;
    chrome.tabs.create({ url: selectedResource });
});

// Set daily exam reminder
document.getElementById("setReminder").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "setReminder" });
    alert("Daily reminder set!");
});

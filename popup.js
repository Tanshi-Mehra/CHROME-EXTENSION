const quotes = [
  "Believe in yourself.",
"Keep pushing forward!",
"Every day is a new beginning.",
"Code. Learn. Repeat.",
"You’re closer than you think!",
"One step at a time!",
"You can do this!",
"Hard work pays off.",
"Believe in yourself and all that you are.",
"Push yourself, no one else will.",
"Small progress is still progress.",
"You are capable of amazing things.",
"Hard work beats talent when talent doesn’t work hard."];



document.getElementById("openERP").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://student.gehu.ac.in/" });
});


document.getElementById("study-sites").addEventListener("change", function () {
    let selectedSite = this.value;
    if (selectedSite) {
        chrome.tabs.create({ url: selectedSite });
    }
});

document.getElementById("autoFill").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: autoFillForms
    });
});

function autoFillForms() {
    let roll = document.querySelector('input[placeholder="User ID"]');
    let pass = document.querySelector('input[placeholder="Password"]');

    if (roll) roll.value = "22012614";
    if (pass) pass.value = "Your_PAssword"
}

function saveNotes() {
    let notes = [];
    document.querySelectorAll("#notesList li").forEach(li => {
        let noteText = li.querySelector("p").textContent.trim();
        notes.push(noteText);
    });
    localStorage.setItem("savedNotes", JSON.stringify(notes));
}

function loadNotes() {
    let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    document.getElementById("notesList").innerHTML = "";
    savedNotes.forEach(noteText => {
        addNoteToList(noteText);
    });
}

function addNoteToList(noteText) {
    let li = document.createElement("li");

    let p = document.createElement("p");
    p.textContent = noteText;

    let buttonContainer = document.createElement("div");

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
        let newText = prompt("Edit your note:", p.textContent);
        if (newText !== null && newText.trim() !== "") {
            p.textContent = newText.trim();
            saveNotes();
        }
    });

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
        li.remove();
        saveNotes();
    });


    let downloadBtn = document.createElement("button");
    downloadBtn.textContent = "📥Download";
    downloadBtn.className = "download-btn";
    downloadBtn.addEventListener("click", () => {
        const index = [...document.querySelectorAll("#notesList li")].indexOf(li) + 1;
        const blob = new Blob([noteText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Note_${index}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(removeBtn);
    buttonContainer.appendChild(downloadBtn);

    li.appendChild(p);
    li.appendChild(buttonContainer);

    document.getElementById("notesList").appendChild(li);
}


document.getElementById("addNoteBtn").addEventListener("click", function () {
    document.getElementById("noteInputContainer").style.display = "block";
});

document.getElementById("saveNoteBtn").addEventListener("click", function () {
    let noteText = document.getElementById("noteInput").value;
    if (noteText.trim() !== "") {
        addNoteToList(noteText.trim());
        saveNotes();
        document.getElementById("noteInput").value = "";
        document.getElementById("noteInputContainer").style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", loadNotes);
const searchEngineUrls = {
    "Google Scholar": "https://scholar.google.com/scholar?q=",
    "GeeksForGeeks": "https://www.geeksforgeeks.org/?s=",
    "Wikipedia": "https://en.wikipedia.org/wiki/Special:Search?search="
};

document.getElementById("quickSearchBtn").addEventListener("click", () => {
    const query = document.getElementById("quickSearchInput").value.trim();
    if (query !== "") {
        for (let site in searchEngineUrls) {
            chrome.tabs.create({ url: searchEngineUrls[site] + encodeURIComponent(query) });
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.innerText = `"${quote}"`;

    setTimeout(() => {
        quoteElement.classList.add("show");
    }, 100);
});
document.getElementById("setReminderBtn").addEventListener("click", () => {
    const reminderText = document.getElementById("reminderText").value.trim();
    const reminderTime = new Date(document.getElementById("reminderTime").value).getTime();

    if (reminderText && reminderTime > Date.now()) {
        chrome.runtime.sendMessage({
            type: "setReminder",
            text: reminderText,
            time: reminderTime
        });
        alert("Reminder set!");
        document.getElementById("reminderText").value = "";
        document.getElementById("reminderTime").value = "";
    } else {
        alert("Please enter a valid reminder and a future time.");
    }
});

document.getElementById("unlockNotesBtn").addEventListener("click", () => {
    const enteredPassword = document.getElementById("notePassword").value;
    const correctPassword = "1234"; 

    if (enteredPassword === correctPassword) {
        document.getElementById("notesArea").style.display = "block";
        document.getElementById("secureNoteSection").style.display = "none";
    } else {
        alert("Incorrect password!");
    }
});

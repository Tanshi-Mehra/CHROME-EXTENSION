document.getElementById("openERP").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://student.gehu.ac.in/" });
});

// ✅ Open Selected Study Sites
document.getElementById("study-sites").addEventListener("change", function () {
    let selectedSite = this.value;
    if (selectedSite) {
        chrome.tabs.create({ url: selectedSite });
    }
});

// ✅ Auto-Fill Forms
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
    if (pass) pass.value = "wGtHtCb9BNfT_yC";
}


// ✅ Function to Save Notes in Local Storage (Fix Overwriting Issue)
function saveNotes() {
    let notes = [];
    document.querySelectorAll("#notesList li").forEach(li => {
        let noteText = li.firstChild.textContent.trim();
        notes.push(noteText);
    });

    localStorage.setItem("savedNotes", JSON.stringify(notes)); // Save to localStorage
}

// ✅ Function to Load Notes from Local Storage
function loadNotes() {
    let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    document.getElementById("notesList").innerHTML = ""; // Clear UI before loading

    savedNotes.forEach(noteText => {
        addNoteToList(noteText);
    });
}

// ✅ Function to Add Note to UI & Save to Local Storage
function addNoteToList(noteText) {
    let li = document.createElement("li");
    li.innerHTML = `${noteText} <button class="remove-btn">Remove</button>`;

    // ✅ Remove Button Functionality
    li.querySelector(".remove-btn").addEventListener("click", function () {
        li.remove();
        saveNotes(); // Update localStorage after deletion
    });

    document.getElementById("notesList").appendChild(li);
}

// ✅ Add Note Button Click
document.getElementById("addNoteBtn").addEventListener("click", function () {
    document.getElementById("noteInputContainer").style.display = "block";
});

// ✅ Save Note Button Click
document.getElementById("saveNoteBtn").addEventListener("click", function () {
    let noteText = document.getElementById("noteInput").value;
    if (noteText.trim() !== "") {
        addNoteToList(noteText); // Add note to UI
        saveNotes(); // Save notes in localStorage
        document.getElementById("noteInput").value = ""; // Clear input
        document.getElementById("noteInputContainer").style.display = "none"; // Hide input
    }
});

// ✅ Load Notes on Page Load
document.addEventListener("DOMContentLoaded", loadNotes);

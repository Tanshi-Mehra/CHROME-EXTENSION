// ✅ Open ERP Button
document.getElementById("openERP").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://student.gehu.ac.in/" });
});

// ✅ Open Selected Study Site
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

// ✅ Save Notes to Local Storage
function saveNotes() {
    let notes = [];
    document.querySelectorAll("#notesList li").forEach(li => {
        let noteText = li.querySelector("p").textContent.trim();
        notes.push(noteText);
    });
    localStorage.setItem("savedNotes", JSON.stringify(notes));
}

// ✅ Load Notes from Local Storage
function loadNotes() {
    let savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    document.getElementById("notesList").innerHTML = "";
    savedNotes.forEach(noteText => {
        addNoteToList(noteText);
    });
}

// ✅ Add a Note to UI
function addNoteToList(noteText) {
    let li = document.createElement("li");

    // Note Paragraph
    let p = document.createElement("p");
    p.textContent = noteText;

    // Buttons Container
    let buttonContainer = document.createElement("div");

    // Edit Button
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

    // Remove Button
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
        li.remove();
        saveNotes();
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(removeBtn);

    li.appendChild(p);
    li.appendChild(buttonContainer);

    document.getElementById("notesList").appendChild(li);
}

// ✅ Show Input Box
document.getElementById("addNoteBtn").addEventListener("click", function () {
    document.getElementById("noteInputContainer").style.display = "block";
});

// ✅ Save New Note
document.getElementById("saveNoteBtn").addEventListener("click", function () {
    let noteText = document.getElementById("noteInput").value;
    if (noteText.trim() !== "") {
        addNoteToList(noteText.trim());
        saveNotes();
        document.getElementById("noteInput").value = "";
        document.getElementById("noteInputContainer").style.display = "none";
    }
});

// ✅ Load Notes on Page Load
document.addEventListener("DOMContentLoaded", loadNotes);

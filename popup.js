document.getElementById("openERP").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://student.gehu.ac.in/" });
});

// Open Selected Study Sites
document.getElementById("openSites").addEventListener("click", () => {
    let selectedSites = Array.from(document.getElementById("studySites").selectedOptions).map(opt => opt.value);
    selectedSites.forEach(site => {
        chrome.tabs.create({ url: site });
    });
});

// Auto-Fill Forms
document.getElementById("autoFill").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: autoFillForms
    });
});

function autoFillForms() {
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "Auto-Filled Data";
    });
}


document.getElementById("addNoteBtn").addEventListener("click", function() {
    document.getElementById("noteInputContainer").style.display = "block";
});

document.getElementById("saveNoteBtn").addEventListener("click", function() {
    let noteText = document.getElementById("noteInput").value;
    if (noteText.trim() !== "") {
        let li = document.createElement("li");
        li.innerHTML = `${noteText} <button class="remove-btn">Remove</button>`;
        
        // Add remove functionality
        li.querySelector(".remove-btn").addEventListener("click", function() {
            li.remove();
        });

        document.getElementById("notesList").appendChild(li);
        document.getElementById("noteInput").value = ""; // Clear textarea after adding
        document.getElementById("noteInputContainer").style.display = "none"; // Hide input after saving
    }
});

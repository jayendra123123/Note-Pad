function popup() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "popupContainer";
    popupContainer.innerHTML = `
    <h1>New Note</h1>
    <textarea id="note-text" placeholder="Enter your note..."></textarea>
    <div class="btn-container"> 
        <button class="closeBtn" onclick="closePopup()">Close</button>
        <button class="submitBtn" onclick="createNote()">Create Note</button>
    </div>`;
    document.body.appendChild(popupContainer);
}

function closePopup() {
    document.getElementById("popupContainer")?.remove();
}

function createNote() {
    const noteText = document.getElementById('note-text').value.trim();
    if (noteText) {
        const note = { id: new Date().getTime(), text: noteText };
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);
        localStorage.setItem('notes', JSON.stringify(existingNotes));
        closePopup();
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('note-list');
    if (!notesList) return;
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span>${note.text}</span>
        <div class="noteBtns-container">
            <button class="editBtn" onclick="editNote(${note.id})">✏️</button>
            <button class="deleteBtn" onclick="deleteNote(${note.id})">🗑️</button>
        </div>`;
        notesList.appendChild(listItem);
    });
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId);
    if (!noteToEdit) return;

    const editingPopup = document.createElement("div");
    editingPopup.id = "editingContainer";
    editingPopup.innerHTML = `
    <h1>Edit Note</h1>
    <textarea id="edit-note-text">${noteToEdit.text}</textarea>
    <div class="btn-container">
        <button class="submitBtn" onclick="updateNote(${noteId})">Done</button>
        <button class="closeBtn" onclick="closeEditPopup()">Cancel</button>
    </div>`;
    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    document.getElementById("editingContainer")?.remove();
}

function updateNote(noteId) {
    const noteText = document.getElementById('edit-note-text').value.trim();
    if (noteText) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.map(note => note.id == noteId ? { id: note.id, text: noteText } : note);
        localStorage.setItem('notes', JSON.stringify(notes));
        closeEditPopup();
        displayNotes();
    }
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => parseInt(note.id) !== parseInt(noteId));
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

document.addEventListener("DOMContentLoaded", displayNotes);

window.addEventListener('load', () => {
    const textArea = document.getElementById('text-area');
    const saveButton = document.getElementById('save-btn');
    const loadButton = document.getElementById('load-btn');
    const deleteButton = document.getElementById('delete-btn');
    const saveNameInput = document.getElementById('save-name-input');
    const saveSelector = document.getElementById('save-selector');
    const newButton = document.getElementById('new-btn');
    const deleteAllButton = document.getElementById('delete-all-btn');
    let savedTexts = [];

    saveNameInput.value = `Save ${savedTexts.length + 1}`;

    function wordCheck(){
        if (textArea.value.includes("="))
        alert("your text contains the char '='")
        if(textArea.value.includes("@"))
        alert("your text contains @")
    }

    function newTxt() {
        textArea.value = "";
        saveNameInput.value = `Save ${savedTexts.length + 1}`;
    }

    function deleteAll(){
        savedTexts = [];
        localStorage.setItem('notepad-texts', JSON.stringify(savedTexts));
        newTxt();
        updateSaveSelector();
    }

    function saveText() {
        const text = textArea.value;
        if (text.trim() !== "") {
            const name = saveNameInput.value || `Save ${savedTexts.length + 1}`;
            savedTexts.push({ name, text });
            localStorage.setItem('notepad-texts', JSON.stringify(savedTexts));
            updateSaveSelector();
        }
        saveNameInput.value = `Save ${savedTexts.length + 1}`;
    }

    function loadText() {
        const index = saveSelector.selectedIndex;
        const savedText = savedTexts[index];
        if (savedText) {
            textArea.value = savedText.text;
        }
    }

    function deleteSave() {
        const index = saveSelector.selectedIndex;
        savedTexts.splice(index, 1);
        localStorage.setItem('notepad-texts', JSON.stringify(savedTexts));
        updateSaveSelector();
    }

    function updateSaveSelector() {
        saveSelector.innerHTML = "";
        savedTexts.forEach((savedText, index) => {
            const option = document.createElement("option");
            option.text = savedText.name;
            saveSelector.add(option);

            const deleteButton = document.createElement("button");
            deleteButton.addEventListener("click", () => {
                savedTexts.splice(index, 1);
                localStorage.setItem('notepad-texts', JSON.stringify(savedTexts));
                updateSaveSelector();
            });

            saveSelector.options[index].appendChild(deleteButton);
        });
    }

    saveButton.addEventListener('click', saveText);
    loadButton.addEventListener('click', loadText);
    deleteButton.addEventListener('click', deleteSave);
    newButton.addEventListener('click', newTxt);
    deleteAllButton.addEventListener('click',deleteAll);
    textArea.addEventListener('input',wordCheck);

    const savedTextsJson = localStorage.getItem('notepad-texts');
    if (savedTextsJson) {
        savedTexts = JSON.parse(savedTextsJson);
        updateSaveSelector();
    }
});
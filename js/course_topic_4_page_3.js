function checkTheCompleteAnswer() {

    const translations = {
        "lion": "lion",
        "tiger": "tiger", 
        "panda": "panda", 
        "elephant": "elephant",
        "monkey": "monkey"
    };

    document.querySelectorAll(".sentence-container").forEach(container => {

        const inputCompete = container.querySelector(".input-for-user-to-write");
        const word = inputCompete.id;
        const userTranslation = inputCompete.value.trim().toLowerCase();
        const correctTranslation = translations[word].toLowerCase();

        if (userTranslation === correctTranslation) {
            inputCompete.style.border = "2px solid #01D664";
        } else {
            inputCompete.style.border = "2px solid #DD1919";
        }

    });
}



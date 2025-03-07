function checkTheCompleteAnswer() {
    const translations = {
        "lion": "lion",
        "tiger": "tiger", 
        "panda": "panda", 
        "elephant": "elephant",
        "monkey": "monkey"
    };

    document.querySelectorAll(".sentence-container").forEach(container => {
        const input = container.querySelector(".input-for-user-to-write");
        const word = input.id;
        const userTranslation = input.value.trim().toLowerCase(); // Переводимо введення до нижнього регістру
        const correctTranslation = translations[word].toLowerCase(); // Переводимо правильний переклад до нижнього регістру

        if (userTranslation === correctTranslation) {
            input.style.border = "1px solid #01D664"; // зелений кордон
        } else {
            input.style.border = "1px solid #DD1919"; // червоний кордон
        }
    });
}



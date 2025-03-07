// Додаємо обробник подій для чекбоксів
document.querySelectorAll('.answer-test-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
        // Зняти відмітку з інших чекбоксів в межах однієї відповіді
        document.querySelectorAll('.answer-test-checkbox').forEach(cb => cb.classList.remove('checked'));
        // Встановити відмітку для вибраного чекбоксу
        this.classList.add('checked');
    });
});

// Функція для перевірки відповідей
function checkQuestionAnswer() {
    // Список правильних відповідей
    let correctAnswers = {
        "answer_1_1" : true,
        "answer_2_2" : true,
        "answer_3_3" : true
    };

    document.querySelectorAll('.answer-test-checkbox').forEach(checkbox => {
        let answerId = checkbox.id;
        if (checkbox.classList.contains('checked')) {
            if (correctAnswers[answerId]) {
                checkbox.classList.remove('checked');
                checkbox.classList.add('correct');
            } else {
                checkbox.classList.remove('checked');
                checkbox.classList.add('incorrect');
            }
        }
    });
}

function checkTranslationAnswer() {
    const translations = {
        "zoo": "зоопарк",
        "lion": "лев",
        "tiger": "тигр", 
        "panda": "панда", 
        "bear": "ведмідь", 
        "elephant": "слон", 
        "fox": "лисиця", 
        "monkey": "мавпа", 
        "giraffe": "жираф", 
        "snake": "змія", 
        "crocodile": "крокодил", 
        "turtle": "черепаха"
    };

    document.querySelectorAll(".translation-word-container").forEach(container => {
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



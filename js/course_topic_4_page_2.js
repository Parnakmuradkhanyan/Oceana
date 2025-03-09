/*Check box exercise*/
document.querySelectorAll('.answer-test-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
        document.querySelectorAll('.answer-test-checkbox').forEach(cb => cb.classList.remove('checked'));
        this.classList.add('checked');
    });
});

function checkQuestionAnswer() {

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

        const inputTranslation = container.querySelector(".input-for-user-to-write");
        const word = inputTranslation.id;
        const userTranslation = inputTranslation.value.trim().toLowerCase();
        const correctTranslation = translations[word].toLowerCase();

        if (userTranslation === correctTranslation) {
            inputTranslation.style.border = "2px solid #01D664";
        } else {
            inputTranslation.style.border = "2px solid #DD1919";
        }

    });
    
}



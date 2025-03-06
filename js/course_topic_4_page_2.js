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



const words = [
    { word: 'Zoo', translation: '- зоопарк', image: '../img/new-words-pics/zoo-learn-new-word-pic.jpg', audio: '../audio/zoo-how-to-say.mp3' },
    { word: 'Lion', translation: '- лев', image: '../img/new-words-pics/lion-learn-new-word-pic.jpg', audio: '../audio/lion-how-to-say.mp3' },
    { word: 'Tiger', translation: '- тигр', image: '../img/new-words-pics/tiger-learn-new-word-pic.jpg', audio: '../audio/tiger-how-to-say.mp3' },
    { word: 'Giraffe', translation: '- жираф', image: '../img/new-words-pics/giraffe-learn-new-word-pic.jpg', audio: '../audio/giraffe-how-to-say.mp3' },
    { word: 'Monkey', translation: '- мавпа', image: '../img/new-words-pics/monkey-learn-new-word-pic.jpg', audio: '../audio/monkey-how-to-say.mp3' },
    { word: 'Panda', translation: '- панда', image: '../img/new-words-pics/panda-learn-new-word-pic.jpg', audio: '../audio/panda-how-to-say.mp3' },
    { word: 'Bear', translation: '- ведмідь', image: '../img/new-words-pics/bear-learn-new-word-pic.jpg', audio: '../audio/bear-how-to-say.mp3' },
    { word: 'Turtle', translation: '- черепаха', image: '../img/new-words-pics/turtle-learn-new-word-pic.jpg', audio: '../audio/turtle-how-to-say.mp3' },
    { word: 'Crocodile', translation: '- крокодил', image: '../img/new-words-pics/crocodile-learn-new-word-pic.jpg', audio: '../audio/crocodile-how-to-say.mp3' },
    { word: 'Snake', translation: '- змія', image: '../img/new-words-pics/snake-learn-new-word-pic.jpg', audio: '../audio/snake-how-to-say.mp3' },

];

let currentIndex = 0;

function updateContent() {
    document.getElementById('new-word-text').innerText = words[currentIndex].word;
    document.getElementById('translation-text').innerText = words[currentIndex].translation;
    document.getElementById('word-pic-container').style.backgroundImage = `url(${words[currentIndex].image})`;
    document.getElementById('audio-player').src = words[currentIndex].audio;
}

function nextWord() {
    currentIndex = (currentIndex + 1) % words.length;
    updateContent();
}

function previousWord() {
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    updateContent();
}

function playAudio() {
    document.getElementById('audio-player').play();
}

// Ініціалізуємо початковий контент
updateContent();

let currentDraggedElement = null;
let selectedElement = null;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
    draggedElement.style.position = 'relative';
    draggedElement.style.top = '0';
    draggedElement.style.left = '0';
}

function checkAnswers() {
    var correctAnswers = {
        "tiger": "tiger-match-div",
        "lion": "lion-match-div",
        "bear": "bear-match-div",
        "panda": "panda-match-div",
        "monkey": "monkey-match-div",
        "zoo": "zoo-match-div",
        "giraffe": "giraffe-match-div",
        "snake": "snake-match-div",
        "crocodile": "crocodile-match-div",
        "turtle": "turtle-match-div"
    };

    var matches = document.querySelectorAll(".match-for-word-div");
    matches.forEach(function(match) {
        var word = match.querySelector(".word-to-match-div");
        if (word) {
            var correctDivId = correctAnswers[word.id];
            if (correctDivId && match.id === correctDivId) {
                match.style.border = "2px solid #01D664";
            } else {
                match.style.border = "2px solid #DD1919";
                if (correctDivId) {
                    match.querySelector(".word-to-match-text").innerText = document.getElementById(correctDivId).querySelector(".word-to-match-text").innerText;
                }
            }
        }
    });
}

function touchStart(event) {
    event.preventDefault();
    currentDraggedElement = event.target.closest('.word-to-match-div');
    currentDraggedElement.classList.add('dragging');
}

function touchMove(event) {
    event.preventDefault();
    if (currentDraggedElement) {
        var touch = event.touches[0];
        currentDraggedElement.style.position = 'absolute';
        currentDraggedElement.style.top = `${touch.clientY - currentDraggedElement.offsetHeight / 2}px`;
        currentDraggedElement.style.left = `${touch.clientX - currentDraggedElement.offsetWidth / 2}px`;

        // Скролінг під час перетягування
        const scrollSpeed = 5;
        if (touch.clientY > window.innerHeight - 50) {
            window.scrollBy(0, scrollSpeed);
        } else if (touch.clientY < 50) {
            window.scrollBy(0, -scrollSpeed);
        }
    }
}

function touchEnd(event) {
    event.preventDefault();
    var touch = event.changedTouches[0];
    var targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement && targetElement.classList.contains('match-for-word-div')) {
        targetElement.appendChild(currentDraggedElement);
        currentDraggedElement.style.position = 'relative';
        currentDraggedElement.style.top = '0';
        currentDraggedElement.style.left = '0';
    }
    currentDraggedElement.classList.remove('dragging');
    currentDraggedElement = null;
}

function selectWord(event) {
    if (selectedElement) {
        selectedElement.classList.remove('selected');
    }
    selectedElement = event.target.closest('.word-to-match-div');
    selectedElement.classList.add('selected');
}

function matchWord(event) {
    if (selectedElement) {
        event.target.appendChild(selectedElement);
        selectedElement.classList.remove('selected');
        selectedElement.style.position = 'relative';
        selectedElement.style.top = '0';
        selectedElement.style.left = '0';
        selectedElement = null;
    }
}

// Додайте обробники подій до всіх елементів з класом word-to-match-div та match-for-word-div
document.querySelectorAll('.word-to-match-div').forEach(function(wordDiv) {
    wordDiv.addEventListener('click', selectWord);
});

document.querySelectorAll('.match-for-word-div').forEach(function(matchDiv) {
    matchDiv.addEventListener('click', matchWord);
});



// Список треков
let track_list = [
    {
      name: "Zoo Listening",
      path: "../audio/zoo-listening-audio.mp3"
    }
];

// Индекс текущего трека
let current_track_index = 0;

// Элементы DOM
let play_btn = document.getElementById("play");
let seek_slider = document.getElementById("seek");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let btn_icon = document.querySelector(".btn-player-icon");

// Создание элемента аудио
let curr_track = new Audio();

// Загрузка первого трека
loadTrack(current_track_index);

// Функция для загрузки трека
function loadTrack(index) {
    // Обновление индекса текущего трека
    current_track_index = index;

    // Установка пути к аудио файлу
    curr_track.src = track_list[index].path;
    curr_track.load();

    // Установка начального значения слайдера на 0
    seek_slider.value = 0;
    seek_slider.style.setProperty("--percent", 0);

    // Обновление общей продолжительности
    curr_track.addEventListener("loadeddata", function() {
        let duration = formatTime(curr_track.duration);
        total_duration.textContent = duration;
    });

    curr_track.addEventListener("timeupdate", updateSeek);
}

// Обновить ползунок при загрузке страницы
window.addEventListener("load", function() {
    seek_slider.value = 0;
    seek_slider.style.setProperty("--percent", 0);
});

// Функция для форматирования времени в mm:ss
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds - min * 60);
    if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ":" + sec;
}

// Функция для воспроизведения или паузы трека
function playPauseTrack() {
    // Если трек на паузе, то воспроизвести его
    if (curr_track.paused) {
      curr_track.play();
      // Изменить иконку на паузу
      btn_icon.style.backgroundImage = "url('../icons/pause-the-audio-not-hover-icon.svg')";
    } else {
      // Если трек играет, то поставить на паузу
      curr_track.pause();
      // Изменить иконку на воспроизведение
      btn_icon.style.backgroundImage = "url('../icons/play-the-audio-not-hover-icon.svg')";
    }
}

// Функция для перемотки трека
function seekTo() {
    // Получить процент перемотки
    let seekto = curr_track.duration * (seek_slider.value / 100);
    // Перемотать трек
    curr_track.currentTime = seekto;
}

// Функция для обновления ползунка перемотки с помощью requestAnimationFrame
function updateSeek() {
    // Получить процент проигранного времени
    let seek = (curr_track.currentTime / curr_track.duration) * 100;
    // Обновить ползунок
    seek_slider.value = seek;
    // Обновить текущее время
    let current = formatTime(curr_track.currentTime);
    curr_time.textContent = current;
    // Обновить цвет слайдера
    requestAnimationFrame(() => {
        seek_slider.style.setProperty("--percent", seek + "%");
    });
}

// Добавить обработчик события для обновления ползунка перемотки
curr_track.addEventListener("timeupdate", updateSeek);

// Добавить обработчики событий для hover и active
play_btn.addEventListener("mouseover", function() {
    if (curr_track.paused) {
        btn_icon.style.backgroundImage = "url('../icons/play-the-audio-hover-icon.svg')";
    } else {
        btn_icon.style.backgroundImage = "url('../icons/pause-the-audio-hover-icon.svg')";
    }
});

play_btn.addEventListener("mouseout", function() {
    if (curr_track.paused) {
        btn_icon.style.backgroundImage = "url('../icons/play-the-audio-not-hover-icon.svg')";
    } else {
        btn_icon.style.backgroundImage = "url('../icons/pause-the-audio-not-hover-icon.svg')";
    }
});

play_btn.addEventListener("mousedown", function() {
    if (curr_track.paused) {
        btn_icon.style.backgroundImage = "url('../icons/play-the-audio-hover.svg')";
    } else {
        btn_icon.style.backgroundImage = "url('../icons/pause-the-audio-hover.svg')";
    }
});

play_btn.addEventListener("mouseup", function() {
    if (curr_track.paused) {
        btn_icon.style.backgroundImage = "url('../icons/play-the-audio-not-hover.svg')";
    } else {
        btn_icon.style.backgroundImage = "url('../icons/pause-the-audio-not-hover.svg')";
    }
});

// Для обробки активного стану використовуємо події mousedown і mouseup
play_btn.addEventListener("mousedown", function() {
    btn_icon.style.backgroundImage = (curr_track.paused) ? "url('../icons/play-the-audio-hover-icon.svg')" : "url('../icons/pause-the-audio-hover-icon.svg')";
});

play_btn.addEventListener("mouseup", function() {
    btn_icon.style.backgroundImage = (curr_track.paused) ? "url('../icons/play-the-audio-not-hover-icon.svg')" : "url('../icons/pause-the-audio-not-hover-icon.svg')";
});

// Добавить обработчик события для обновления ползунка перемотки
curr_track.addEventListener("timeupdate", updateSeek);

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
        "answer_1_2" : true,
        "answer_2_2" : true,
        "answer_3_1" : true,
        "answer_4_3" : true,
        "answer_5_1" : true
        
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



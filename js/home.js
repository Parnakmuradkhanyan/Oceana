// script.js
document.addEventListener('DOMContentLoaded', () => {
    const previousDateBtn = document.querySelector('.turn-to-previous-date-link');
    const nextDateBtn = document.querySelector('.turn-to-next-date-link');
    const dateElement = document.getElementById('date');
    const monthElement = document.getElementById('month');
    const plansForToday = document.getElementById('plansForToday');

    let currentDate = new Date(2025, 1, 28); // Assuming current date is 28th February 2025
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function updateDateDisplay() {
        dateElement.textContent = currentDate.getDate();
        monthElement.textContent = months[currentDate.getMonth()];
    }

    previousDateBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        updateDateDisplay();
    });

    nextDateBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        updateDateDisplay();
    });
    
    updateDateDisplay();
});

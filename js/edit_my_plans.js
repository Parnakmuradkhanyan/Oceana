// script.js
document.addEventListener('DOMContentLoaded', () => {
    const previousDateBtn = document.querySelector('.turn-to-previous-date-link');
    const nextDateBtn = document.querySelector('.turn-to-next-date-link');
    const addPlanBtn = document.getElementById('addNewPlan');
    const deleteLastPlanBtn = document.getElementById('deleteLastPlan');
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

    addPlanBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form from submitting and reloading the page
        console.log('Adding new plan...');
        const newPlan = document.createElement('li');
        newPlan.className = 'plan-container';

        newPlan.innerHTML = `
            <div class="time-container">
                <div class="time-begin-container">
                    <input type="text" class="hour-begin-input" required>
                    <p class="two-dots-text">:</p>
                    <input type="text" class="minute-begin-input" required>
                </div>
                <p class="miuns-till-time">-</p>
                <div class="time-finish-container">
                    <input type="text" class="hour-finish-input" required>
                    <p class="two-dots-text">:</p>
                    <input type="text" class="minute-finish-input" required>
                </div>
            </div>
            <input type="text" class="activity-name-input" required>
        `;

        plansForToday.appendChild(newPlan);
        console.log('New plan added.');
    });

    deleteLastPlanBtn.addEventListener('click', () => {
        const lastPlan = plansForToday.lastElementChild;
        if (lastPlan) {
            plansForToday.removeChild(lastPlan);
            console.log('Last plan deleted.');
        } else {
            alert('No plans to delete.');
        }
    });

    updateDateDisplay();
});

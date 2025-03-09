document.addEventListener('DOMContentLoaded', () => {

    class ChangeMyPlans {

        constructor() {

            this.currentDate = new Date(2025, 1, 28); // Assuming current date is 28th February 2025
            this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            this.dateParagraph = document.getElementById('date');
            this.monthParagraph = document.getElementById('month');
            this.plansForToday = document.getElementById('plansForToday');
            this.previousDateBtn = document.querySelector('.turn-to-previous-date-link');
            this.nextDateBtn = document.querySelector('.turn-to-next-date-link');
            this.addPlanBtn = document.getElementById('addNewPlan');
            this.deleteLastPlanBtn = document.getElementById('deleteLastPlan');

            this.updateDateShow();

            this.previousDateBtn.addEventListener('click', () => {
                this.changeDate(-1);
            });

            this.nextDateBtn.addEventListener('click', () => {
                this.changeDate(1);
            });

            this.addPlanBtn.addEventListener('click', (event) => {
                event.preventDefault();
                this.addPlan();
            });

            this.deleteLastPlanBtn.addEventListener('click', () => {
                this.deleteLastPlan();
            });

        }

        updateDateShow() {

            this.dateParagraph.textContent = this.currentDate.getDate();
            this.monthParagraph.textContent = this.months[this.currentDate.getMonth()];

        }

        changeDate(days) {

            this.currentDate.setDate(this.currentDate.getDate() + days);
            this.updateDateShow();

        }

        addPlan() {
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

            this.plansForToday.appendChild(newPlan);
            console.log('New plan added.');
        }

        deleteLastPlan() {

            const lastPlan = this.plansForToday.lastElementChild;
            if (lastPlan) {
                this.plansForToday.removeChild(lastPlan);
            } else {
                alert('No plans to delete.');
            }

        }
    }

    new ChangeMyPlans();

});

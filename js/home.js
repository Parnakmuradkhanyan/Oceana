document.addEventListener('DOMContentLoaded', () => {

    class ChangeMyPlans {

        constructor() {

            this.currentDate = new Date(2025, 1, 28);
            this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            this.dateParagraph = document.getElementById('date');
            this.monthParagraph = document.getElementById('month');
            this.previousDateBtn = document.querySelector('.turn-to-previous-date-link');
            this.nextDateBtn = document.querySelector('.turn-to-next-date-link');

            this.updateDateShow();

            this.previousDateBtn.addEventListener('click', () => {
                this.changeDate(-1);
            });

            this.nextDateBtn.addEventListener('click', () => {
                this.changeDate(1);
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
    }

    new ChangeMyPlans();

});


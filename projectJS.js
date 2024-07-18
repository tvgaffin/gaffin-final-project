function generateMealPlan() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const goal = document.getElementById('goal').value;

    // Ensure email is valid
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const meals = ['Breakfast', 'Snack1', 'Lunch', 'Snack2', 'Dinner'];
    let mealPlanHTML = `<h1>${name}'s Meal Plan for the Week</h1><p>Email: ${email}</p><p>Goal: ${goal}</p>`;
    let mealPlanText = `${name}'s Meal Plan for the Week\nEmail: ${email}\nGoal: ${goal}\n\n`;

    days.forEach(day => {
        mealPlanHTML += `<h2>${capitalizeFirstLetter(day)}</h2>`;
        mealPlanText += `${capitalizeFirstLetter(day)}\n`;
        meals.forEach(meal => {
            const mealValue = document.getElementById(`${day}${meal}`).value;
            mealPlanHTML += `<p>${meal.replace('1', ' 1').replace('2', ' 2')}: ${mealValue}</p>`;
            mealPlanText += `${meal.replace('1', ' 1').replace('2', ' 2')}: ${mealValue}\n`;
        });
        mealPlanText += '\n';
    });

    // Store the meal plan text for download
    document.getElementById('mealPlanText').value = mealPlanText;

    // Generate a new web page
    const newWindow = window.open();
    newWindow.document.write(`
        <html>
            <head>
                <title>Meal Plan</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    h1, h2 {
                        color: #0066cc;
                    }
                    p {
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                ${mealPlanHTML}
            </body>
        </html>
    `);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function printPlanner() {
    window.print();
}

function downloadPlanner() {
    const mealPlanText = document.getElementById('mealPlanText').value;
    const blob = new Blob([mealPlanText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mealPlan.txt';
    link.click();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

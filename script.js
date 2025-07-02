const schedule = [
    {   day: "Monday", subject: "Database Management Systems (CSEN2061)", time: "8:00 - 9:00", faculty: "A Phani Sheetal", classroom: "B511" },
    { day: "Monday", subject: "Artificial Intelligence (CSEN2031)", time: "9:00 - 10:00", faculty: "Sarat Chandra Nayak", classroom: "B511" },
    { day: "Monday", subject: "Soft Skills (CLAD2001)", time: "10:00 - 12:00", faculty: "CSE CLAD Faculty5", classroom: "A516" },
    { day: "Monday", subject: "Technology of Spices (MFST3491)", time: "12:00 - 1:00", faculty: "Ayenampudi Surendra Babu", classroom: "A521" },
    { day: "Monday", subject: "Design & Analysis of Algorithms (CSEN3001)", time: "2:00 - 3:00", faculty: "Maramreddy Yogi Reddy", classroom: "B506" },

    { day: "Tuesday", subject: "Introduction to Competitive Programming (CSEN2191)", time: "8:00 - 9:00", faculty: "Rass mohammed", classroom: "A414" },
    { day: "Tuesday", subject: "Formal Languages & Automata (CSEN2041)", time: "9:00 - 10:00", faculty: "Kakali Das", classroom: "B511" },
    { day: "Tuesday", subject: "DBMS Lab (CSEN2061P)", time: "10:00 - 12:00", faculty: "A Phani Sheetal", classroom: "B408" },
    { day: "Tuesday", subject: "Technology of Spices (MFST3491)", time: "12:00 - 1:00", faculty: "Ayenampudi Surendra Babu", classroom: "A521" },
    { day: "Tuesday", subject: "Additive Manufacturing (MECH3091)", time: "2:00 - 3:00", faculty: "Punna Eshwaraiah", classroom: "A421" },

    { day: "Wednesday", subject: "Competitive Programming Lab (CSEN2191P)", time: "8:00 - 10:00", faculty: "Rass mohammed", classroom: "B506" },
    { day: "Wednesday", subject: "AI Lab (CSEN2031P)", time: "10:00 - 12:00", faculty: "Sarat Chandra Nayak", classroom: "B406" },
    { day: "Wednesday", subject: "Technology of Spices (MFST3491)", time: "12:00 - 1:00", faculty: "Ayenampudi Surendra Babu", classroom: "A521" },
    { day: "Wednesday", subject: "Design & Analysis of Algorithms (CSEN3001)", time: "3:00 - 4:00", faculty: "Maramreddy Yogi Reddy", classroom: "B506" },

    { day: "Thursday", subject: "Artificial Intelligence (CSEN2031)", time: "8:00 - 9:00", faculty: "Sarat Chandra Nayak", classroom: "B511" },
    { day: "Thursday", subject: "Database Management Systems (CSEN2061)", time: "9:00 - 10:00", faculty: "A Phani Sheetal", classroom: "B511" },
    { day: "Thursday", subject: "Competitive Programming Lab (CSEN2191P)", time: "10:00 - 12:00", faculty: "Rass mohammed", classroom: "B506" },
    { day: "Thursday", subject: "Additive Manufacturing (MECH3091)", time: "12:00 - 1:00", faculty: "Punna Eshwaraiah", classroom: "A421" },
    { day: "Thursday", subject: "Formal Languages & Automata (CSEN2041)", time: "2:00 - 3:00", faculty: "Kakali Das", classroom: "B511" },

    { day: "Friday", subject: "Database Management Systems (CSEN2061)", time: "8:00 - 9:00", faculty: "A Phani Sheetal", classroom: "B511" },
    { day: "Friday", subject: "Artificial Intelligence (CSEN2031)", time: "9:00 - 10:00", faculty: "Sarat Chandra Nayak", classroom: "B511" },
    { day: "Friday", subject: "Formal Languages & Automata (CSEN2041)", time: "10:00 - 11:00", faculty: "Kakali Das", classroom: "B511" },
    { day: "Friday", subject: "Design & Analysis of Algorithms (CSEN3001)", time: "11:00 - 12:00", faculty: "Maramreddy Yogi Reddy", classroom: "B506" },
    { day: "Friday", subject: "Additive Manufacturing (MECH3091)", time: "12:00 - 1:00", faculty: "Punna Eshwaraiah", classroom: "A421" }
];

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
const timetable = document.getElementById('timetable');

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

daysOfWeek.forEach(day => {
    const daySection = document.createElement('div');
    daySection.className = 'day-section';
    const header = document.createElement('h2');
    header.textContent = day;
    daySection.appendChild(header);

    schedule.filter(slot => slot.day === day).forEach(slot => {
    const card = document.createElement('div');
    card.className = 'card';
    if (slot.day === today) card.classList.add('highlight');

    card.innerHTML = `
        <div class="time">🕒 ${slot.time}</div>
        <div class="subject">📘 ${slot.subject}</div>
        <div class="faculty">👨‍🏫 ${slot.faculty}</div>
        <div class="classroom">🏫 ${slot.classroom}</div>
    `;

    daySection.appendChild(card);
    });

    timetable.appendChild(daySection);
});

// Notification Feature
if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

function scheduleNotifications() {
    const now = new Date();
    const todayDay = now.toLocaleDateString('en-US', { weekday: 'long' });

    schedule.forEach(slot => {
    if (slot.day !== todayDay) return;

    const [startHour, startMin] = slot.time.split(' - ')[0].split(':').map(Number);
    const classTime = new Date();
    classTime.setHours(startHour, startMin - 5, 0, 0); // 5 minutes before

    const delay = classTime.getTime() - now.getTime();

    if (delay > 0) {
        setTimeout(() => {
        new Notification(`Upcoming Class: ${slot.subject}`, {
            body: `Starts at ${slot.time}. Faculty: ${slot.faculty}. Room: ${slot.classroom}`,
            icon: "https://cdn-icons-png.flaticon.com/512/3909/3909444.png"
        });
        }, delay);
    }
    });
}

if (Notification.permission === 'granted') {
    scheduleNotifications();
}

// Toggle View and Theme Setup
const viewToggle = document.createElement('button');
viewToggle.textContent = 'Toggle Day/Week View';
viewToggle.className = 'toggle-btn';

document.body.insertBefore(viewToggle, timetable);

const themeToggle = document.createElement('button');
themeToggle.textContent = 'Toggle Dark/Light Mode';
themeToggle.className = 'toggle-btn';

document.body.insertBefore(themeToggle, timetable);

let isDayView = false;
let isDarkTheme = true;

viewToggle.addEventListener('click', () => {
    isDayView = !isDayView;
    renderSchedule();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    isDarkTheme = !isDarkTheme;
});

function renderSchedule() {
    timetable.innerHTML = '';
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const days = isDayView ? [currentDay] : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    days.forEach(day => {
    const daySection = document.createElement('div');
    daySection.className = 'day-section';
    const header = document.createElement('h2');
    header.textContent = day;
    daySection.appendChild(header);

    schedule.filter(slot => slot.day === day).forEach(slot => {
        const card = document.createElement('div');
        card.className = 'card';
        if (slot.day === currentDay) card.classList.add('highlight');

        card.innerHTML = `
        <div class="time">🕒 ${slot.time}</div>
        <div class="subject">📘 ${slot.subject}</div>
        <div class="faculty">👨‍🏫 ${slot.faculty}</div>
        <div class="classroom">🏫 ${slot.classroom}</div>
        `;

        daySection.appendChild(card);
    });

    timetable.appendChild(daySection);
    });
}

renderSchedule();

// Notification Feature
if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
}

function scheduleNotifications() {
    const now = new Date();
    const todayDay = now.toLocaleDateString('en-US', { weekday: 'long' });

    schedule.forEach(slot => {
    if (slot.day !== todayDay) return;

    const [startHour, startMin] = slot.time.split(' - ')[0].split(':').map(Number);
    const classTime = new Date();
    classTime.setHours(startHour, startMin - 5, 0, 0); // 5 minutes before

    const delay = classTime.getTime() - now.getTime();

    if (delay > 0) {
        setTimeout(() => {
        new Notification(`Upcoming Class: ${slot.subject}`, {
            body: `Starts at ${slot.time}. Faculty: ${slot.faculty}. Room: ${slot.classroom}`,
            icon: "https://cdn-icons-png.flaticon.com/512/3909/3909444.png"
        });
        }, delay);
    }
    });
}

if (Notification.permission === 'granted') {
    scheduleNotifications();
}

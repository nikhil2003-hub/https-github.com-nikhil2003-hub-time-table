const schedule = [
    { day: "Monday", subject: "Database Management Systems (CSEN2061)", time: "08:00 - 08:50", faculty: "A Phani Sheetal", classroom: "B511" },
    { day: "Monday", subject: "Artificial Intelligence (CSEN2031)", time: "09:00 - 09:50", faculty: "Sarat Chandra Nayak", classroom: "B511" },
    { day: "Monday", subject: "Soft Skills (CLAD2001)", time: "10:00 - 10:50", faculty: "CSE CLAD Faculty5", classroom: "A516" },
    { day: "Monday", subject: "Soft Skills (CLAD2001)", time: "11:00 - 11:50", faculty: "CSE CLAD Faculty5", classroom: "A516" },
    { day: "Monday", subject: "Technology of Spices (MFST3491)", time: "12:00 - 12:50", faculty: "Ayenampudi Surendra Babu", classroom: "A521" },
    { day: "Monday", subject: "Design & Analysis of Algorithms (CSEN3001)", time: "14:00 - 14:50", faculty: "Maramreddy Yogi Reddy", classroom: "A516" },

    { day: "Tuesday", subject: "Formal Languages & Automata (CSEN2041)", time: "08:00 - 08:50", faculty: "Kakali Das", classroom: "B511" },
    { day: "Tuesday", subject: "Introduction to Competitive Programming (CSEN2191)", time: "09:00 - 09:50", faculty: "Rajmohammed Mohammed", classroom: "A517" },
    { day: "Tuesday", subject: "DBMS Lab (CSEN2061P)", time: "10:00 - 10:50", faculty: "A Phani Sheetal", classroom: "B408" },
    { day: "Tuesday", subject: "DBMS Lab (CSEN2061P)", time: "11:00 - 11:50", faculty: "A Phani Sheetal", classroom: "B408" },
    { day: "Tuesday", subject: "Technology of Spices (MFST3491)", time: "12:00 - 12:50", faculty: "Ayenampudi Surendra Babu", classroom: "A521" },
    { day: "Tuesday", subject: "Additive Manufacturing (MECH3091)", time: "14:00 - 14:50", faculty: "Punna Eshwaraiah", classroom: "A421" },

    { day: "Wednesday", subject: "Competitive Programming Lab (CSEN2191P)", time: "08:00 - 08:50", faculty: "Rajmohammed Mohammed", classroom: "B506" },
    { day: "Wednesday", subject: "Competitive Programming Lab (CSEN2191P)", time: "09:00 - 09:50", faculty: "Rajmohammed Mohammed", classroom: "B506" },
    { day: "Wednesday", subject: "AI Lab (CSEN2031P)", time: "10:00 - 10:50", faculty: "Sarat Chandra Nayak", classroom: "B406" },
    { day: "Wednesday", subject: "AI Lab (CSEN2031P)", time: "11:00 - 11:50", faculty: "Sarat Chandra Nayak", classroom: "B406" },
    { day: "Wednesday", subject: "Technology of Spices (MFST3491)", time: "12:00 - 12:50", faculty: "Ayenampudi Surendra Babu", classroom: "A521" },
    { day: "Wednesday", subject: "Design & Analysis of Algorithms (CSEN3001)", time: "15:00 - 15:50", faculty: "Maramreddy Yogi Reddy", classroom: "A516" },

    { day: "Thursday", subject: "Artificial Intelligence (CSEN2031)", time: "08:00 - 08:50", faculty: "Sarat Chandra Nayak", classroom: "B511" },
    { day: "Thursday", subject: "Database Management Systems (CSEN2061)", time: "09:00 - 09:50", faculty: "A Phani Sheetal", classroom: "B511" },
    { day: "Thursday", subject: "Competitive Programming Lab (CSEN2191P)", time: "10:00 - 10:50", faculty: "Rajmohammed Mohammed", classroom: "B507" },
    { day: "Thursday", subject: "Competitive Programming Lab (CSEN2191P)", time: "11:00 - 11:50", faculty: "Rajmohammed Mohammed", classroom: "B507" },
    { day: "Thursday", subject: "Additive Manufacturing (MECH3091)", time: "12:00 - 12:50", faculty: "Punna Eshwaraiah", classroom: "A421" },
    { day: "Thursday", subject: "Formal Languages & Automata (CSEN2041)", time: "14:00 - 14:50", faculty: "Kakali Das", classroom: "B511" },

    { day: "Friday", subject: "Database Management Systems (CSEN2061)", time: "08:00 - 08:50", faculty: "A Phani Sheetal", classroom: "B511" },
    { day: "Friday", subject: "Artificial Intelligence (CSEN2031)", time: "09:00 - 09:50", faculty: "Sarat Chandra Nayak", classroom: "B511" },
    { day: "Friday", subject: "Formal Languages & Automata (CSEN2041)", time: "10:00 - 10:50", faculty: "Kakali Das", classroom: "B511" },
    { day: "Friday", subject: "Design & Analysis of Algorithms (CSEN3001)", time: "11:00 - 11:50", faculty: "Maramreddy Yogi Reddy", classroom: "A516" },
    { day: "Friday", subject: "Additive Manufacturing (MECH3091)", time: "12:00 - 12:50", faculty: "Punna Eshwaraiah", classroom: "A421" },
];

const timetable = document.getElementById('timetable');
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function renderSchedule() {
    timetable.innerHTML = '';

    const today = new Date();
    const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });

    daysOfWeek.forEach(day => {
        const section = document.createElement('div');
        section.className = 'day-section';
        section.id = `day-${day}`;

        const heading = document.createElement('h2');
        heading.textContent = day;
        section.appendChild(heading);

        schedule
            .filter(item => item.day === day)
            .forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                if (item.day === currentDay) {
                    card.classList.add('highlight');
                }

                card.innerHTML = `
                    <div class="time">🕒 ${item.time}</div>
                    <div class="subject">📘 ${item.subject}</div>
                    <div class="faculty">👨‍🏫 ${item.faculty}</div>
                    <div class="classroom">🏫 ${item.classroom}</div>
                `;
                section.appendChild(card);
            });

        timetable.appendChild(section);
    });

    // Auto scroll to today's section if it's a weekday
    if (daysOfWeek.includes(currentDay)) {
        const todaySection = document.getElementById(`day-${currentDay}`);
        if (todaySection) {
            setTimeout(() => {
                todaySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    }
}

renderSchedule();

// Simple Data Storage
let students = [];
let teachers = [];
let classes = [];
let attendanceRecords = [];
let notices = [];

// Utility: Clear Form Inputs
function clearForm(formId) {
    document.getElementById(formId).reset();
}

// Utility: Show Notification
function showNotification(message) {
    const notification = document.getElementById('realTimeNotifications');
    notification.querySelector('p').textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 5000);
}

// Utility: Show or Hide Sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.toggle('hidden', section.id !== sectionId);
    });
}

// =======================
// Student Management
// =======================

// Add Student
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const age = parseInt(document.getElementById('studentAge').value.trim());
    const grade = document.getElementById('studentGrade').value.trim();

    if (!name || isNaN(age) || !grade) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const student = { id: Date.now(), name, age, grade };
    students.push(student);
    renderStudents();
    clearForm('studentForm');
    showNotification('Student added successfully!');
});

// Render Students in Table
function renderStudents() {
    const studentTable = document.getElementById('studentsTable');
    studentTable.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTable.appendChild(row);
    });

    document.getElementById('totalStudents').textContent = students.length;
}

// Edit Student
function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentAge').value = student.age;
    document.getElementById('studentGrade').value = student.grade;

    students.splice(index, 1);
    renderStudents();
}

// Delete Student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        renderStudents();
        showNotification('Student deleted successfully!');
    }
}

// =======================
// Teacher Management
// =======================

// Add Teacher
document.getElementById('teacherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('teacherName').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const contact = document.getElementById('contact').value.trim();

    if (!name || !subject || !contact) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const teacher = { id: Date.now(), name, subject, contact };
    teachers.push(teacher);
    renderTeachers();
    clearForm('teacherForm');
    showNotification('Teacher added successfully!');
});

// Render Teachers in Table
function renderTeachers() {
    const teacherTable = document.getElementById('teachersTable');
    teacherTable.innerHTML = '';

    teachers.forEach((teacher, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.contact}</td>
            <td>
                <button onclick="deleteTeacher(${index})">Delete</button>
            </td>
        `;
        teacherTable.appendChild(row);
    });

    document.getElementById('totalTeachers').textContent = teachers.length;
}

// Delete Teacher
function deleteTeacher(index) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        teachers.splice(index, 1);
        renderTeachers();
        showNotification('Teacher deleted successfully!');
    }
}

// =======================
// FullCalendar Initialization
// =======================

$(document).ready(function () {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: [
            {
                title: 'Math Exam',
                start: '2024-12-01',
                description: 'Final Math Exam'
            },
            {
                title: 'Parent-Teacher Meeting',
                start: '2024-12-10',
                description: 'Discuss student progress'
            }
        ],
        eventClick: function (event) {
            alert(event.title + '\n' + event.description);
        }
    });
});

// =======================
// Exam Timer
// =======================

let examTime = 120; // Exam duration in minutes
function startExamTimer() {
    const timerDisplay = document.getElementById('examTimer');
    let timer = setInterval(function () {
        if (examTime <= 0) {
            clearInterval(timer);
            alert("Time's up!");
        } else {
            timerDisplay.textContent = `${examTime} minutes remaining`;
            examTime--;
        }
    }, 60000); // Update every minute
}

// =======================
// Profile Picture Update
// =======================

function changeProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = function (e) {
        const reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('profileImg').src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    input.click();
}

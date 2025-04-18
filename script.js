// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Sample data
    let students = [
        {
            id: "STU001",
            name: "John Smith",
            class: "5",
            gender: "male",
            dob: "2010-05-15",
            parentName: "Michael Smith",
            contactNumber: "555-123-4567",
            address: "123 Main Street, Anytown",
            email: "smith@example.com",
            admissionDate: "2021-09-01",
            feeStatus: "paid",
            attendance: 95
        },
        {
            id: "STU002",
            name: "Emily Johnson",
            class: "4",
            gender: "female",
            dob: "2011-03-22",
            parentName: "David Johnson",
            contactNumber: "555-234-5678",
            address: "456 Oak Avenue, Somewhere",
            email: "johnson@example.com",
            admissionDate: "2022-09-01",
            feeStatus: "pending",
            attendance: 90
        },
        {
            id: "STU003",
            name: "Michael Brown",
            class: "3",
            gender: "male",
            dob: "2012-11-08",
            parentName: "Sarah Brown",
            contactNumber: "555-345-6789",
            address: "789 Pine Road, Nowhere",
            email: "brown@example.com",
            admissionDate: "2023-09-01",
            feeStatus: "overdue",
            attendance: 85
        },
        {
            id: "STU004",
            name: "Sophia Williams",
            class: "2",
            gender: "female",
            dob: "2013-07-19",
            parentName: "Robert Williams",
            contactNumber: "555-456-7890",
            address: "101 Elm Street, Anywhere",
            email: "williams@example.com",
            admissionDate: "2022-09-01",
            feeStatus: "paid",
            attendance: 98
        },
        {
            id: "STU005",
            name: "Daniel Miller",
            class: "1",
            gender: "male",
            dob: "2014-09-25",
            parentName: "Jennifer Miller",
            contactNumber: "555-567-8901",
            address: "202 Maple Avenue, Elsewhere",
            email: "miller@example.com",
            admissionDate: "2023-09-01",
            feeStatus: "pending",
            attendance: 92
        }
    ];

    let attendance = {
        // Sample attendance data
        "2025-04-08": {
            "STU001": "present",
            "STU002": "present",
            "STU003": "absent",
            "STU004": "present",
            "STU005": "late"
        }
    };

    let grades = {
        // Sample grades data
        "midterm": {
            "math": {
                "STU001": 85,
                "STU002": 78,
                "STU003": 65,
                "STU004": 92,
                "STU005": 80
            },
            "science": {
                "STU001": 88,
                "STU002": 75,
                "STU003": 70,
                "STU004": 95,
                "STU005": 82
            }
        }
    };

    let fees = {
        // Sample fees data
        "apr": {
            "STU001": { amount: 500, status: "paid", dueDate: "2025-04-10" },
            "STU002": { amount: 500, status: "pending", dueDate: "2025-04-10" },
            "STU003": { amount: 450, status: "overdue", dueDate: "2025-04-01" },
            "STU004": { amount: 400, status: "paid", dueDate: "2025-04-10" },
            "STU005": { amount: 400, status: "pending", dueDate: "2025-04-10" }
        }
    };

    // Navigation functionality
    function setupNavigation() {
        const navItems = document.querySelectorAll('.nav li, .sidebar a');
        const sections = document.querySelectorAll('#content-area > section');

        navItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const target = this.querySelector('a') ?
                    this.querySelector('a').getAttribute('href').substring(1) :
                    this.getAttribute('href').substring(1);

                // Hide all sections
                sections.forEach(section => {
                    section.classList.remove('active-section');
                });

                // Show the target section
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.classList.add('active-section');
                }

                // Update active nav item
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });

                this.classList.add('active');
            });
        });
    }

    // Modal functionality
    function setupModals() {
        const studentModal = document.getElementById('student-modal');
        const paymentModal = document.getElementById('payment-modal');
        const closeButtons = document.querySelectorAll('.close');
        const addStudentBtn = document.getElementById('add-student-btn');
        const cancelBtn = document.getElementById('cancel-btn');
        const cancelPaymentBtn = document.getElementById('cancel-payment-btn');
        const saveStudentBtn = document.getElementById('save-student');
        const savePaymentBtn = document.getElementById('save-payment');

        if (addStudentBtn) {
            // Open student modal
            addStudentBtn.addEventListener('click', function () {
                document.getElementById('modal-title').textContent = 'Add New Student';
                document.getElementById('student-form').reset();
                document.getElementById('student-id').value = generateStudentId();
                document.getElementById('admission-date').value = getCurrentDate();
                studentModal.style.display = 'block';
            });
        }

        // Close modals
        closeButtons.forEach(button => {
            button.addEventListener('click', function () {
                if (studentModal) studentModal.style.display = 'none';
                if (paymentModal) paymentModal.style.display = 'none';
            });
        });

        // Cancel buttons
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function () {
                studentModal.style.display = 'none';
            });
        }

        if (cancelPaymentBtn) {
            cancelPaymentBtn.addEventListener('click', function () {
                paymentModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', function (event) {
            if (studentModal && event.target === studentModal) {
                studentModal.style.display = 'none';
            }
            if (paymentModal && event.target === paymentModal) {
                paymentModal.style.display = 'none';
            }
        });

        // Save student
        if (saveStudentBtn) {
            saveStudentBtn.addEventListener('click', function () {
                const studentId = document.getElementById('student-id').value;
                const studentName = document.getElementById('student-name').value;
                const studentClass = document.getElementById('student-class').value;
                const studentGender = document.getElementById('student-gender').value;
                const studentDob = document.getElementById('student-dob').value;
                const parentName = document.getElementById('parent-name').value;
                const contactNumber = document.getElementById('contact-number').value;
                const address = document.getElementById('address').value;
                const email = document.getElementById('email').value;
                const admissionDate = document.getElementById('admission-date').value;

                // Validation
                if (!studentName || !studentClass || !contactNumber) {
                    alert("Please fill all required fields");
                    return;
                }

                // Check if we're editing or adding
                const existingStudentIndex = students.findIndex(s => s.id === studentId);

                const studentData = {
                    id: studentId,
                    name: studentName,
                    class: studentClass,
                    gender: studentGender,
                    dob: studentDob,
                    parentName: parentName,
                    contactNumber: contactNumber,
                    address: address,
                    email: email,
                    admissionDate: admissionDate,
                    feeStatus: existingStudentIndex >= 0 ? students[existingStudentIndex].feeStatus : "pending",
                    attendance: existingStudentIndex >= 0 ? students[existingStudentIndex].attendance : 0
                };

                if (existingStudentIndex >= 0) {
                    // Update existing student
                    students[existingStudentIndex] = studentData;
                } else {
                    // Add new student
                    students.push(studentData);
                }

                // Close modal
                studentModal.style.display = 'none';

                // Refresh student list
                renderStudents();
                renderDashboard();
            });
        }

        // Save payment
        if (savePaymentBtn) {
            savePaymentBtn.addEventListener('click', function () {
                const studentId = document.getElementById('payment-student-id').value;
                const amount = document.getElementById('payment-amount').value;
                const date = document.getElementById('payment-date').value;
                const method = document.getElementById('payment-method').value;

                // Validation
                if (!amount || !date || !method) {
                    alert("Please fill all required fields");
                    return;
                }

                // Update fee status
                const currentMonth = getCurrentMonthCode();
                if (!fees[currentMonth]) {
                    fees[currentMonth] = {};
                }

                fees[currentMonth][studentId] = {
                    amount: parseInt(amount),
                    status: "paid",
                    dueDate: date
                };

                // Update student record
                const studentIndex = students.findIndex(s => s.id === studentId);
                if (studentIndex >= 0) {
                    students[studentIndex].feeStatus = "paid";
                }

                // Close modal
                paymentModal.style.display = 'none';

                // Refresh fee list
                renderFees();
                renderDashboard();
            });
        }
    }

    // Initialize app content
    function initApp() {
        setupNavigation();
        setupModals();

        renderDashboard();
        renderStudents();
        renderAttendance();
        renderGrades();
        renderFees();

        // Set current date for attendance
        const attendanceDate = document.getElementById('attendance-date');
        if (attendanceDate) {
            attendanceDate.value = getCurrentDate();
        }
    }

    // Render dashboard content
    function renderDashboard() {
        // Update stats
        const totalStudentsEl = document.querySelector('.total-students');
        if (totalStudentsEl) {
            totalStudentsEl.textContent = students.length;
        }

        // Calculate attendance rate
        const today = getCurrentDate();
        let presentCount = 0;
        if (attendance[today]) {
            Object.values(attendance[today]).forEach(status => {
                if (status === 'present' || status === 'late') {
                    presentCount++;
                }
            });
        }
        const attendanceRate = students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0;
        const attendanceRateEl = document.querySelector('.attendance-rate');
        if (attendanceRateEl) {
            attendanceRateEl.textContent = `${attendanceRate}%`;
        }

        // Calculate fee collection
        const currentMonth = getCurrentMonthCode();
        let feeCollection = 0;
        if (fees[currentMonth]) {
            Object.values(fees[currentMonth]).forEach(fee => {
                if (fee.status === 'paid') {
                    feeCollection += fee.amount;
                }
            });
        }
        const feeCollectionEl = document.querySelector('.fee-collection');
        if (feeCollectionEl) {
            feeCollectionEl.textContent = `₹${feeCollection}`;
        }

        // Calculate average performance
        let totalGrade = 0;
        let gradeCount = 0;
        if (grades.midterm && grades.midterm.math) {
            Object.values(grades.midterm.math).forEach(grade => {
                totalGrade += grade;
                gradeCount++;
            });
        }
        const avgPerformance = gradeCount > 0 ? Math.round(totalGrade / gradeCount) : 0;
        const avgPerformanceEl = document.querySelector('.avg-performance');
        if (avgPerformanceEl) {
            avgPerformanceEl.textContent = `${avgPerformance}%`;
        }

        // Render recent students
        const recentStudentsBody = document.getElementById('recent-students-body');
        if (recentStudentsBody) {
            recentStudentsBody.innerHTML = '';

            // Display 5 most recent students (or fewer if less exist)
            const recentStudents = [...students].reverse().slice(0, 5);

            recentStudents.forEach(student => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>Class ${student.class}</td>
                    <td><span class="badge-status badge-${student.feeStatus}">${capitalizeFirstLetter(student.feeStatus)}</span></td>
                    <td>${student.attendance}%</td>
                `;

                recentStudentsBody.appendChild(row);
            });
        }
    }

    // Render student list
    function renderStudents() {
        const studentsTableBody = document.getElementById('students-table-body');
        if (!studentsTableBody) return;

        studentsTableBody.innerHTML = '';

        const classFilter = document.getElementById('class-filter');
        const searchInput = document.getElementById('student-search');

        let filteredStudents = [...students];

        // Apply class filter if exists
        if (classFilter && classFilter.value !== 'all') {
            filteredStudents = filteredStudents.filter(student => student.class === classFilter.value);
        }

        // Apply search filter if exists
        if (searchInput && searchInput.value) {
            const searchQuery = searchInput.value.toLowerCase();
            filteredStudents = filteredStudents.filter(student =>
                student.id.toLowerCase().includes(searchQuery) ||
                student.name.toLowerCase().includes(searchQuery)
            );
        }

        filteredStudents.forEach(student => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>Class ${student.class}</td>
                <td>${capitalizeFirstLetter(student.gender)}</td>
                <td>${student.contactNumber}</td>
                <td><span class="badge-status badge-${student.feeStatus}">${capitalizeFirstLetter(student.feeStatus)}</span></td>
                <td class="action-buttons">
                    <button class="action-btn edit-btn" data-id="${student.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" data-id="${student.id}"><i class="fas fa-trash"></i></button>
                    <button class="action-btn payment-btn" data-id="${student.id}"><i class="fas fa-dollar-sign"></i></button>
                </td>
            `;

            studentsTableBody.appendChild(row);
        });

        // Attach event handlers
        attachStudentEventHandlers();

        // Add event listeners for filter changes
        if (classFilter) {
            classFilter.addEventListener('change', renderStudents);
        }

        if (searchInput) {
            searchInput.addEventListener('input', renderStudents);
        }
    }

    // Attach event handlers for student actions
    function attachStudentEventHandlers() {
        // Attach edit event handlers
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const studentId = this.getAttribute('data-id');
                editStudent(studentId);
            });
        });

        // Attach delete event handlers
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const studentId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this student?')) {
                    deleteStudent(studentId);
                }
            });
        });

        // Attach payment event handlers
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const studentId = this.getAttribute('data-id');
                openPaymentModal(studentId);
            });
        });
    }

    // Edit student
    function editStudent(studentId) {
        const studentModal = document.getElementById('student-modal');
        if (!studentModal) return;

        const student = students.find(s => s.id === studentId);
        if (!student) return;

        document.getElementById('modal-title').textContent = 'Edit Student';
        document.getElementById('student-id').value = student.id;
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-class').value = student.class;
        document.getElementById('student-gender').value = student.gender;
        document.getElementById('student-dob').value = student.dob;
        document.getElementById('parent-name').value = student.parentName;
        document.getElementById('contact-number').value = student.contactNumber;
        document.getElementById('address').value = student.address;
        document.getElementById('email').value = student.email;
        document.getElementById('admission-date').value = student.admissionDate;

        studentModal.style.display = 'block';
    }

    // Delete student
    function deleteStudent(studentId) {
        students = students.filter(s => s.id !== studentId);
        renderStudents();
        renderDashboard();
    }

    // Open payment modal
    function openPaymentModal(studentId) {
        const paymentModal = document.getElementById('payment-modal');
        if (!paymentModal) return;

        const student = students.find(s => s.id === studentId);
        if (!student) return;

        document.getElementById('payment-student-id').value = student.id;
        document.getElementById('student-name-display').value = student.name;

        // Set default amount based on class
        let defaultAmount = 400;
        if (student.class === '4' || student.class === '5') {
            defaultAmount = 500;
        } else if (student.class === '3') {
            defaultAmount = 450;
        }
        document.getElementById('payment-amount').value = defaultAmount;

        // Set current date
        document.getElementById('payment-date').value = getCurrentDate();

        paymentModal.style.display = 'block';
    }

    // Render attendance
    function renderAttendance() {
        const attendanceTableBody = document.getElementById('attendance-table-body');
        if (!attendanceTableBody) return;

        const classFilter = document.getElementById('attendance-class-filter');
        const dateFilter = document.getElementById('attendance-date');

        if (!classFilter || !dateFilter) return;

        const selectedClass = classFilter.value;
        const selectedDate = dateFilter.value;

        attendanceTableBody.innerHTML = '';

        // Filter students by selected class
        const classStudents = students.filter(student => student.class === selectedClass);

        classStudents.forEach(student => {
            const row = document.createElement('tr');

            // Get student's attendance status for the selected date
            let status = 'present'; // Default to present
            if (attendance[selectedDate] && attendance[selectedDate][student.id]) {
                status = attendance[selectedDate][student.id];
            }

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>
                    <div class="attendance-option present-option ${status === 'present' ? 'selected' : ''}" 
                         data-student="${student.id}" data-status="present">
                        <i class="fas fa-check"></i>
                    </div>
                </td>
                <td>
                    <div class="attendance-option absent-option ${status === 'absent' ? 'selected' : ''}" 
                         data-student="${student.id}" data-status="absent">
                        <i class="fas fa-times"></i>
                    </div>
                </td>
                <td>
                    <div class="attendance-option late-option ${status === 'late' ? 'selected' : ''}" 
                         data-student="${student.id}" data-status="late">
                        <i class="fas fa-clock"></i>
                    </div>
                </td>
            `;

            attendanceTableBody.appendChild(row);
        });

        // Add event handlers for attendance options
        document.querySelectorAll('.attendance-option').forEach(option => {
            option.addEventListener('click', function () {
                const studentId = this.getAttribute('data-student');
                const status = this.getAttribute('data-status');

                // Remove selected class from all options for this student
                document.querySelectorAll(`.attendance-option[data-student="${studentId}"]`).forEach(opt => {
                    opt.classList.remove('selected');
                });

                // Add selected class to clicked option
                this.classList.add('selected');

                // Update attendance data
                const date = document.getElementById('attendance-date').value;
                if (!attendance[date]) {
                    attendance[date] = {};
                }
                attendance[date][studentId] = status;
            });
        });

        // Add event listeners for filter changes
        classFilter.addEventListener('change', renderAttendance);
        dateFilter.addEventListener('change', renderAttendance);

        // Add event listener for save button
        const saveAttendanceBtn = document.getElementById('save-attendance');
        if (saveAttendanceBtn) {
            saveAttendanceBtn.addEventListener('click', function () {
                alert('Attendance saved successfully!');
                // Update overall attendance percentage for each student
                updateAttendanceStats();
                renderDashboard();
            });
        }
    }

    // Update attendance statistics
    function updateAttendanceStats() {
        students.forEach(student => {
            let totalDays = 0;
            let presentDays = 0;

            // Count attendance for this student across all dates
            Object.keys(attendance).forEach(date => {
                if (attendance[date][student.id]) {
                    totalDays++;
                    if (attendance[date][student.id] === 'present' || attendance[date][student.id] === 'late') {
                        presentDays++;
                    }
                }
            });

            // Calculate attendance percentage
            if (totalDays > 0) {
                student.attendance = Math.round((presentDays / totalDays) * 100);
            }
        });
    }

    // Render grades
    function renderGrades() {
        const gradesTableBody = document.getElementById('grades-table-body');
        if (!gradesTableBody) return;

        const classFilter = document.getElementById('grade-class-filter');
        const subjectFilter = document.getElementById('grade-subject-filter');
        const termFilter = document.getElementById('grade-term-filter');

        if (!classFilter || !subjectFilter || !termFilter) return;

        const selectedClass = classFilter.value;
        const selectedSubject = subjectFilter.value;
        const selectedTerm = termFilter.value;

        gradesTableBody.innerHTML = '';

        // Filter students by selected class
        const classStudents = students.filter(student => student.class === selectedClass);

        classStudents.forEach(student => {
            const row = document.createElement('tr');

            // Get student's grade for the selected subject and term
            let marks = '';
            if (grades[selectedTerm] &&
                grades[selectedTerm][selectedSubject] &&
                grades[selectedTerm][selectedSubject][student.id]) {
                marks = grades[selectedTerm][selectedSubject][student.id];
            }

            // Calculate letter grade
            const letterGrade = getLetterGrade(marks);

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>
                    <input type="number" class="grade-input" value="${marks}" min="0" max="100" 
                           data-student="${student.id}" data-subject="${selectedSubject}" data-term="${selectedTerm}">
                </td>
                <td>${letterGrade}</td>
            `;

            gradesTableBody.appendChild(row);
        });

        // Add event handlers for grade inputs
        document.querySelectorAll('.grade-input').forEach(input => {
            input.addEventListener('input', function () {
                const marks = parseInt(this.value) || 0;
                const studentId = this.getAttribute('data-student');
                const subject = this.getAttribute('data-subject');
                const term = this.getAttribute('data-term');

                // Update grade display
                const letterGradeTd = this.parentElement.nextElementSibling;
                letterGradeTd.textContent = getLetterGrade(marks);

                // Update grades data
                if (!grades[term]) {
                    grades[term] = {};
                }
                if (!grades[term][subject]) {
                    grades[term][subject] = {};
                }
                grades[term][subject][studentId] = marks;
            });
        });

        // Add event listeners for filter changes
        classFilter.addEventListener('change', renderGrades);
        subjectFilter.addEventListener('change', renderGrades);
        termFilter.addEventListener('change', renderGrades);

        // Add event listener for save button
        const saveGradesBtn = document.getElementById('save-grades');
        if (saveGradesBtn) {
            saveGradesBtn.addEventListener('click', function () {
                alert('Grades saved successfully!');
                renderDashboard();
            });
        }
    }

    // Render fees
    function renderFees() {
        const feesTableBody = document.getElementById('fees-table-body');
        if (!feesTableBody) return;

        const monthFilter = document.getElementById('fee-month-filter');
        if (!monthFilter) return;

        const selectedMonth = monthFilter.value;

        feesTableBody.innerHTML = '';

        students.forEach(student => {
            const row = document.createElement('tr');

            // Get student's fee for the selected month
            let fee = { amount: 0, status: 'pending', dueDate: '' };
            if (fees[selectedMonth] && fees[selectedMonth][student.id]) {
                fee = fees[selectedMonth][student.id];
            } else {
                // Set default fee amount based on class
                let defaultAmount = 400;
                if (student.class === '4' || student.class === '5') {
                    defaultAmount = 500;
                } else if (student.class === '3') {
                    defaultAmount = 450;
                }
                fee.amount = defaultAmount;
                fee.dueDate = getCurrentDate();
            }

            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>Class ${student.class}</td>
                <td>$${fee.amount}</td>
                <td><span class="badge-status badge-${fee.status}">${capitalizeFirstLetter(fee.status)}</span></td>
                <td>${fee.dueDate}</td>
                <td class="action-buttons">
                    <button class="action-btn payment-btn" data-id="${student.id}"><i class="fas fa-dollar-sign"></i></button>
                </td>
            `;

            feesTableBody.appendChild(row);
        });

        // Attach payment event handlers
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const studentId = this.getAttribute('data-id');
                openPaymentModal(studentId);
            });
        });

        // Add event listeners for filter changes
        monthFilter.addEventListener('change', renderFees);
    }

    // Helper functions
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getCurrentMonthCode() {
        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const now = new Date();
        return months[now.getMonth()];
    }

    function generateStudentId() {
        const lastStudent = students[students.length - 1];
        if (!lastStudent) return "STU001";

        const lastId = lastStudent.id;
        const lastNumber = parseInt(lastId.substring(3));
        return `STU${String(lastNumber + 1).padStart(3, '0')}`;
    }

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getLetterGrade(marks) {
        if (!marks) return 'N/A';

        if (marks >= 90) return 'A+';
        if (marks >= 80) return 'A';
        if (marks >= 70) return 'B';
        if (marks >= 60) return 'C';
        if (marks >= 50) return 'D';
        return 'F';
    }

    // Initialize the application
    initApp();
});
// script.js

let currentDashboardPage = 1;
let currentStudentPage = 1;
let currentAttendancePage = 1;
let currentGradePage = 1;
let currentFeePage = 1;
const itemsPerPage = 5;


document.addEventListener('DOMContentLoaded', function () {
    // Sample data
    let students = [
        {
            id: "STU001",
            name: "JayaPriya E",
            class: "5",
            gender: "female",
            dob: "2010-05-15",
            contactNumber: "+91-9876543210",
            address: "123 Anna Nagar, Chennai, Tamil Nadu",
            email: "jayapriya@example.com",
            admissionDate: "2021-09-01",
            feeStatus: "paid",
            attendance: 95,
            salary: 45000
        },
        {
            id: "STU002",
            name: "Harini E",
            class: "4",
            gender: "female",
            dob: "2011-03-22",
            contactNumber: "+91-8765432109",
            address: "456 T Nagar, Chennai, Tamil Nadu",
            email: "harini@example.com",
            admissionDate: "2022-09-01",
            feeStatus: "pending",
            attendance: 90,
            salary: 42000
        },
        {
            id: "STU003",
            name: "Karishma A",
            class: "3",
            gender: "female",
            dob: "2012-11-08",
            contactNumber: "+91-7654321098",
            address: "789 Adyar, Chennai, Tamil Nadu",
            email: "karishma@example.com",
            admissionDate: "2023-09-01",
            feeStatus: "overdue",
            attendance: 85,
            salary: 38000
        },
        {
            id: "STU004",
            name: "Aarthi S",
            class: "2",
            gender: "female",
            dob: "2013-07-19",
            contactNumber: "+91-6543210987",
            address: "101 Velachery, Chennai, Tamil Nadu",
            email: "aarthi@example.com",
            admissionDate: "2022-09-01",
            feeStatus: "paid",
            attendance: 98,
            salary: 35000
        },
        {
            id: "STU005",
            name: "Kasthuri S",
            class: "1",
            gender: "female",
            dob: "2014-09-25",
            contactNumber: "+91-5432109876",
            address: "202 Tambaram, Chennai, Tamil Nadu",
            email: "kasthuri@example.com",
            admissionDate: "2023-09-01",
            feeStatus: "pending",
            attendance: 92,
            salary: 32000
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
        "apr": {
            "STU001": { amount: 45000, status: "paid", dueDate: "2025-04-10" },
            "STU002": { amount: 42000, status: "pending", dueDate: "2025-04-10" },
            "STU003": { amount: 38000, status: "overdue", dueDate: "2025-04-01" },
            "STU004": { amount: 35000, status: "paid", dueDate: "2025-04-10" },
            "STU005": { amount: 32000, status: "pending", dueDate: "2025-04-10" }
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

                // Set default salary based on class if it's a new student
                let defaultSalary = 35000;
                switch (studentClass) {
                    case '1': defaultSalary = 32000; break;
                    case '2': defaultSalary = 35000; break;
                    case '3': defaultSalary = 38000; break;
                    case '4': defaultSalary = 42000; break;
                    case '5': defaultSalary = 45000; break;
                }

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
                    attendance: existingStudentIndex >= 0 ? students[existingStudentIndex].attendance : 0,
                    salary: existingStudentIndex >= 0 ? students[existingStudentIndex].salary : defaultSalary
                };

                if (existingStudentIndex >= 0) {
                    // Update existing student
                    students[existingStudentIndex] = studentData;
                } else {
                    // Add new student and create fee entry
                    students.push(studentData);

                    // Create fee entry for current month
                    const currentMonth = getCurrentMonthCode();
                    if (!fees[currentMonth]) {
                        fees[currentMonth] = {};
                    }
                    fees[currentMonth][studentId] = {
                        amount: defaultSalary,
                        status: "pending",
                        dueDate: getCurrentDate()
                    };
                }

                // Close modal
                studentModal.style.display = 'none';

                // Refresh displays
                renderStudents();
                renderDashboard();
                renderFees();
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

    // Render dashboard content
    function renderDashboard() {
        const totalStudentsEl = document.querySelector('.total-students');
        if (totalStudentsEl) {
            totalStudentsEl.textContent = students.length;
        }

        // Calculate overall attendance rate from all recorded dates
        let totalPresentCount = 0;
        let totalAttendanceRecords = 0;

        // Loop through all attendance dates
        Object.keys(attendance).forEach(date => {
            Object.values(attendance[date]).forEach(status => {
                totalAttendanceRecords++;
                if (status === 'present' || status === 'late') {
                    totalPresentCount++;
                }
            });
        });

        // Calculate overall attendance rate
        const attendanceRate = totalAttendanceRecords > 0 ? Math.round((totalPresentCount / totalAttendanceRecords) * 100) : 0;

        const attendanceRateEl = document.querySelector('.attendance-rate');
        if (attendanceRateEl) {
            attendanceRateEl.textContent = `${attendanceRate}%`;
        }

        // Fix fee collection calculation - include all students and all months
        let feeCollection = 0;
        Object.keys(fees).forEach(month => {
            Object.values(fees[month]).forEach(fee => {
                if (fee.status === 'paid') {
                    feeCollection += fee.amount;
                }
            });
        });

        const feeCollectionEl = document.querySelector('.fee-collection');
        if (feeCollectionEl) {
            feeCollectionEl.textContent = `₹${feeCollection.toLocaleString('en-IN')}`;
        }

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

        // NEW PAGINATED RECENT STUDENTS SECTION
        const recentStudentsBody = document.getElementById('recent-students-body');
        if (recentStudentsBody) {
            recentStudentsBody.innerHTML = '';

            // Get all students in reverse order (most recent first)
            const allStudents = [...students].reverse();

            // Calculate pagination for dashboard
            const totalPages = Math.ceil(allStudents.length / itemsPerPage);
            const startIndex = (currentDashboardPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedStudents = allStudents.slice(startIndex, endIndex);

            // Render students
            paginatedStudents.forEach(student => {
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

            // Render pagination for dashboard
            renderGenericPagination('dashboard-pagination-container', totalPages, currentDashboardPage,
                (page) => {
                    currentDashboardPage = page;
                    renderDashboard();
                }, allStudents.length, 'students');
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

        // Apply filters
        if (classFilter && classFilter.value && classFilter.value !== 'all') {
            filteredStudents = filteredStudents.filter(student => student.class === classFilter.value);
        }

        if (searchInput && searchInput.value.trim()) {
            const searchQuery = searchInput.value.toLowerCase().trim();
            filteredStudents = filteredStudents.filter(student =>
                student.id.toLowerCase().includes(searchQuery) ||
                student.name.toLowerCase().includes(searchQuery) ||
                student.contactNumber.toLowerCase().includes(searchQuery) ||
                student.email.toLowerCase().includes(searchQuery)
            );
        }

        filteredStudents.sort((a, b) => a.name.localeCompare(b.name));

        // Calculate pagination
        const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
        const startIndex = (currentStudentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

        paginatedStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>Class ${student.class}</td>
            <td>${capitalizeFirstLetter(student.gender)}</td>
            <td>${student.contactNumber}</td>
            <td>₹${student.salary ? student.salary.toLocaleString('en-IN') : '0'}</td>
            <td><span class="badge-status badge-${student.feeStatus}">${capitalizeFirstLetter(student.feeStatus)}</span></td>
            <td class="action-buttons">
                <button class="action-btn edit-btn" data-id="${student.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" data-id="${student.id}"><i class="fas fa-trash"></i></button>
                <button class="action-btn payment-btn" data-id="${student.id}"><i class="fas fa-rupee-sign"></i></button>
            </td>
        `;
            studentsTableBody.appendChild(row);
        });

        // Render pagination
        renderGenericPagination('students-pagination-container', totalPages, currentStudentPage,
            (page) => {
                currentStudentPage = page;
                renderStudents();
            }, filteredStudents.length, 'students');

        attachStudentEventHandlers();
    }


    function renderGenericPagination(containerId, totalPages, currentPage, onPageChange, totalItems, itemType) {
        const paginationContainer = document.getElementById(containerId);
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                onPageChange(currentPage - 1);
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.addEventListener('click', () => {
                onPageChange(i);
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.className = 'pagination-btn';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
            }
        });
        paginationContainer.appendChild(nextBtn);

        // Show results info
        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
        const resultsInfo = document.createElement('div');
        resultsInfo.className = 'pagination-info';
        resultsInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalItems} ${itemType}`;
        paginationContainer.appendChild(resultsInfo);
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
        document.getElementById('payment-amount').value = student.salary || 35000;
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

        // Calculate pagination
        const totalPages = Math.ceil(classStudents.length / itemsPerPage);
        const startIndex = (currentAttendancePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedStudents = classStudents.slice(startIndex, endIndex);

        paginatedStudents.forEach(student => {
            const row = document.createElement('tr');

            let status = 'present';
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

        // Render pagination
        renderGenericPagination('attendance-pagination-container', totalPages, currentAttendancePage,
            (page) => {
                currentAttendancePage = page;
                renderAttendance();
            }, classStudents.length, 'students');

        // Add event handlers for attendance options
        document.querySelectorAll('.attendance-option').forEach(option => {
            option.addEventListener('click', function () {
                const studentId = this.getAttribute('data-student');
                const status = this.getAttribute('data-status');

                document.querySelectorAll(`.attendance-option[data-student="${studentId}"]`).forEach(opt => {
                    opt.classList.remove('selected');
                });

                this.classList.add('selected');

                const date = document.getElementById('attendance-date').value;
                if (!attendance[date]) {
                    attendance[date] = {};
                }
                attendance[date][studentId] = status;
            });
        });

        // Reset to first page when filters change
        classFilter.addEventListener('change', () => {
            currentAttendancePage = 1;
            renderAttendance();
        });
        dateFilter.addEventListener('change', () => {
            currentAttendancePage = 1;
            renderAttendance();
        });
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

        const classStudents = students.filter(student => student.class === selectedClass);

        // Calculate pagination
        const totalPages = Math.ceil(classStudents.length / itemsPerPage);
        const startIndex = (currentGradePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedStudents = classStudents.slice(startIndex, endIndex);

        paginatedStudents.forEach(student => {
            const row = document.createElement('tr');

            let marks = '';
            if (grades[selectedTerm] &&
                grades[selectedTerm][selectedSubject] &&
                grades[selectedTerm][selectedSubject][student.id]) {
                marks = grades[selectedTerm][selectedSubject][student.id];
            }

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

        // Render pagination
        renderGenericPagination('grades-pagination-container', totalPages, currentGradePage,
            (page) => {
                currentGradePage = page;
                renderGrades();
            }, classStudents.length, 'students');

        // Add event handlers for grade inputs
        document.querySelectorAll('.grade-input').forEach(input => {
            input.addEventListener('input', function () {
                const marks = parseInt(this.value) || 0;
                const studentId = this.getAttribute('data-student');
                const subject = this.getAttribute('data-subject');
                const term = this.getAttribute('data-term');

                const letterGradeTd = this.parentElement.nextElementSibling;
                letterGradeTd.textContent = getLetterGrade(marks);

                if (!grades[term]) {
                    grades[term] = {};
                }
                if (!grades[term][subject]) {
                    grades[term][subject] = {};
                }
                grades[term][subject][studentId] = marks;
            });
        });

        // Reset to first page when filters change
        classFilter.addEventListener('change', () => {
            currentGradePage = 1;
            renderGrades();
        });
        subjectFilter.addEventListener('change', () => {
            currentGradePage = 1;
            renderGrades();
        });
        termFilter.addEventListener('change', () => {
            currentGradePage = 1;
            renderGrades();
        });
    }


    // Render fees
    function renderFees() {
        const feesTableBody = document.getElementById('fees-table-body');
        if (!feesTableBody) return;

        const monthFilter = document.getElementById('fee-month-filter');
        if (!monthFilter) return;

        const selectedMonth = monthFilter.value;
        feesTableBody.innerHTML = '';

        // Calculate pagination
        const totalPages = Math.ceil(students.length / itemsPerPage);
        const startIndex = (currentFeePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedStudents = students.slice(startIndex, endIndex);

        paginatedStudents.forEach(student => {
            const row = document.createElement('tr');
            let fee = { amount: 0, status: 'pending', dueDate: '' };

            if (fees[selectedMonth] && fees[selectedMonth][student.id]) {
                fee = fees[selectedMonth][student.id];
            } else {
                fee.amount = student.salary || 35000;
                fee.dueDate = getCurrentDate();
            }

            row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>Class ${student.class}</td>
            <td>₹${fee.amount.toLocaleString('en-IN')}</td>
            <td><span class="badge-status badge-${fee.status}">${capitalizeFirstLetter(fee.status)}</span></td>
            <td>${fee.dueDate}</td>
            <td class="action-buttons">
                <button class="action-btn payment-btn" data-id="${student.id}"><i class="fas fa-rupee-sign"></i></button>
            </td>
        `;
            feesTableBody.appendChild(row);
        });

        // Render pagination
        renderGenericPagination('fees-pagination-container', totalPages, currentFeePage,
            (page) => {
                currentFeePage = page;
                renderFees();
            }, students.length, 'students');

        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const studentId = this.getAttribute('data-id');
                openPaymentModal(studentId);
            });
        });

        // Reset to first page when filter changes
        monthFilter.addEventListener('change', () => {
            currentFeePage = 1;
            renderFees();
        });
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

    function initializeSearchAndFilters() {
        // Student search functionality
        const studentSearch = document.getElementById('student-search');
        if (studentSearch) {
            studentSearch.addEventListener('input', debounce(renderStudents, 300));
        }

        // Class filter functionality
        const classFilter = document.getElementById('class-filter');
        if (classFilter) {
            classFilter.addEventListener('change', renderStudents);
        }

        // Attendance filters
        const attendanceClassFilter = document.getElementById('attendance-class-filter');
        if (attendanceClassFilter) {
            attendanceClassFilter.addEventListener('change', renderAttendance);
        }

        const attendanceDate = document.getElementById('attendance-date');
        if (attendanceDate) {
            attendanceDate.addEventListener('change', renderAttendance);
        }

        // Grade filters
        const gradeClassFilter = document.getElementById('grade-class-filter');
        const gradeSubjectFilter = document.getElementById('grade-subject-filter');
        const gradeTermFilter = document.getElementById('grade-term-filter');

        if (gradeClassFilter) gradeClassFilter.addEventListener('change', renderGrades);
        if (gradeSubjectFilter) gradeSubjectFilter.addEventListener('change', renderGrades);
        if (gradeTermFilter) gradeTermFilter.addEventListener('change', renderGrades);

        // Fee filter
        const feeMonthFilter = document.getElementById('fee-month-filter');
        if (feeMonthFilter) {
            feeMonthFilter.addEventListener('change', renderFees);
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function generateAttendanceCSV() {
        const csvData = [];
        csvData.push(['Student ID', 'Student Name', 'Class', 'Date', 'Status']);

        Object.keys(attendance).forEach(date => {
            Object.keys(attendance[date]).forEach(studentId => {
                const student = students.find(s => s.id === studentId);
                if (student) {
                    csvData.push([
                        studentId,
                        student.name,
                        student.class,
                        date,
                        attendance[date][studentId]
                    ]);
                }
            });
        });

        downloadCSV(csvData, 'attendance_report.csv');
    }

    function generatePerformanceCSV() {
        const csvData = [];
        csvData.push(['Student ID', 'Student Name', 'Class', 'Subject', 'Term', 'Marks', 'Grade']);

        Object.keys(grades).forEach(term => {
            Object.keys(grades[term]).forEach(subject => {
                Object.keys(grades[term][subject]).forEach(studentId => {
                    const student = students.find(s => s.id === studentId);
                    const marks = grades[term][subject][studentId];
                    if (student) {
                        csvData.push([
                            studentId,
                            student.name,
                            student.class,
                            subject,
                            term,
                            marks,
                            getLetterGrade(marks)
                        ]);
                    }
                });
            });
        });

        downloadCSV(csvData, 'performance_report.csv');
    }

    function generateFeeCollectionCSV() {
        const csvData = [];
        csvData.push(['Student ID', 'Student Name', 'Class', 'Month', 'Amount', 'Status', 'Due Date']);

        Object.keys(fees).forEach(month => {
            Object.keys(fees[month]).forEach(studentId => {
                const student = students.find(s => s.id === studentId);
                const fee = fees[month][studentId];
                if (student) {
                    csvData.push([
                        studentId,
                        student.name,
                        student.class,
                        month,
                        fee.amount,
                        fee.status,
                        fee.dueDate
                    ]);
                }
            });
        });

        downloadCSV(csvData, 'fee_collection_report.csv');
    }

    function generateExportDataCSV() {
        const csvData = [];
        csvData.push(['Student ID', 'Name', 'Class', 'Gender', 'DOB', 'Contact', 'Address', 'Email', 'Admission Date', 'Fee Status', 'Attendance %', 'Salary']);

        students.forEach(student => {
            csvData.push([
                student.id,
                student.name,
                student.class,
                student.gender,
                student.dob,
                student.contactNumber,
                student.address,
                student.email,
                student.admissionDate,
                student.feeStatus,
                student.attendance,
                student.salary
            ]);
        });

        downloadCSV(csvData, 'all_students_data.csv');
    }

    function downloadCSV(data, filename) {
        const csvContent = data.map(row =>
            row.map(field => `"${field}"`).join(',')
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function setupReportButtons() {
        const reportButtons = document.querySelectorAll('.report-card button');
        reportButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                switch (index) {
                    case 0: // Attendance Report
                        generateAttendanceCSV();
                        break;
                    case 1: // Performance Report
                        generatePerformanceCSV();
                        break;
                    case 2: // Fee Collection Report
                        generateFeeCollectionCSV();
                        break;
                    case 3: // Export Data
                        generateExportDataCSV();
                        break;
                }
            });
        });
    }

    function initApp() {
        setupNavigation();
        setupModals();
        setupReportButtons(); // Add this line
        initializeSearchAndFilters();

        renderDashboard();
        renderStudents();
        renderAttendance();
        renderGrades();
        renderFees();

        const attendanceDate = document.getElementById('attendance-date');
        if (attendanceDate) {
            attendanceDate.value = getCurrentDate();
        }
    }

    // Initialize the application
    initApp();
});

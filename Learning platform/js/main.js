document.addEventListener('DOMContentLoaded', () => {
  const courseModal = document.getElementById('course-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const addCourseBtn = document.getElementById('add-course-btn');
  const courseForm = document.getElementById('course-form');
  const coursesList = document.getElementById('courses-list');
  let courses = [];
  let editIndex = -1;

  function renderCourses() {
      coursesList.innerHTML = '';
      courses.forEach((course, index) => {
          const courseDiv = document.createElement('div');
          courseDiv.className = 'course';
          courseDiv.innerHTML = `
              <h3>${course.title}</h3>
              <p>${course.description}</p>
              <button class="btn edit-btn" data-index="${index}">Edit</button>
              <button class="btn delete-btn" data-index="${index}">Delete</button>
          `;
          coursesList.appendChild(courseDiv);
      });
  }

  function openModal(title, course = {}) {
      document.getElementById('modal-title').innerText = title;
      document.getElementById('course-title').value = course.title || '';
      document.getElementById('course-description').value = course.description || '';
      document.getElementById('course-id').value = course.id || '';
      courseModal.style.display = 'block';
  }

  function closeModal() {
      courseModal.style.display = 'none';
  }

  addCourseBtn.addEventListener('click', () => {
      editIndex = -1;
      openModal('Add Course');
  });

  closeModalBtn.addEventListener('click', closeModal);

  courseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('course-title').value;
      const description = document.getElementById('course-description').value;
      if (editIndex >= 0) {
          // Update existing course
          courses[editIndex] = { title, description };
      } else {
          // Add new course
          courses.push({ title, description });
      }
      renderCourses();
      closeModal();
  });

  coursesList.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-btn')) {
          const index = event.target.getAttribute('data-index');
          editIndex = index;
          openModal('Edit Course', courses[index]);
      } else if (event.target.classList.contains('delete-btn')) {
          const index = event.target.getAttribute('data-index');
          courses.splice(index, 1);
          renderCourses();
      }
  });

  // Initialize with some example courses
  courses = [
      { title: 'Course Title 1', description: 'Course description goes here...' },
      { title: 'Course Title 2', description: 'Course description goes here...' }
  ];
  renderCourses();
});


document.addEventListener('DOMContentLoaded', () => {
  // Function to handle form validation
  function validateForm(formId) {
      const form = document.getElementById(formId);
      const inputs = form.querySelectorAll('input, textarea');
      let valid = true;

      inputs.forEach(input => {
          if (!input.value) {
              valid = false;
              input.style.borderColor = 'red';
          } else {
              input.style.borderColor = '';
          }
      });

      return valid;
  }

  // Handle login form submission
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
          event.preventDefault();
          if (validateForm('login-form')) {
              const email = document.querySelector('#login-email').value;
              const password = document.querySelector('#login-password').value;
              
              // Firebase Authentication login
              firebase.auth().signInWithEmailAndPassword(email, password)
                  .then((userCredential) => {
                      // Login successful
                      window.location.href = 'dashboard.html'; // Redirect to dashboard
                  })
                  .catch((error) => {
                      // Handle Errors here.
                      console.error(error.message);
                      alert('Login failed: ' + error.message);
                  });
          } else {
              alert('Please fill out all fields.');
          }
      });
  }

  // Handle registration form submission
  const registerForm = document.querySelector('#register-form');
  if (registerForm) {
      registerForm.addEventListener('submit', (event) => {
          event.preventDefault();
          if (validateForm('register-form')) {
              const email = document.querySelector('#register-email').value;
              const password = document.querySelector('#register-password').value;

              // Firebase Authentication registration
              firebase.auth().createUserWithEmailAndPassword(email, password)
                  .then((userCredential) => {
                      // Registration successful
                      window.location.href = 'login.html'; // Redirect to login
                  })
                  .catch((error) => {
                      // Handle Errors here.
                      console.error(error.message);
                      alert('Registration failed: ' + error.message);
                  });
          } else {
              alert('Please fill out all fields.');
          }
      });
  }

  // Handle logout
  const logoutButton = document.querySelector('#logout-button');
  if (logoutButton) {
      logoutButton.addEventListener('click', () => {
          firebase.auth().signOut().then(() => {
              // Sign-out successful
              window.location.href = 'index.html'; // Redirect to home
          }).catch((error) => {
              // An error happened
              console.error(error.message);
              alert('Logout failed: ' + error.message);
          });
      });
  }

  // Handle course enrollment
  const enrollButtons = document.querySelectorAll('.enroll-btn');
  enrollButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const courseId = event.target.dataset.courseId;
          // Handle course enrollment logic here
          console.log(`Enrolled in course with ID: ${courseId}`);
          alert('Enrollment successful!');
      });
  });

  // Basic navigation handling (optional)
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          const targetPage = event.target.getAttribute('href');
          if (targetPage) {
              window.location.href = targetPage;
          }
      });s
  });

  // Example of dynamically updating content
  const updateContent = () => {
      const contentArea = document.querySelector('#content-area');
      if (contentArea) {
          contentArea.innerHTML = '<p>Updated content goes here.</p>';
      }
  };

  // Call updateContent() if needed
  updateContent();
});

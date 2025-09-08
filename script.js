
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("auth-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const contactInput = document.getElementById("contact");
    const submitBtn = document.getElementById("submit-btn");
    const formTitle = document.getElementById("form-title");
    const toggleForm = document.getElementById("toggle-form");
    let isLogin = false;

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validatePassword(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordPattern.test(password);
    }

    function validateContact(contact) {
        const contactPattern = /^\+?[0-9]{10,15}$/;
        return contactPattern.test(contact);
    }

    function showErrorMessage(input, message) {
        const errorSpan = document.getElementById(`${input.id}-error`);
        errorSpan.textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll(".error").forEach(span => span.textContent = "");
    }

    function saveUser(email, password, contact) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.email === email)) {
            showErrorMessage(emailInput, "Email is already registered");
            return false;
        }
        users.push({ email, password, contact });
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    }

    function authenticateUser(email, password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        return users.find(user => user.email === email && user.password === password);
    }

    toggleForm.addEventListener("click", function (e) {
        e.preventDefault();
        isLogin = !isLogin;
        formTitle.textContent = isLogin ? "Login" : "Sign Up";
        submitBtn.textContent = isLogin ? "Login" : "Sign Up";
        contactInput.style.display = isLogin ? "none" : "block";
        toggleForm.innerHTML = isLogin ? "Don't have an account? <a href='#'>Sign Up</a>" : "Already have an account? <a href='#'>Login</a>";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const contact = contactInput.value.trim();

        if (!validateEmail(email)) {
            showErrorMessage(emailInput, "Invalid email format");
            return;
        }
        if (!validatePassword(password)) {
            showErrorMessage(passwordInput, "Password must be 8-16 characters with uppercase, lowercase, number & special character");
            return;
        }
        if (!isLogin && !validateContact(contact)) {
            showErrorMessage(contactInput, "Invalid contact number format");
            return;
        }

        if (isLogin) {
            if (authenticateUser(email, password)) {
                alert("Login successful!");
                window.location.href = "index1.html"; // Redirect to dashboard
            } else {
                showErrorMessage(emailInput, "Invalid email or password");
            }
        } else {
            if (saveUser(email, password, contact)) {
                alert("Signup successful! Please login.");
                isLogin = true;
                toggleForm.click();
            }
        }
    });
});



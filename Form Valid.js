document.addEventListener('DOMContentLoaded', function() {
document.getElementById('togglePassword').addEventListener('change', function() {
const passwordInput = document.getElementById('password');
if (this.checked) {
passwordInput.type = 'text';
} 
else {
passwordInput.type = 'password';
}
});
});
function Form() {
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,8}$/;
if (name.trim() === "") {
alert("Name cannot be empty.");
return false;
}
if (!emailPattern.test(email)) {
alert("Please enter a valid email address.");
return false;
}
if (!passwordPattern.test(password)) {
alert("Password must be a maximum of 8 characters and include at least one special character.");
return false;
}  
alert("Form successfully submitted!");
return true;
}

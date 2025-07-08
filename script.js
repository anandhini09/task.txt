// script.js
const passwordInput = document.getElementById("password");
const strengthMeter = document.getElementById("strength-meter");
const strengthText = document.getElementById("strength-text");

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  let strength = 0;

  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  switch (strength) {
    case 0:
    case 1:
      strengthMeter.style.background = "red";
      strengthText.textContent = "Strength: Weak";
      break;
    case 2:
    case 3:
      strengthMeter.style.background = "orange";
      strengthText.textContent = "Strength: Moderate";
      break;
    case 4:
      strengthMeter.style.background = "green";
      strengthText.textContent = "Strength: Strong";
      break;
  }
});

function generatePassword() {
  const useUpper = document.getElementById("include-uppercase").checked;
  const useNumber = document.getElementById("include-numbers").checked;
  const useSymbol = document.getElementById("include-symbols").checked;
  const length = +document.getElementById("length").value;

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let chars = lower;
  if (useUpper) chars += upper;
  if (useNumber) chars += numbers;
  if (useSymbol) chars += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById("generated-password").value = password;
}

function copyToClipboard() {
  const generated = document.getElementById("generated-password");
  if (generated.value === "") return alert("Nothing to copy!");
  navigator.clipboard.writeText(generated.value);
  alert("Password copied to clipboard!");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

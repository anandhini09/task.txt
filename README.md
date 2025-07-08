<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Strength Tool</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      background-color: #f4f4f4;
      color: #111;
      transition: background-color 0.3s, color 0.3s;
    }

    body.dark {
      background-color: #111;
      color: #f4f4f4;
    }

    .container {
      max-width: 500px;
      margin: 2rem;
      padding: 2rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }

    body.dark .container {
      background: #222;
    }

    h1, h2 {
      text-align: center;
    }

    .input-group {
      margin-top: 20px;
    }

    input[type="text"], input[type="password"], input[type="number"] {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 1rem;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      font-size: 1rem;
      border: none;
      margin-top: 10px;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    #strength-meter {
      height: 10px;
      width: 100%;
      background: #ddd;
      border-radius: 5px;
      margin-top: 5px;
      transition: background 0.3s;
    }

    #strength-text {
      font-weight: bold;
    }

    label {
      display: block;
      margin: 5px 0;
    }

    @media screen and (max-width: 600px) {
      .container {
        margin: 1rem;
        padding: 1rem;
      }
    }
  </style>
</head>
<body class="light">
  <div class="container">
    <h1>Password Strength Checker</h1>

    <div class="input-group">
      <label for="password">Enter Password:</label>
      <input type="password" id="password" placeholder="Type a password..." />
      <div id="strength-meter"></div>
      <p id="strength-text">Strength: </p>
    </div>

    <div class="input-group">
      <h2>Generate Secure Password</h2>
      <label><input type="checkbox" id="include-uppercase" checked /> Uppercase</label>
      <label><input type="checkbox" id="include-numbers" checked /> Numbers</label>
      <label><input type="checkbox" id="include-symbols" checked /> Symbols</label>
      <label>Length: <input type="number" id="length" value="12" min="6" max="32" /></label>
      <button onclick="generatePassword()">Generate Password</button>
      <input type="text" id="generated-password" readonly />
      <button onclick="copyToClipboard()">Copy to Clipboard</button>
    </div>

    <button onclick="toggleTheme()">🌙 Toggle Theme</button>
  </div>

  <script>
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
  </script>
</body>
</html>

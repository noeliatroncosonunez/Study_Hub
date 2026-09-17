document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('error-message');

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

  const registerForm = document.getElementById('registerForm');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const errorMessage = document.getElementById('error-message');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const curso = document.getElementById('curso').value;
        const password = passwordInput.value.trim();

        if (password.length < 6) {
            showError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // Crear objeto con los datos del usuario
        const datosUsuario = {
            nombre: nombre,
            email: email,
            curso: curso,
            password: password
        };

        // Guardar usuario en el navegador
        localStorage.setItem('usuarioDatos', JSON.stringify(datosUsuario));
        localStorage.setItem('nombreUsuario', nombre);

        // Redirigir al inicio principal
        window.location.href = '../index.html';
    });

    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.style.display = 'block';
    }

    if (password.length < 6) {
      showError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Almacenar el usuario registrado para la sesión
    localStorage.setItem('nombreUsuario', username);

    // Redirigir al inicio
    window.location.href = '../study Hub.html';
  });

  function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = 'block';
  }
});

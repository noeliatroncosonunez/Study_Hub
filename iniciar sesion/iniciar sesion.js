document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('error-message');

    // 1. Alternar visibilidad de la contraseña
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // 2. Procesar el formulario de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usuario = usernameInput.value.trim();
            const contrasena = passwordInput.value.trim();

            // Validaciones básicas
            if (!usuario || !contrasena) {
                mostrarError('Por favor, completa todos los campos.');
                return;
            }

            if (contrasena.length < 4) {
                mostrarError('La contraseña debe tener al menos 4 caracteres.');
                return;
            }

            // Ocultar mensaje de error anterior
            errorMessage.classList.add('hidden');

            // Guardar usuario en localStorage para la plataforma
            localStorage.setItem('nombreUsuario', usuario);

            // Perfil por defecto de prueba
            const perfil = {
                nombre: usuario,
                email: usuario.includes('@') ? usuario : `${usuario}@ejemplo.com`,
                rol: 'estudiante'
            };
            localStorage.setItem('usuarioPerfil', JSON.stringify(perfil));

            // Redireccionar al inicio con sesión activa
            window.location.href = '../study_hub.html';
        });
    }

    function mostrarError(mensaje) {
        if (errorMessage) {
            errorMessage.textContent = mensaje;
            errorMessage.classList.remove('hidden');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            try {
                const respuesta = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const resultado = await respuesta.json();

                if (!respuesta.ok) {
                    throw new Error(resultado.error || 'Credenciales inválidas.');
                }

                // Guardar la sesión activa en el navegador
                localStorage.setItem('nombreUsuario', resultado.usuario.username);
                localStorage.setItem('usuarioPerfil', JSON.stringify(resultado.usuario));

                // Redirigir a la página principal con sesión iniciada
                window.location.href = '../study_hub.html';

            } catch (error) {
                if (errorMessage) {
                    errorMessage.textContent = error.message;
                    errorMessage.classList.remove('hidden');
                }
            }
        });
    }
});
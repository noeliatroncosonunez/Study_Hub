document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('error-message');

    // 1. Alternar visibilidad de contraseña
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            confirmPasswordInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // 2. Procesar registro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usuario = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const curso = document.getElementById('curso').value;
            const pass = passwordInput.value;
            const confirmPass = confirmPasswordInput.value;

            if (pass !== confirmPass) {
                mostrarError('Las contraseñas no coinciden.');
                return;
            }

            if (pass.length < 6) {
                mostrarError('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            // Ocultar error previa
            errorMessage.classList.add('hidden');

            // Guardar estado de sesión en localStorage
            localStorage.setItem('nombreUsuario', usuario);
            const nuevoUsuario = {
                nombre: usuario,
                email: email,
                curso: curso,
                rol: 'estudiante'
            };
            localStorage.setItem('usuarioPerfil', JSON.stringify(nuevoUsuario));

            // Redireccionar al inicio
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

function actualizarLetrasCursos() {
    const nivelSelect = document.getElementById('nivelAcademico');
    const grupoLetra = document.getElementById('grupoLetraCurso');
    const letraSelect = document.getElementById('letraCurso');
    
    const nivel = nivelSelect.value;
    
    // Limpiar opciones anteriores
    letraSelect.innerHTML = '<option value="" disabled selected>Selecciona tu curso y letra</option>';
    
    if (!nivel) {
        grupoLetra.style.display = 'none';
        return;
    }

    // Mostrar el contenedor de la letra
    grupoLetra.style.display = 'flex';

    let opciones = [];

    if (nivel === 'Basica') {
        opciones = [
            "1° Básico A", "1° Básico B", "1° Básico C",
            "2° Básico A", "2° Básico B", "2° Básico C",
            "3° Básico A", "3° Básico B", "3° Básico C",
            "4° Básico A", "4° Básico B", "4° Básico C",
            "5° Básico A", "5° Básico B", "5° Básico C",
            "6° Básico A", "6° Básico B", "6° Básico C",
            "7° Básico A", "7° Básico B", "7° Básico C",
            "8° Básico A", "8° Básico B", "8° Básico C"
        ];
    } else if (nivel === 'Media') {
        opciones = [
            "1° Medio A", "1° Medio B", "1° Medio C",
            "2° Medio A", "2° Medio B", "2° Medio C",
            "3° Medio A", "3° Medio B", "3° Medio C",
            "4° Medio A", "4° Medio B", "4° Medio C"
        ];
    } else if (nivel === 'TP') {
        opciones = [
            "3° Medio TP - Programación B", 
            "4° Medio TP - Programación B"
        ];
    } else if (nivel === 'Superior') {
        opciones = [
            "Primer Año - Sección A",
            "Segundo Año - Sección A",
            "Tercer Año / Superior"
        ];
    }

    // Poblar el segundo select con las opciones generadas
    opciones.forEach(opcion => {
        const optElement = document.createElement('option');
        optElement.value = opcion;
        optElement.textContent = opcion;
        letraSelect.appendChild(optElement);
    });
}

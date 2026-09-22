document.addEventListener('DOMContentLoaded', () => {
    const roleSelector = document.getElementById('roleSelector');
    const fieldsEstudiante = document.getElementById('fieldsEstudiante');
    const fieldsDocente = document.getElementById('fieldsDocente');
    const profileForm = document.getElementById('profileForm');
    const alertMessage = document.getElementById('alert-message');

    // Cambiar vista entre Estudiante y Docente
    roleSelector.addEventListener('change', (e) => {
        const rol = e.target.value;
        if (rol === 'estudiante') {
            fieldsEstudiante.style.display = 'block';
            fieldsDocente.style.display = 'none';
        } else {
            fieldsEstudiante.style.display = 'none';
            fieldsDocente.style.display = 'block';
        }
    });

    // Cargar datos previos si existen en LocalStorage
    const datosGuardados = JSON.parse(localStorage.getItem('usuarioPerfil'));
    if (datosGuardados) {
        roleSelector.value = datosGuardados.rol || 'estudiante';
        roleSelector.dispatchEvent(new Event('change'));

        if (datosGuardados.rol === 'docente') {
            document.getElementById('docName').value = datosGuardados.nombre || '';
            document.getElementById('docEmail').value = datosGuardados.email || '';
            document.getElementById('asignatura').value = datosGuardados.asignatura || '';
            document.getElementById('institucion').value = datosGuardados.institucion || '';
        } else {
            document.getElementById('username').value = datosGuardados.nombre || '';
            document.getElementById('email').value = datosGuardados.email || '';
            document.getElementById('curso').value = datosGuardados.curso || '';
            document.getElementById('especialidad').value = datosGuardados.especialidad || '';
        }
    }

    // Guardar los cambios
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rolActual = roleSelector.value;
        let perfilData = { rol: rolActual };

        if (rolActual === 'estudiante') {
            perfilData.nombre = document.getElementById('username').value;
            perfilData.email = document.getElementById('email').value;
            perfilData.curso = document.getElementById('curso').value;
            perfilData.especialidad = document.getElementById('especialidad').value;
        } else {
            perfilData.nombre = document.getElementById('docName').value;
            perfilData.email = document.getElementById('docEmail').value;
            perfilData.asignatura = document.getElementById('asignatura').value;
            perfilData.institucion = document.getElementById('institucion').value;
        }

        // Guardar en localStorage
        localStorage.setItem('usuarioPerfil', JSON.stringify(perfilData));
        localStorage.setItem('nombreUsuario', perfilData.nombre);

        // Mostrar mensaje de éxito
        alertMessage.className = 'alert-success';
        alertMessage.textContent = '¡Perfil actualizado con éxito!';
        alertMessage.style.display = 'block';

        setTimeout(() => {
            alertMessage.style.display = 'none';
        }, 3000);
    });
});
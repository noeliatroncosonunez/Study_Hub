(() => {
    const classCards = document.querySelectorAll(".clase-card");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".btn-search");

    if (!classCards.length || !filterButtons.length) return;

    let activeCategory = "todos";

    const normalize = (text) => text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const categoryFor = (card) => {
        const title = normalize(card.querySelector(".card-body h2")?.textContent || "");

        if (title.includes("programacion")) return "especialidades tp";
        if (title.includes("matematic") || title.includes("ciencia")) return "ciencias y mates";
        return "humanidades";
    };

    const applyFilters = () => {
        const searchTerm = normalize(searchInput?.value || "");

        classCards.forEach((card) => {
            const matchesCategory = activeCategory === "todos"
                || categoryFor(card) === activeCategory;
            const matchesSearch = normalize(card.textContent).includes(searchTerm);

            card.classList.toggle("hidden", !(matchesCategory && matchesSearch));
        });
    };

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = normalize(button.textContent);
            filterButtons.forEach((filter) => filter.classList.remove("active"));
            button.classList.add("active");
            applyFilters();
        });
    });

    searchInput?.addEventListener("input", applyFilters);
    searchButton?.addEventListener("click", applyFilters);
    searchInput?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") applyFilters();
    });
})();

window.addEventListener("scroll", () =>{
    const scroll = window.scrollY;
    document.querySelector(".hero").style.backgroundPositionY=
    scroll *0.5 + "px";
});

const topBtn = Document.getElementByid("topBtn");

window.addEventListener("scroll",()=> {
    if(window.scrollY > 300){
        topBtn.style.display = "block";

    }

    else{
        topBtn.style.display = "none";
    }
});

topBtn.onclick = () => {
    window.scrollTo ({
        top:0, behavior:"smooth"
    });
};

// Login
function abrirLogin(){
    document.getElementById("loginModal").style.display = "flex";
}

function abrirRegistro(){
    document.getElementById("registroModal").style.display = "flex";
}

function cerrarModal(id){
    document.getElementById(id).style.display = "none";
}

// Mostrar Password
function mostrarContraseña(id){
    const input = document.getElementById(id);

    if(input.type === "password"){
        input.type = "text";
    }

    else{
        input.type = "password";
    }
}

// Validar Login
function validarLogin(event){
    event.preventdefault();
    const correo = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if(correo && password){
        alert("🚀 Sesión iniciada");
        cerrarModal("loginModal");
    }
}

function abrirRegistro() {
    // Cambia la visibilidad de la sección a visible
    document.getElementById("formulario-registro").style.display = "block";
}

// Cerrar Modal
window.onclick = function(event){
    const login = document.getElementById("loginModal");
    const registro = this.document.getElementByid("registroModal");

    if(event.target === login){
        login.style.display = "none";
    }

    if(event.target === registro){
        registro.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const authButtons = document.getElementById('authButtons');
    const userProfileMenu = document.getElementById('userProfileMenu');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    // 1. Comprobar si hay sesión iniciada en localStorage
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const perfilGuardado = JSON.parse(localStorage.getItem('usuarioPerfil'));

    if (nombreUsuario || perfilGuardado) {
        // Ocultar botones de inicio/registro y mostrar el avatar
        if (authButtons) authButtons.classList.add('hidden');
        if (userProfileMenu) userProfileMenu.classList.remove('hidden');

        // Extraer y mostrar los datos del usuario
        const nombre = nombreUsuario || (perfilGuardado ? perfilGuardado.nombre : 'Usuario');
        const inicial = nombre.charAt(0).toUpperCase();

        document.getElementById('headerAvatar').textContent = inicial;
        document.getElementById('dropdownAvatar').textContent = inicial;
        document.getElementById('dropdownUserName').textContent = nombre;

        if (perfilGuardado) {
            if (perfilGuardado.email) {
                document.getElementById('dropdownUserEmail').textContent = perfilGuardado.email;
            }
            if (perfilGuardado.rol) {
                const rolTexto = perfilGuardado.rol === 'docente' ? '👨‍🏫 Docente' : '👨‍🎓 Estudiante TP';
                document.getElementById('dropdownUserRole').textContent = rolTexto;
            }
        }
    } else {
        // Mostrar botones de inicio/registro y ocultar el avatar
        if (authButtons) authButtons.classList.remove('hidden');
        if (userProfileMenu) userProfileMenu.classList.add('hidden');
    }

    // 2. Control del menú desplegable (Abrir / Cerrar)
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
    }

    // 3. Función para cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('nombreUsuario');
            localStorage.removeItem('usuarioPerfil');
            window.location.reload();
        });
    }
});

// Estadísticas
let usuarios = 0;
let cursos = 0;
let logros = 0;

const intervalo = setInterval(()=> {
    if(usuarios < 150){
        usuarios++;
        document.getElementById("usuarios").innerHTML = usuarios;
    }

    if(cursos < 24){
        cursos++;
        document.getElementById("cursos").innerHTML = cursos;
    }

    if(logros < 35){
        logros++;
        document.getElementById("logros").innerHTML = logros;
    }
},30);

const cards = document.querySelectorAll(".card");
window.addEventListener("scroll",()=> {
    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if(top < window.innerHeight - 100){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});

let contadorPreguntas = 0;

function responderIA(){

    let pregunta = document.getElementById("pregunta").value.trim();

    if(pregunta === ""){
        return;
    }

    contadorPreguntas++;

    document.getElementById("contador").textContent =
    contadorPreguntas;

    let chatBox = document.getElementById("chatBox");

    let hora = new Date().toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    });

    chatBox.innerHTML += `
        <div class="mensaje usuario">
            ${pregunta}
            <small>${hora}</small>
        </div>
    `;

    let respuesta =
    "Actualmente estoy aprendiendo. Intenta con otra pregunta.";

    let texto = pregunta.toLowerCase();

    if(texto.includes("html")){
        respuesta =
        "HTML es el lenguaje utilizado para estructurar páginas web.";
    }

    else if(texto.includes("css")){
        respuesta =
        "CSS permite diseñar y dar estilo a los elementos de una página web.";
    }

    else if(texto.includes("javascript")){
        respuesta =
        "JavaScript agrega interactividad y funcionalidades dinámicas a una página web.";
    }

    else if(texto.includes("matem")){
        respuesta =
        "Las matemáticas estudian números, operaciones y relaciones entre cantidades.";
    }

    else if(texto.includes("historia")){
        respuesta =
        "La historia estudia los acontecimientos del pasado para comprender el presente.";
    }

    else if(texto.includes("fotosíntesis") || texto.includes("fotosintesis")){
        respuesta =
        "La fotosíntesis es el proceso mediante el cual las plantas producen su alimento usando luz solar.";
    }

    else if(texto.includes("inglés") || texto.includes("ingles")){
        respuesta =
        "El inglés es uno de los idiomas más utilizados en el mundo y en la tecnología.";
    }

    else if(texto.includes("estudiar")){
        respuesta =
        "Estudia en bloques de 25 minutos, toma descansos y practica constantemente.";
    }

    setTimeout(() => {

        chatBox.innerHTML += `
            <div class="mensaje bot">
                🤖 ${respuesta}
                <small>${hora}</small>
            </div>
        `;

        chatBox.scrollTop =
        chatBox.scrollHeight;

    },800);

    document.getElementById("pregunta").value = "";
}

function preguntaRapida(texto){

    document.getElementById("pregunta").value =
    texto;

    responderIA();
}

function limpiarChat(){

    document.getElementById("chatBox").innerHTML = `
        <div class="mensaje bot">
            👋 ¡Hola! Soy StudyBot.
            ¿En qué puedo ayudarte hoy?
        </div>
    `;

    contadorPreguntas = 0;

    document.getElementById("contador").textContent =
    "0";
}

document.getElementById("pregunta").addEventListener(
"keypress",
function(event){

    if(event.key === "Enter"){
        responderIA();
    }

});

function desbloquear(){
    alert("🏆 ¡Nuevo logro desbloqueado!");
}

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Tu usuario de MySQL
    password: '',          // Tu contraseña de MySQL (déjala vacía si no tienes)
    database: 'study_db'   // <--- Aquí debe apuntar a tu base de datos actual
});

app.post('/api/registrar', async (req, res) => {
    // Recibimos los 5 datos clave del formulario
    const { nombre, username, email, curso, password } = req.body;

    try {
        // Encriptamos la contraseña por seguridad con bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Consulta SQL para insertar la información en tu tabla
        const query = 'INSERT INTO usuarios (nombre, username, email, curso, password) VALUES (?, ?, ?, ?, ?)';
        
        db.query(query, [nombre, username, email, curso, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'El usuario o el correo ya se encuentran registrados.' });
                }
                return res.status(500).json({ error: 'Error en el servidor al registrar el usuario.' });
            }
            res.status(201).json({ mensaje: '¡Usuario registrado y guardado en study_db con éxito!' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar al usuario por su nombre de usuario o correo electrónico
    const query = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';

    db.query(query, [username, username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor al intentar iniciar sesión.' });
        }

        // Verificar si el usuario existe
        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
        }

        const usuario = results[0];

        try {
            // Comparar la contraseña ingresada con el hash guardado en la base de datos
            const match = await bcrypt.compare(password, usuario.password);

            if (!match) {
                return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
            }

            // Si las credenciales son correctas, enviamos una respuesta exitosa con los datos del usuario
            res.status(200).json({
                mensaje: '¡Inicio de sesión exitoso!',
                usuario: {
                    nombre: usuario.nombre,
                    username: usuario.username,
                    email: usuario.email,
                    curso: usuario.curso
                }
            });

        } catch (error) {
            res.status(500).json({ error: 'Error interno al procesar la autenticación.' });
        }
    });
});
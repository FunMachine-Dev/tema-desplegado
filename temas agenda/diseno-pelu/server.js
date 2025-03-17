/* este tiene buena recepcion de "section"
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require('multer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use('/content', express.static(path.join(__dirname, 'content')));

// Middleware para verificar y establecer 'section' antes de Multer
app.use((req, res, next) => {
  console.log("Sección recibida antes de Multer:", req.body.section);

  if (!req.body.section) {
    console.log("Sección no proporcionada, usando 'default'");
    req.body.section = 'default';  // Asignar un valor predeterminado si no se proporciona 'section'
  }

  // Confirmar que el valor es correcto después de la validación
  console.log("Sección después de validación:", req.body.section);
  next();  // Continuar con el siguiente middleware (Multer)
});

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let section = req.body.section || 'default';  // Validamos que 'section' esté presente

    // Construir la ruta de destino usando la 'section'
    const folderPath = path.join(__dirname, 'public', 'admin', 'img', 'upload-image', section);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });  // Crear la carpeta si no existe
    }

    console.log("Guardando en:", folderPath);
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    // Asignar un nombre único al archivo
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Endpoint para subir imagen
app.post('/upload-image', upload.single('image'), (req, res) => {
  console.log("Cuerpo recibido después de Multer:", req.body);
  res.json({ message: "Imagen subida con éxito" });
});

// Ruta para eliminar imágenes
app.post('/delete-images', (req, res) => {
  const { section } = req.body;

  if (!section || typeof section !== 'string') {
    return res.status(400).json({ error: "No se especificó una sección válida." });
  }

  const imageFolderPath = path.join(__dirname, 'public', 'admin', 'img', 'upload-image', section);

  if (!fs.existsSync(imageFolderPath)) {
    return res.status(400).json({ error: "La carpeta especificada no existe." });
  }

  fs.readdir(imageFolderPath, (err, files) => {
    if (err) {
      console.error("Error al leer la carpeta:", err);
      return res.status(500).json({ error: "Error al eliminar imágenes." });
    }

    if (files.length === 0) {
      return res.json({ message: "No hay imágenes para eliminar." });
    }

    let errors = [];
    files.forEach(file => {
      try {
        fs.unlinkSync(path.join(imageFolderPath, file));
      } catch (unlinkErr) {
        console.error("Error al eliminar archivo:", unlinkErr);
        errors.push(file);
      }
    });

    if (errors.length > 0) {
      return res.status(500).json({ error: "Algunas imágenes no se pudieron eliminar.", files: errors });
    }

    res.json({ message: "Todas las imágenes en la carpeta han sido eliminadas." });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/






const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "tu_secreto"; // Clave para firmar el token

// Cargar credenciales desde un archivo JSON
const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));

// Endpoint para iniciar sesión
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No autorizado" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
        req.user = decoded;
        next();
    });
};

// Ruta protegida (sección de administradores)
app.get("/admin", verifyToken, (req, res) => {
    res.json({ message: "Bienvenido a la sección de administradores" });
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use('/content', express.static(path.join(__dirname, 'content')));


app.get("/", (req, res) => {
  res.send("Servidor de Genda Admin funcionando");
});

// Endpoint para actualizar el contenido de la web
app.post("/update-content", (req, res) => {
  const { section, content } = req.body;

  if (!section || !content) {
    return res.status(400).send("Sección y contenido son requeridos");
  }

  // Ruta del archivo donde se guardará el contenido
  const filePath = path.join(__dirname, "content", `${section}.json`);

  // Crea la carpeta "content" si no existe
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // Guarda el contenido en el archivo JSON
  fs.writeFileSync(filePath, JSON.stringify({ content }, null, 2));

  res.status(200).send("Contenido actualizado correctamente");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/* con IA
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let section = req.body.section || 'default';

    if (!section || typeof section !== 'string') {
      console.error("Error: sección inválida:", section);
      return cb(new Error("Sección no válida"));
    }

    const folderPath = path.join(__dirname, 'public', 'admin', 'img', 'upload-image', section);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true }); // Crea la carpeta si no existe
    }

    console.log("Guardando en:", folderPath);
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/upload-image', (req, res) => {
  let section = req.body.section || 'default';

  // Validación de la sección
  if (!section || typeof section !== 'string') {
    return res.status(400).json({ error: "Sección no válida" });
  }

  // Verifica que 'section' sea correcto antes de pasar a Multer
  console.log("Sección recibida en backend antes de Multer:", section);

  // Llama al middleware de Multer con la sección ya definida
  upload.single('image')(req, res, function (err) {
    if (err) {
      console.error("Error en la carga:", err);
      return res.status(400).json({ error: "Error en la carga de archivos" });
    }

    console.log("Cuerpo recibido después de Multer:", req.body);
    res.json({ message: "Imagen subida con éxito" });
  });
});

app.post('/delete-images', (req, res) => {
  const { section } = req.body;

  if (!section || typeof section !== 'string') {
    return res.status(400).json({ error: "No se especificó una sección válida." });
  }

  const imageFolderPath = path.join(__dirname, 'public', 'admin', 'img', 'upload-image', section);

  if (!fs.existsSync(imageFolderPath)) {
    return res.status(400).json({ error: "La carpeta especificada no existe." });
  }

  fs.readdir(imageFolderPath, (err, files) => {
    if (err) {
      console.error("Error al leer la carpeta:", err);
      return res.status(500).json({ error: "Error al eliminar imágenes." });
    }

    if (files.length === 0) {
      return res.json({ message: "No hay imágenes para eliminar." });
    }

    let errors = [];
    files.forEach(file => {
      try {
        fs.unlinkSync(path.join(imageFolderPath, file));
      } catch (unlinkErr) {
        console.error("Error al eliminar archivo:", unlinkErr);
        errors.push(file);
      }
    });

    if (errors.length > 0) {
      return res.status(500).json({ error: "Algunas imágenes no se pudieron eliminar.", files: errors });
    }

    res.json({ message: "Todas las imágenes en la carpeta han sido eliminadas." });
  });
});*/





//Configuración de Multer para almacenar imágenes que funciona
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public', 'admin', 'img', 'upload-image'), // Ruta relativa desde server.js
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre de archivo con timestamp
  }
});

const upload = multer({ storage });

// Ruta para subir imágenes ORIGINAL
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }
  res.json({ imageUrl: `admin/img/upload-image/${req.file.filename}` });
});


// Servir imágenes desde la carpeta correcta
app.use('/img', express.static(path.join(__dirname, 'public/admin/img')));


// Ruta para eliminar todas las imágenes en la carpeta
app.post('/delete-images', (req, res) => {
  const imageFolderPath = path.join(__dirname, 'public/admin/img/upload-image');
  fs.readdir(imageFolderPath, (err, files) => {
      if (err) {
          console.error("Error al leer la carpeta:", err);
          return res.status(500).send("Error al eliminar imágenes.");
      }

      // Eliminar cada archivo encontrado en la carpeta
      files.forEach(file => {
          fs.unlink(path.join(imageFolderPath, file), err => {
              if (err) console.error("Error al eliminar archivo:", err);
          });
      });

      res.send("Todas las imágenes han sido eliminadas.");
  });
});

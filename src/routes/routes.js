module.exports = function (app, databaseService, fs) {

    //inicial
    app.get('/', (req, res) => {
        res.status(200).json({ message: "Todo good" })
    })

    //productos
    app.get('/productos', (req, res) => {
        databaseService.mostrarProductos()
            .then(productos => {
                res.status(200).json({ productos })
            }).catch(e => {
                res.status(500).json({ "Algo falló": e })
            })
    })

    //crear producto
    app.post('/newproduct', (req, res) => {
        const newProduct = req.body

        databaseService.crearProducto(newProduct)
            .then(() => {
                res.status(200).json({ message: "Producto añadido con exito" })
            }).catch(e => {
                res.status(500).json(e)
            })


    })

    /* Ejemplo de crear producto:
    {
        "nombre": "Kit de jardinería urbana",
        "descripcion": "Conjunto de herramientas y semillas para cultivar un jardín en casa",
        "precio": 32.99,
        "img": "https://m.media-amazon.com/images/I/71hqp9uoXYL._AC_UF1000,1000_QL80_.jpg",
        "categoria": "jardinería"
      } */

    //Mostrar url de imagen de producto por id 
    app.get('/productos/img/:id', async (req, res) => {

        try {
            const id = req.params.id;
            const imgUrl = await databaseService.imgPorID(id)

            const contentType = 'image/jpeg'

            res.setHeader('Content-Type', contentType);
            res.redirect(imgUrl);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la imagen' });
        }

    });

    //Registros usuarios
    app.post('/createuser', (req, res) => {
        const newUser = req.body
        databaseService.crearUsuario(newUser)
            .then(() => {
                res.status(200).json({ message: "Usuario registrado correctamente" })
            }).catch(e => {
                res.status(500).json(e)
            })
    })

    //login 
    app.post('/login', async (req, res) => {

        const { correo, pass } = req.body

        try {

            const user = await databaseService.usuarioPorCorreo(correo)

            if (!user) {
                res.status(401).json({ success: false, message: "No se encontró ningun usuario" })
            }

            if (user.pass !== pass) {
                return res.status(401).json({ success: false, message: 'Contraseña incorrecta' })
            }

            res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' })
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error en el inicio de sesión' });
        }
    })


}
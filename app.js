const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const db = require('./4/4b/src/lib/db');
const multer = require('multer');
const flash = require('express-flash');
const session = require("express-session");
const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: "Dwi",
    cookie: { maxAge: 360000, secure: false, httpOnly: true },
    saveUninitialized: true,
    resave: false,
    store: new session.MemoryStore()
}));

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '4/4b/public/image');
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        },
    }),
});


app.use(express.static('4/4b/public'));

app.set('view engine', 'hbs');
app.set('views', '4/4b/views');


app.get('/', async (req, res) => {
    const hasil = await db.query("SELECT heroes.id,heroes.name_hero,heroes.image,type.name FROM heroes JOIN type ON heroes.type_id = type.id", { type: QueryTypes.SELECT });
    console.log(hasil);
    res.render('blog', {
        data: hasil,
        isLogin: req.session.isLogin,
        user: req.session.user
    });
});

app.get('/addhero', async (req, res) => {
    res.render('addhero');
})
app.post('/addhero', upload.single('image'), async (req, res) => {
    try {
        const query = `
        INSERT INTO heroes
        (name_hero,type_id,image)
        VALUES
        ('${req.body.name}','${req.body.type}' ,'${req.file.filename}')
        `;

        console.log(query);

        await db.query(query, { type: QueryTypes.INSERT });
        res.redirect('/')

    } catch (error) {
        console.log(error);

    }
})
app.get('/addtype', async (req, res) => {
    res.render('addtype');
})
app.post('/addtype', async (req, res) => {
    try {
        const query = `
        INSERT INTO type
        (name)
        VALUES
        ('${req.body.name}')
        `;

        console.log(query);

        await db.query(query, { type: QueryTypes.INSERT });
        res.redirect('/')

    } catch (error) {
        console.log(error);

    }
})
app.get('/detailblog/:blog_id', async (req, res) => {
    const id = req.params.blog_id;
    const blog = await db.query(`SELECT heroes.id,heroes.name_hero,heroes.image,type.name FROM heroes JOIN type ON heroes.type_id = type.id WHERE heroes.id = ${id}`, { type: QueryTypes.SELECT });
    console.log(blog);

    res.render('detailblog', {
        value: blog[0],
        isLogin: req.session.isLogin
    });
});


app.get('/editblog/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await db.query(`SELECT heroes.id,heroes.name_hero,heroes.image,type.name FROM heroes JOIN type ON heroes.type_id = type.id WHERE heroes.id = ${id}`, { type: QueryTypes.SELECT });

    res.render('editblog', {
        data: blog[0]
    });
});

app.post('/editblog/:id', upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id
        const newblog = {
            name: req.body.name,
            type_id: req.body.type,
            image: req.file ? req.file.filename : null
        }
        console.log(newblog);
        const query = `
        UPDATE heroes
        SET
        name_hero = '${newblog.name}',
        type_id = '${newblog.type_id}',
        image = '${newblog.image}'
        FROM type
        WHERE heroes.type_id = type.id AND heroes.id = ${id};
        
        `

        await db.query(query, { type: QueryTypes.UPDATE });
        res.redirect('/');
    } catch (error) {
        console.log(error);

    }
});

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM heroes WHERE id = ${id}`;

    await db.query(query);
    res.redirect('/')
})
app.get('/login', (req, res) => {
    const isLogin = req.session.isLogin

    if (isLogin) {
        req.flash('danger', 'anda belum login')
        return res.redirect('/blog')
    }
    res.render('login', {
        isLogin: isLogin,
        user: req.session.user,
        messages: req.flash()
    })
})
app.post('/login', async (req, res) => {
    try {
        const query = `
    SELECT * FROM users
    WHERE
    email = '${req.body.email}'
    `;

        const existUser = await db.query(query, { type: QueryTypes.SELECT });

        if (existUser.length == 0) {
            req.flash('error', 'login gagal');
            res.redirect('/login');
            return;
        }

        const checkPassword = await bcrypt.compare(req.body.password, existUser[0].password)
        if (!checkPassword) {
            req.flash('danger', 'password salah')
            return res.redirect('/login')
        }

        req.session.user = existUser[0];
        req.session.isLogin = true;
        req.flash('success', 'login sukses');
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.redirect('/')

    }

})
app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    try {
        const salt = 10

        bcrypt.hash(req.body.password, salt, async (err, hashPassword) => {
            await db.query(`INSERT INTO users (username,email,password) VALUES ('${req.body.username}','${req.body.email}','${hashPassword}')`)
        })
        res.redirect('/login')

    } catch (error) {
        console.log(error);
        res.redirect('/')

    }
})
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('login')
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');

})


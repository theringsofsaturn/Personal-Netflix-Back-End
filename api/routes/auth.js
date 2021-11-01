import User from ("../models/User");

const router = express.Router()

//REGISTER
router.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
    })
})
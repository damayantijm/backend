const db = require('../db-connection.js')
const router = require('express').Router()
const auth = require('../middlewares/auth.js')

db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)')

router.get('/',auth, (req,res) => {
    res.end(`<html>
    <div>
        <form method="post" action="/user">
            <input type="text" name="username">
            <input type="text" name="password">
                <button type="submit"> Add </button>
            </input>
        </form>
    </div>
    </html>`)
})
router.post('/', (req,res,next) => {
    const stmt = db.prepare('SELECT COUNT(*) as jumlah_user FROM users')
    stmt.get((err,result) => {
        if (result.jumlah_user > 0){
            auth(req, res, next)
        } else {
            next()
        }
    })
},(req,res) => {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?,?)')
    stmt.run(req.body.username, req.body.password, function(err){
        if (err){
            res.end(500)
            return
        }
        res.json({id: this.lastID, username:req.body.username})
    })
})
router.delete('/:id', auth,(req,res) => {

})

module.exports = router
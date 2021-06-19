const db = require('../db-connection.js')
const router = require('express').Router()

db.run('CREATE TABLE IF NOT EXISTS todos(deskripsi TEXT)')

router.get('/',(req,res) => {
    res.end(`<html>
    <div>
        <form method="post" action="/todo">
            <input type="text" name="deskripsi">
                <button type="submit"> Add </button>
            </input>
        </form>
    </div>
    </html>`)
})
router.post('/', (req,res) => {
    const stmt = db.prepare('INSERT INTO todos (deskripsi) VALUES (?)')
    stmt.run(req.body.deskripsi)
    res.end()
})
router.delete('/:id', (req,res) => {
    
})

module.exports = router
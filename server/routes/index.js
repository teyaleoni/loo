import express from 'express'
const Router = express.Router()
const conn = require('../utils/db')

Router.get('/example', (req, res, next) => {
  res.json({
    example: 'example'
  })
})

Router.get('/listings', (req, res, next) => {
  const sql = 
    `SELECT name, 
            longitude, 
            latitude 
    FROM 
      LISTINGS`

      
  conn.query(sql, (error, results, fields) => {
    res.json(results)

  })

})



export default Router
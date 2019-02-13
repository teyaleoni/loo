import express from 'express'
const Router = express.Router()
const axios = require('axios')
const conn = require('../utils/db')

// Router.get('/listings', (req, res, next) => {
//   const sql = `SELECT a.*, GROUP_CONCAT(feat.feature SEPARATOR ', ') as features
//   FROM listings a
//   LEFT JOIN listings_features_link b ON a.id = b.listing_id
//   LEFT JOIN features feat ON b.feature_id = feat.id
//   GROUP BY a.id;`


//       conn.query( sql, (error, results, fields) => {
//         console.log(results)
//           res.json(results);
//       });
// });

// Router.get('/listings/:id', (req, res, next) => {
//   const sql = `SELECT a.*, GROUP_CONCAT(feat.feature SEPARATOR ', ') as features
//   FROM listings a
//   LEFT JOIN listings_features_link b ON a.id = b.listing_id
//   LEFT JOIN features feat ON b.feature_id = feat.id
//   WHERE a.id = ?
//   GROUP BY a.id;`
//   const id = req.params.id

//   conn.query(sql, [id], (err, results, fields) => {
//       res.json(results)
//     })
// })

var listings = []
getGoogleResults()

  function getGoogleResults(nextPageToken="start"){
    return new Promise ((res,rej) => { nextPageToken,
      axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.158522,-115.152391&radius=1500&key=AIzaSyAxQF4uwgD1M4D0W7_fj0zQaCppeHaTtC0&pagetoken=CqQCFQEAAM-R84GgR5LZ44X-34xucdBBoNL2jKRYbBaNsOgTt3KbM5MOOloyEtr-SjY0tY_7mxB-800tyvOGvXQcQJp7fyXiNH04HdejUsX5M9VwPmD0NtmHOlCLzunjScK_ngN44FQVJaFQAp7dgObOE1fwq0OWjYLsi257DZGVMm8OjuJ9NUd3Fw2J_rax_o-vNODMMXfNsc99PZSj9N5f8MwSLbBa6VSRnwW0aFTzp080qF7EzvAIXjZEPkpwf-nWAcctwPEvYYeoglw71AglkJ15JW7ZqCa7-tNyFqxIKADPuk-4IheasOlk4YcVbKldrIHB9WYQZTCr6XeWvVFjsGRiV0iKSMbJb0doTAcmaaWUuDni4RRsE9vM0yBKpPyuRzCsHBIQEkaahrvZNFWMbkLZYf3yphoUY8Qil8vJIWkfwDggQq7KH5mUi24").then(resp => {
        if (resp.data.results) {
        const listings2 = resp.data.results.map(datum => ({
          id: datum.id,
          photo: datum.photos,
          location: datum.geometry.location,
          name: datum.name,
          place_id: datum.place_id,
        }))
        listings = listings.concat(listings2)
      }
      if(resp.data.nextPageToken){
        return getGoogleResults(nextPageToken = resp.data.nextPageToken).then(res)
      }
        return res()
    }).catch(rej)
  })
}



Router.get('/listings', (req, res, next) => {
  res.json(listings);
})

Router.get('/listing/:google_place_id', (req, res, next) => {
  const google_place_id = req.params["google_place_id"]
  axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${google_place_id}&key=AIzaSyAVJoGr5pyaGNsc0XpbOCYGB3EfKjxXuc4`).then(data => {
    resp.send(data.results);
  })
})

export default Router
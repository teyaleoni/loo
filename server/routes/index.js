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

let listings = []
const companies = ['Starbucks', 'Mcdonald\'s', 'Container Park', 'In n Out', 'Walgreens Drug Store', 'Smart and Final', '7-eleven', 'Carl\'s Jr', 'Savers', 'Fremont Street Experience', 'Chevron', 'Circle K Convenience Store', 'CVS Convenience Store', 'Smith\'s Food and Drug', 'Taco Bell', 'Albertsons', 'Dunkin\' Donuts', 'Burger King', 'ARCO']

for (const company of companies) {
  getGoogleResults(company)
}

function getGoogleResults(keyword, nextPageToken = "") {
  return new Promise((res, rej) => {
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
      "location=36.158522,-115.152391" +
      "&radius=2000" +
      `&keyword=${keyword}` +
      "&key=AIzaSyAmjIY1E4X_kqTBYDgngyXI5Q8npxmVSGU" +
      `&pagetoken=${nextPageToken}`;

    axios.get(url).then(resp => {
      if (resp.data.results) {
        const listings2 = resp.data.results.map(datum => ({
          id: datum.id,
          photo: datum.photos,
          location: datum.geometry.location,
          name: datum.name,
          place_id: datum.place_id,
        }))
        listings = listings.concat(listings2)
        listings.sort()
      }
      if (resp.data.next_page_token) {
        setTimeout(() => {
          return getGoogleResults(keyword, resp.data.next_page_token).then(res).catch(rej)
        }, 3000);
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
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${google_place_id}`
    + `&key=AIzaSyAmjIY1E4X_kqTBYDgngyXI5Q8npxmVSGU`;
  axios.get(url).then(resp => {
    res.send(resp.data.result);
  })
})

// Router.get('/comments/:place_id', (req, res, next) => {
//   const sql = `SELECT a.*
//   FROM comments a
//   WHERE place_id = ?`
//   const place_id = [req.params.place_id]

//   conn.query(sql, place_id, (error, results, fields) => {
//     console.log(results)
//     res.json(results);
//   });
// })

// Router.post('/comment', (req, res, next) => {
//   const sql = `INSERT INTO comments (place_id, br_comment)
//   VALUES (?, ?)`

//   conn.query(sql, [req.body.place_id, req.body.br_comment], (error, results, fields) => {
//     res.json({ message: "Comment Added" });
//   })
// })

export default Router
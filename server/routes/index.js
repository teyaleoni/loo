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

  function getGoogleResults(nextPageToken=""){
    return new Promise ((res,rej) => {
      const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
      "location=36.158522,-115.152391" +
      "&radius=1500" +
      "&key=AIzaSyAxQF4uwgD1M4D0W7_fj0zQaCppeHaTtC0" +
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
      }
      if(resp.data.next_page_token){
        setTimeout(() => {
          return getGoogleResults(resp.data.next_page_token).then(res).catch(rej)
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
  + `&key=AIzaSyAVJoGr5pyaGNsc0XpbOCYGB3EfKjxXuc4`;
  console.log(url);
  axios.get(url).then(resp => {
    console.log(resp.data);
    res.send(resp.data.result);
  })
})

export default Router
/* tslint:disable no-var-requires */
const express = require('express')
// const fs = require('fs')
/* tslint:disable no-var-requires */
const cors = require('cors')
/* tslint:disable no-var-requires */
const bodyParser = require('body-parser')
import gplay from 'google-play-scraper'	//baraye server ok hast

const app = express()
// app.use(express.urlencoded({extended: true}))	// for parsing application/x-www-form-urlencoded 
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.urlencoded())
app.use(cors())

app.get('/', bodyParser.json(), async function () {
	console.log('sssss')
	var getList = await gplay.list({
		category: gplay.category.GAME_ACTION,
		collection: gplay.collection.TOP_FREE,
		num: 2
	})
	// .then(console.log
	// getList = data
	/* await data.map(async (value) => {
		newgetList = await gplay.app({
			appId: value.appId
		})
	}) */
	// );
	console.log(getList)
	// res.send({ data: getList })
})

app.post('/', bodyParser.json(), function (req, res) {
	res.end('heelo')
})

app.listen(8000, () => { console.log('server run') })
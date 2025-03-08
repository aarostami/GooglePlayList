'use server'
import gplay from 'google-play-scraper'	//baraye server ok hast

export default async function getlistfn(cat, counter) {
	// 'use server'

	// async function ff() {
	// 'use server'
	// let getList;
	let newgetList = [];
	console.log(cat)
	console.log(counter)

	await gplay.list({
		category: (cat != undefined && cat != '') ? cat : gplay.category.GAME_ACTION,
		collection: gplay.collection.TOP_FREE,
		num: (counter != undefined) ? counter : 5
	}).then(async data => {
		for (let i = 0; i < data.length; i++) {
			// getList = data;
			newgetList = await gplay.app({
				appId: data[i].appId
			}).then(da =>
			// console.log(da);
			// data.install = da.installs;
			// data.forEach((val) =>
			{
				const numi = da.installs.replaceAll(',', '').replace('+', '');
				data[i].installs = da.installs
				data[i].installsNum = numi
			}
				// newgetList = data;	//ino inja mizarim nemidoonam chera dar return undefined mishe.
				// return data
				// console.log(newgetList)
				// )
			)
		}
		newgetList = data;
	});

	return newgetList
}
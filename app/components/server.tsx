'use server'
import gplay from 'google-play-scraper'	//baraye server ok hast

export default async function getlistfn(cat, counter) {
	let newgetList = [];

	await gplay.list({
		category: (cat != undefined && cat != '') ? cat : gplay.category.GAME_ACTION,
		collection: gplay.collection.TOP_FREE,
		num: (counter != undefined) ? counter : 5
	}).then(async data => {
		// ba map ya forEach ya ... nemishe.
		for (let i = 0; i < data.length; i++) {
			newgetList = await gplay.app({
				appId: data[i].appId
			}).then(da =>
			// data.install = da.installs;
			// data.forEach((val) =>
			{
				const numi = da.installs.replaceAll(',', '').replace('+', '');
				data[i].installs = da.installs
				data[i].installsNum = numi
			}
				// newgetList = data;	//ino inja mizarim nemidoonam chera dar return undefined mishe.
				// return data
			)
		}
		newgetList = data;
	});

	return newgetList
}

export async function getStaticProps() {

}
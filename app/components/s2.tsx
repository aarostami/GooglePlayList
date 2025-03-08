'use server'
import gplay from 'google-play-scraper'	//baraye server ok hast

export default async function s2(list) {
	// 'use server'

	// async function ff() {
	// 'use server'
	console.log(list[0].appId)
	// let getList;
	const newgetList = [];

	// ba map ya forEach ya ... nemishe.
	for (let i = 0; i < list.length; i++) {
		await gplay.app({
			appId: list[i].appId
		}).then(data => {
			newgetList.push([...list, data.installs])
		})
	}

	return newgetList
}
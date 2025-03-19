'use server'
import gplay from 'google-play-scraper'	//baraye server ok hast

export default async function Category() {

	return {category: gplay.category}
	/* return (category.length) ? Object.keys(category).map((value) =>
		<Chip label={value} variant='outlined' />
	) : 'loading' */
}
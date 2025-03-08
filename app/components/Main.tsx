'use client'
import { Avatar, Button, Chip, Container, Divider, Grid, ListItemAvatar, ListItemIcon, ListItemText, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
//import gplay from 'google-play-scraper'	//baraye server ok hast
import React, { Suspense, useEffect, useState } from 'react';
import getlistfn from './server';
//import s2 from './s2';

//import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
//import { HotTable } from '@handsontable/react-wrapper';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';

import StarIcon from '@mui/icons-material/Star';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import Category from './category';
//import { NoSsr } from '@mui/base/NoSsr';
//import { CacheProvider } from '@emotion/react';
import './main.css'

registerAllModules();

export default function Main() {
	// var getList;
	//let newgetList;
	// 'use server'
	// var [state, action, pending] = useActionState(getlist, null)

	/* async function getlist() {
		'use server'
		await gplay.list({
			category: gplay.category.GAME_ACTION,
			collection: gplay.collection.TOP_FREE,
			num: 4
		}).then(async data => {
			await data.map(async (value) => {
				newgetList = await gplay.app({
					appId: value.appId
				})
			})
		});
	} */
	const [getList, setGetList] = useState([])
	const [category, setCategory] = useState({})
	const [catName, setCatName] = useState('')
	const [counter, setCounter] = useState(10)
	const [firstrender, setFirstrender] = useState(true)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// fetch('http://localhost:8000').then(res => res.json()).then(data => console.log(data))
		if (firstrender == true) {
			getlistfn()
				.then(res => {
					// getList = res; console.log(res);
					setGetList(res); console.log(res);
					// await s2(res).then(async res => { await console.log(res); newgetList = res; getList = [...getList] })
				})
			Category()
				.then(resp => { setCategory(Object.keys(resp.category)); console.log(resp) })
			console.log(category)
			setFirstrender(false)
		}

	}, [])

	const catfn = (e) => {
		console.log(e)
		setCatName(e.target.innerText)
		getlistfn(e.target.innerText)
			.then(res => {
				// getList = res; console.log(res);
				setGetList(res); console.log(res)
			})
	}

	const rate_lth = () => {
		setGetList(getList.toSorted((a, b) => a.score - b.score))
	}

	const rate_htl = () => {
		setGetList(getList.toSorted((a, b) => b.score - a.score))
	}

	const install_lth = () => {
		setGetList(getList.toSorted((a, b) => a.installsNum - b.installsNum))
	}

	const install_htl = () => {
		setGetList(getList.toSorted((a, b) => b.installsNum - a.installsNum))
	}

	const more = () => {
		setCounter(counter + 5)
		// console.log(counter)
		setLoading(true)
		getlistfn(catName, counter)
			.then(res => {
				// getList = res; console.log(res);
				setGetList(res); console.log(res); setLoading(false)
			})
	}

	/* var isServer = typeof window === 'undefined'
	console.log(isServer ? 'server' : 'client') */

	return <>
		<Container maxWidth sx={{ py: '1rem' }}>
			<Typography sx={{ textAlign: 'center' }} variant='h4'>Google Play List</Typography>
			<Stack direction={'row'} sx={{ flexWrap: 'wrap', py: '2rem', rowGap: '0.3rem', columnGap: '0.3rem' }}>
				{(category.length) ? category.map((value, index) =>
					<Chip key={index} label={value} variant='outlined' onClick={(e) => catfn(e)} />
				) : <p>loading...</p>}
				{/* {() => Category()} */}
			</Stack>
			<Divider sx={{ mb: '1rem' }} />
			<Grid container sx={{ gap: '0.5rem' }}>
				<Button variant='contained' onClick={() => rate_lth()}>rate (low to high)</Button>
				<Button variant='contained' onClick={() => rate_htl()} /* sx={{ mx: '0.5rem' }} */>rate (high to low)</Button>
				<Button variant='contained' onClick={() => install_lth()} /* sx={{ mx: '0.5rem' }} */>install (low to high)</Button>
				<Button variant='contained' onClick={() => install_htl()}>install (high to low)</Button>
			</Grid>
			{/* <List> */}
			<Suspense fallback="loading">
				<TableContainer>
					<Table sx={{ my: '1rem' }}>
						<TableBody>
							{(getList.length) ? getList.map((value, index) =>
								// <React.Fragment key={index}>
								// 	<ListItemAvatar>
								// 		<Avatar src={value.icon} />
								// 	</ListItemAvatar>
								// 	<Typography fontWeight={'bold'}>{value.title}</Typography>
								// 	{/* <Typography>{value.summary}</Typography> */}
								// 	<ListItemIcon>
								// 		<StarIcon />
								// 		<ListItemText primary={value.scoreText} />
								// 	</ListItemIcon>
								// 	<ListItemIcon>
								// 		<InstallMobileIcon />
								// 		<ListItemText primary={value.installs} />
								// 	</ListItemIcon>
								// 	{/* <Divider /> */}
								// </React.Fragment>

								<TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f3f3f3' } }}>
									<TableCell sx={{ fontWeight: 'bold' }}>
										{index + 1}
									</TableCell>
									<TableCell>
										<ListItemAvatar>
											<Avatar src={value.icon} />
										</ListItemAvatar>
									</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }}>
										{value.title}
									</TableCell>
									{/* <Typography>{value.summary}</Typography> */}
									<TableCell>
										<ListItemIcon>
											<StarIcon />
											<ListItemText primary={value.scoreText} />
										</ListItemIcon>
									</TableCell>
									<TableCell>
										<ListItemIcon>
											<InstallMobileIcon />
											<ListItemText primary={value.installs} />
										</ListItemIcon>
									</TableCell>
								</TableRow>
							) : <TableRow>
								<TableCell>loading...</TableCell>
								<TableCell>loading...</TableCell>
								<TableCell>loading...</TableCell>
								<TableCell>loading...</TableCell>
							</TableRow>}
						</TableBody>
					</Table>
				</TableContainer>
				<Button loading={loading} variant='contained' size='large' onClick={() => more()} sx={{ display: 'block', mx: 'auto', my: '1rem' }}>Load more</Button>
			</Suspense>
			{/* <div className='ht-theme-main-dark-auto'>
				<HotTable
					licenseKey='non-commercial-and-evaluation'
					data={getList}
					columnSorting={true}
					// height="auto"
					autoWrapRow={true}
					autoWrapCol={true}
					// colWidths={150}
					// rowHeights={150}
					hiddenColumns={{
						columns: [2, 8]
					}}
					columns={[
						{
							data: 'title',
							renderer: 'text'
						},
						{
							data: 'scoreText',
							renderer: 'text'
						},
						{
							data: 'installs',
							renderer: 'text'
						},
						{
							data: 'icon',
							renderer: function renderer(instance, td, row, col, prop, value, cellProperties) {
								const img = document.createElement('img')
								img.src = value
								// img.width = '50px'
								// img.height = '50px'
								td.innerHTML = ''
								td.appendChild(img)
								return td
							}
						}
					]}
				/>
			</div> */}
			{/* </List> */}
		</Container>
	</>
}
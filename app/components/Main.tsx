'use client'
import { Avatar, Button, Chip, Container, Divider, Grid, List, ListItemAvatar, ListItemIcon, ListItemText, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
//import gplay from 'google-play-scraper'	//baraye server ok hast
import React, { Suspense, useEffect, useState } from 'react';
import getlistfn from './server';
import Category from './category';
//import Handsontable from 'handsontable/base';
// import { registerAllModules } from 'handsontable/registry';
//import { HotTable } from '@handsontable/react-wrapper';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import StarIcon from '@mui/icons-material/Star';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
//import { NoSsr } from '@mui/base/NoSsr';
//import { CacheProvider } from '@emotion/react';
import './main.css'

// registerAllModules();

export default function Main() {
	// var [state, action, pending] = useActionState(getlist, null)
	const [getList, setGetList] = useState([])
	const [category, setCategory] = useState({})
	const [catName, setCatName] = useState('')
	const [counter, setCounter] = useState(10)
	const [firstrender, setFirstrender] = useState(true)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (firstrender == true) {
			/* Category()
				.then(resp => { setCategory(Object.keys(resp.category)); console.log(resp) }) */
			fetch('http://localhost:8000/category').then(res => res.json()).then(data => setCategory(Object.keys(data.category)))
			/* getlistfn()
				.then(res => { getList = res; //in baad az reseive data new render nemikone.
				setGetList(res); console.log(res); }) */
			fetch('http://localhost:8000', { method: 'POST' }).then(res => res.json()).then(data => { setGetList(data.toSorted((a, b) => b.installsNum - a.installsNum)); console.log(data) })
			// collection:
			// TOP_FREE: 'TOP_FREE', --> default
			// TOP_PAID: 'TOP_PAID',
			// GROSSING: 'GROSSING'
			// clusters:
			// new: 'new',
			// top: 'top'
			// sort:
			// NEWEST: 2,
			// RATING: 3,
			// HELPFULNESS: 1
			setFirstrender(false)
		}
	}, [])

	const catfn = (e) => {
		/* getlistfn(e.target.innerText).then(res => setGetList(res); console.log(res)) */
		fetch('http://localhost:8000/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ catName: e.target.innerText })
		}).then(res => res.json()).then(data => setGetList(data))
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
		setLoading(true)
		/* getlistfn(catName, counter).then(res => { setGetList(res); setLoading(false) }) */
		fetch('http://localhost:8000', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ catName: catName, counter: counter })
		}).then(res => res.json()).then(data => { setGetList(data.toSorted((a, b) => b.installsNum - a.installsNum)); setLoading(false); console.log(data) })
	}

	/* var isServer = typeof window === 'undefined'
	console.log(isServer ? 'server' : 'client') */

	return <Container maxWidth sx={{ py: '1rem' }}>
		<Typography sx={{ textAlign: 'center' }} variant='h4'>Google Play List</Typography>
		<Stack direction={'row'} sx={{ flexWrap: 'wrap', py: '2rem', rowGap: '0.3rem', columnGap: '0.3rem' }}>
			{(category.length) ? category.map((value, index) =>
				<Chip key={index} label={value} variant='outlined' onClick={(e) => catfn(e)} />
			) : <p>loading...</p>}
		</Stack>
		<Divider sx={{ mb: '1rem' }} />
		<Grid container sx={{ gap: '0.5rem' }}>
			<Button variant='contained' onClick={() => rate_lth()}>rate (low to high)</Button>
			<Button variant='contained' onClick={() => rate_htl()} /* sx={{ mx: '0.5rem' }} */>rate (high to low)</Button>
			<Button variant='contained' onClick={() => install_lth()} /* sx={{ mx: '0.5rem' }} */>install (low to high)</Button>
			<Button variant='contained' onClick={() => install_htl()}>install (high to low) (default)</Button>
		</Grid>
		<List>
			<Suspense fallback="loading">
				<TableContainer>
					<Table sx={{ my: '1rem' }}>
						<TableBody>
							{(getList.length) ? getList.map((value, index) =>
								/* <React.Fragment key={index}>
								<ListItemAvatar>
												<Avatar src={value.icon} />
										  </ListItemAvatar>
										  <Typography fontWeight={'bold'}>{value.title}</Typography>
								<Typography>{value.summary}</Typography>
								<ListItemIcon>
												<StarIcon />
												<ListItemText primary={value.scoreText} />
										  </ListItemIcon>
										  <ListItemIcon>
												<InstallMobileIcon />
												<ListItemText primary={value.installs} />
										  </ListItemIcon>
								<Divider />
								</React.Fragment> */
								<TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f3f3f3' } }}>
									{/* ba div error td nemitoone dar div bashe mide */}
									{/* <div className='table_small'> */}
									<TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
										{index + 1}
									</TableCell>
									<TableCell>
										<Avatar src={value.icon} />
									</TableCell>
									<TableCell sx={{ fontWeight: 'bold' }}>
										{value.title}
									</TableCell>
									{/* </div> */}
									{/* <Typography>{value.summary}</Typography> */}
									{/* <div className='table_small'> */}
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
									{/* </div> */}
								</TableRow>
							) : <TableRow>
								<TableCell sx={{fontSize: '1.5rem'}}>loading...</TableCell>
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
		</List>
	</Container>
}
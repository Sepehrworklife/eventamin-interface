import {Container, Grid, Typography} from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import styles from '../../../styles/home.module.scss';
import {Search} from '../../modules/home/search';

export const Hero = () => {
	const {t, lang} = useTranslation('home');

	return (
		<Grid container id={styles.main_hero}>
			<Container maxWidth="md" id={styles.main_hero_container}>
					<Typography variant="h2" component="h2">{t("hero.title")}
					</Typography>
					<Typography variant="h5" component="p">
						{t("hero.description")}
						</Typography>
						<Search />
				</Container>
		</Grid>
	)
}

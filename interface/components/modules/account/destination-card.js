import useTranslation from "next-translate/useTranslation"
import {Card, CardHeader, CardActions, Button, CardContent, Divider} from '@mui/material';
import {DestinationResultTable} from '../../modules/destination/table-result';

export const DestinationCard = () => {

	const {t,lang} = useTranslation();

	return (
		
							<Card>
								<CardHeader title={t("destination_card_title")} />
								<Divider />
								<CardContent>
									<DestinationResultTable pageSize={5} rowsPerPageOptions={[5]} />
								</CardContent>
								<CardActions>
									<Button
										size="small"
										onClick={() => router.push("/account/destination")}
									>
										{t("destination_text_link")}
									</Button>
								</CardActions>
							</Card>
	)
}

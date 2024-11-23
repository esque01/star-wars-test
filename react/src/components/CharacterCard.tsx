import { Accordion, AccordionDetails, AccordionSummary, Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import starwarsBackground from "../assets/star_wars_background.jpg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Character } from '../types/Character.interface';

interface CharacterTypeProps {
    character: Character | undefined;
}

export default function CharacterCard({ character }: CharacterTypeProps) {

  return (
    <Card
        sx={{
            width: 450,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}}>
        <CardActionArea>
            <CardMedia
                component={'img'}
                height={"200"}
                src={starwarsBackground}>
            </CardMedia>
        </CardActionArea>
        {
            <div style={{ textAlign: "center", padding: "10px" }}>
                <Typography color='#fbe9d0"' gutterBottom variant='h5' component={"div"}>{character?.name}</Typography>
                <Accordion sx={{ backgroundColor: "#afb4ad" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                            Biography
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ color: 'text.secondary' }}>    
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Height:</strong> {character?.height}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Mass:</strong> {character?.mass}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Hair Color:</strong> {character?.hair_color}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Skin Color:</strong> {character?.skin_color}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Eye Color:</strong> {character?.eye_color}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Birth Year:</strong> {character?.birth_year}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Gender:</strong> {character?.gender}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Homeworld:</strong> {character?.homeworld}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Films:</strong>
                                <ol>
                                    {character?.films.map((film, index) => (
                                    <li key={index}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {film}
                                        </Typography>
                                    </li>
                                    ))}
                                </ol>
                            </Typography>
                            <Typography variant="body1">
                                <strong>Species:</strong> {character?.species.length ? <>{character.species.join(", ")}</> : "n/a"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Vehicles:</strong> {character?.vehicles.length ? <>{character.vehicles.join(", ")}</> : "n/a"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Starships:</strong> {character?.starships.length ? character?.starships.join(", ") : "n/a"}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Created:</strong> {character?.created}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Edited:</strong> {character?.edited}
                            </Typography>
                            <Typography variant="body1">
                                <strong>URL:</strong>
                                <a href={character?.url} target="_blank" rel="noopener noreferrer">{character?.url}</a>
                            </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        }
    </Card>
  )
}
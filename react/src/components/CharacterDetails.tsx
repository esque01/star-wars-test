import { Accordion, AccordionDetails, AccordionSummary, Box, CardMedia, CircularProgress, Typography } from '@mui/material'
import { Character } from '../types/Character.interface'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Homeworld } from '../types/Homeworld.interface';
import { Film } from '../types/Film.interface';


type CharacterDetailProps = {
    character: Character | undefined;
    imageSrc: string | undefined;
}


export default function CharacterDetails({ character, imageSrc }: CharacterDetailProps) {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [homeworld, setHomeworld] = useState<Homeworld | undefined>(undefined);
    const [films, setFilms] = useState<Film[]>([]);

    useEffect(() => {
        if (character?.homeworld) {
            fetchHomeWorld();
        }
        if (character?.films) {
            fetchFilms();
        }
    }, []);
    
    const onImageLoad = () => {
        setImageLoaded(true);
    }

    const fetchHomeWorld = async() => {
        await axios.get(`${character!.homeworld}`)
        .then((result) => {
            setHomeworld(result.data as Homeworld);          
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const fetchFilms = async() => {
        const filmPromises = character!.films
            .map((film: string) => axios.get(film));

        try {
            const results = await Promise.all(filmPromises);
            const fetchedFilms = results.map((result) =>  result.data as Film);
            setFilms(fetchedFilms);
        } 
        catch (error) {
            console.log(error);
        }
    }

  return (
    <Box>
        <Box sx={{ height: "200px" }}>
            {
                !imageLoaded &&
                <Box sx={{ display: "flex", height: "200px", justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color='warning' />
                </Box>
            }
            {
                imageSrc &&
                <CardMedia
                    component={'img'}
                    height={"200"}
                    onLoad={onImageLoad}
                    src={imageSrc}>
                </CardMedia>
            }
        </Box>
        <Box sx={{ textAlign: "center", padding: "10px" }}>
            <Typography sx={{ color: 'text.secondary' }} gutterBottom variant='h4'>{character?.name}</Typography>
            <Accordion defaultExpanded={true}>
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
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                                Homeworld
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ color: 'text.secondary' }}>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Name:</strong> {homeworld?.name}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Rotation Period:</strong> {homeworld?.rotation_period}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Orbital Period:</strong> {homeworld?.orbital_period}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Diameter:</strong> {homeworld?.diameter}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Climate:</strong> {homeworld?.climate}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Gravity:</strong> {homeworld?.gravity}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Terrain:</strong> {homeworld?.terrain}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Surface Water:</strong> {homeworld?.surface_water}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                <strong>Population:</strong> {homeworld?.population}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Typography>
                        <strong>Films:</strong>
                    </Typography>
                        {
                            films.map((film, index) => (
                            <ul key={index}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {film.title}
                                </Typography>
                            </ul>
                        ))}
                    <Typography variant="body1">
                        <strong>Species:</strong>
                    </Typography>
                        {
                            character?.species && character.species.length > 0 ? (
                                character?.species.map((species, index) => (
                                <ul key={index}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {species}
                                    </Typography>
                                </ul> 
                            )))
                                :
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                n/a
                            </Typography>
                        }
                    <Typography variant="body1">
                        <strong>Vehicles:</strong>
                    </Typography>
                        {
                            character?.vehicles && character.vehicles.length > 0 ? (
                                character?.vehicles.map((vehicle, index) => (
                                <ul key={index}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {vehicle}
                                    </Typography>
                                </ul> 
                            )))
                                :
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                n/a
                            </Typography>
                        }
                    <Typography variant="body1">
                        <strong>Starships:</strong>
                        {
                            character?.starships && character.starships.length > 0 ? 
                            (
                                character?.starships.map((starship, index) => (
                                <ul key={index}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {starship}
                                    </Typography>
                                </ul>
                            )))
                            :
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                n/a
                            </Typography>
                        }
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
        </Box>
    </Box>
  )
}
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import starwarsBackground from "../assets/star_wars_background.jpg";
import { useEffect, useState } from 'react';
import APIClient from '../data/APIClient';
import { Character } from '../types/Character.interface';

export default function CharacterCard() {

    const [character, setCharacter] = useState<Character | undefined>(undefined);

    useEffect(() => {
        fetchCharacter();
    }, []);


    const fetchCharacter = async() =>  {
        const randomCharacterId: number = Math.floor(Math.random() * 80) + 1;

        const response = await APIClient.get(`people/${randomCharacterId}`);
        setCharacter(response.data as Character);
    }


  return (
    <Card 
        onClick={fetchCharacter} 
        sx={{
        width: 450,
        cursor: "pointer", 
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.07)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}}>    
        <CardActionArea>
            <CardMedia
            component={'img'}
            height={"200"}
            src={starwarsBackground}>
            </CardMedia>
        </CardActionArea>
        <CardContent sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant='h5' component={"div"}>{character?.name}</Typography>
            <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: 1 }}>
            <strong>Height:</strong> {character?.height}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Mass:</strong> {character?.mass}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Hair Color:</strong> {character?.hair_color}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Skin Color:</strong> {character?.skin_color}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Eye Color:</strong> {character?.eye_color}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Birth Year:</strong> {character?.birth_year}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Gender:</strong> {character?.gender}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Homeworld:</strong> {character?.homeworld}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Films:</strong>
            <ol>
                {character?.films.map((film, index) => (
                <li key={index} style={{ backgroundColor: index % 2 === 0 ? '#D3D3D3' : 'none' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {film}
                    </Typography>
                </li>
                ))}
            </ol>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {/* <strong>Species:</strong> {character?.species.length > 0 ? character?.species.join(", ") : "N/A"} */}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {/* <strong>Vehicles:</strong> {character?.length > 0 ? character?.vehicles.join(", ") : "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Starships:</strong> {character?.starships.length > 0 ? character?.starships.join(", ") : "N/A"} */}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Created:</strong> {character?.created}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Edited:</strong> {character?.edited}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>URL:</strong> <a href={character?.url} target="_blank" rel="noopener noreferrer">{character?.url}</a>
        </Typography>
            </Typography>
        </CardContent>
    </Card>
  )
}
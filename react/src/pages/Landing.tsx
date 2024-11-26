import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import './Landing.css';
import CharacterCard from '../components/CharacterCard';
import LogoutIcon from '@mui/icons-material/Logout';
import APIClient from '../data/APIClient';
import { useEffect, useRef, useState } from 'react';
import { Character } from '../types/Character.interface';
import { useAuth } from '../context/AuthContext';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { StarWarsResult } from '../types/StarWarsResult.interface';
import CharacterModal from '../components/CharacterModal';
import axios from 'axios';


export default function Landing() {
    const navigate: NavigateFunction = useNavigate();
    const [characters, setCharacters] = useState<StarWarsResult | undefined>(undefined);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>(undefined);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

    const { isAuthenticated, logout } = useAuth();
    const isCharacterFetched = useRef<boolean>(false);


    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
      if (!isCharacterFetched.current) {
        fetchCharacters();
      }
    }, []);


    const fetchCharacters = async() =>  {
        isCharacterFetched.current = true;
        const url: string = `people`;

        await APIClient.get(url)
        .then((result) => {
          if (result.status === 200) {
            setCharacters(result.data as StarWarsResult);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }


    const fetchRandomImage = async() => {
        await axios.get("https://picsum.photos/1920/1080", {
            responseType: "blob"
        })
        .then((result) => {
            const imageUrl = URL.createObjectURL(result.data);
            setImageSrc(imageUrl);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    const handleLogout = () => {
      logout();
    }
  

    const onToggleModal = (state: boolean) => {
      if (state === false) {
        setSelectedCharacter(undefined);
        setImageSrc(undefined);
      }
      if (state === true) {
        fetchRandomImage();
      }
      setOpenModal(state);
    }


    const onCharacterClick = (character: Character) => {
      setSelectedCharacter(character);
      onToggleModal(true);
    }


    if (characters === undefined) {
      return <Box sx={{ display: "flex", height: "100vh", justifyContent: 'center', alignItems: "center" }}>
        <CircularProgress color='warning' />
      </Box>
    }


  return (
    <div className="landing-container">
      <Box sx={{display: "flex", alignItems: "center"}}>
        <IconButton sx={{scale: "1.25"}} onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
        <Typography variant='h6' marginLeft="10px">Logout</Typography>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", flexWrap: 'wrap', gap: 2, padding: "10px", mb: '100px'}}>
        {
          characters?.results.map((character: Character, index: number) => {
            return (
              <CharacterCard key={index} character={character} onClick={() => onCharacterClick(character)}></CharacterCard>
            )
          })
        }
      </Box>
      <CharacterModal onToggleModal={onToggleModal} open={openModal} character={selectedCharacter} imageSrc={imageSrc}></CharacterModal>
    </div>
  )
}
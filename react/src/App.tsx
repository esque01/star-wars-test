import { IconButton, Typography } from '@mui/material';
import './App.css';
import CharacterCard from './components/CharacterCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import APIClient from './data/APIClient';
import { useEffect, useState } from 'react';
import { Character } from './types/Character.interface';


function App() {
  
  const [character, setCharacter] = useState<Character | undefined>(undefined);

  const fetchCharacter = async() =>  {
      const randomCharacterId: number = Math.floor(Math.random() * 80) + 1;

      const response = await APIClient.get(`people/${randomCharacterId}`);
      setCharacter(response.data as Character);
  }


  useEffect(() => {
    fetchCharacter();
  }, [])


  useEffect(() => { 
  }, [character]);


  return (
    <div className="App">
        <div style={{ margin: "25px", textAlign: 'center' }}>
          <Typography>Fetch Character</Typography>
          <IconButton onClick={fetchCharacter}>
            <RefreshIcon />
          </IconButton>
        </div>
      <CharacterCard character={character}></CharacterCard>
    </div>
  );
}

export default App;

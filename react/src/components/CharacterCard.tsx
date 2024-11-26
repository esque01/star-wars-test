import { Card, Typography } from '@mui/material';
import { Character } from '../types/Character.interface';


type CharacterTypeProps = {
    character: Character | undefined;
    onClick: () => void;
}


export default function CharacterCard({ character, onClick }: CharacterTypeProps) {

  return (
    <Card
        onClick={onClick}
        sx={{
            width: 140,
            height: 60,
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}}>
        <div style={{ textAlign: "center", padding: "10px" }}>
            <Typography gutterBottom variant='body1'>{character?.name}</Typography>
        </div>
    </Card>
  )
}
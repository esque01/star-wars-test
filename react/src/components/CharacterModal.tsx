import { Button, Dialog, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'
import { Character } from '../types/Character.interface';
import CharacterDetails from './CharacterDetails';

type CharacterModalProps = {
    character: Character | undefined;
    open: boolean;
    onToggleModal: (state: boolean) => void;
    imageSrc: string | undefined;
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
){
    return <Slide direction='up' ref={ref} {...props} />;
});


export default function CharacterModal({ open, onToggleModal, character, imageSrc }: CharacterModalProps) {
  return (
    <React.Fragment>
        <Button variant='outlined' onClick={() => onToggleModal(true)}></Button>
        <Dialog
            key={character?.url}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => onToggleModal(false)}
            fullWidth
            maxWidth={'md'}>
            <DialogContent>
                <CharacterDetails character={character} imageSrc={imageSrc}></CharacterDetails>
            </DialogContent>
        </Dialog>
    </React.Fragment>
  )
}
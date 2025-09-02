import {Container, Typography} from '@mui/material';

export default function Diary() {
    return (
        <Container sx={{py: 3}}>
            <Typography variant="h4" gutterBottom>src/pages/Diary.tsx</Typography>
            <Typography>Private. Authorized users only</Typography>
        </Container>
    );
}

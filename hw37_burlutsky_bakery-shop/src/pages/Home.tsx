import {Container, Typography} from '@mui/material';

export default function Home() {
    return (
        <Container sx={{py: 3}}>
            <Typography variant="h4" gutterBottom>src/pages/Home.tsx</Typography>
            <Typography>Public access</Typography>
        </Container>
    );
}

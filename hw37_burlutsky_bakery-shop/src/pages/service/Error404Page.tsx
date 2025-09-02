// src/pages/service/Error404Page.tsx
import { Container, Typography, Stack, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Error404Page = () => {
    return (
        <Container sx={{ py: 6, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
            <Stack spacing={3} alignItems="center">
                <Box
                    component="img"
                    src="/images/error404.png"          // /public/images
                    alt="404 — page not found"
                    loading="lazy"
                    draggable={false}
                    sx={{
                        height: { xs: '40vh', sm: '50vh', md: '60vh' },
                        maxWidth: '100%',
                        objectFit: 'contain',
                        userSelect: 'none',
                    }}
                />
                <Typography variant="h4">src/pages/service/Error404Page.tsx</Typography>
                <Button variant="contained" component={RouterLink} to="/">
                    Home
                </Button>
            </Stack>
        </Container>
    );
};

export default Error404Page;

// src/pages/LoginPage/index.tsx
import * as React from 'react'
import {
    Box, Card, CardContent, CardActions, Typography, TextField, IconButton, InputAdornment, Button, CircularProgress
} from '@mui/material'
import {Visibility, VisibilityOff, Login as LoginIcon} from '@mui/icons-material'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import {useLoginMutation} from '@/features/auth/api/authApi'
import {useSelector, useDispatch} from 'react-redux'
import type {RootState} from '@/app/store'
import {setPending, setCredentials, setError} from '@/features/auth/model/authSlice'
import {mapAuthDtoToProfile, getLoginErrorMessage} from '@/features/auth/api/authMapping'

export default function LoginPage() {
    const {t} = useTranslation()
    const [showPwd, setShowPwd] = useState(false)

    // You can use any valid DummyJSON demo credentials:
    const [username, setUsername] = useState('emilys')
    const [password, setPassword] = useState('emilyspass')

    const [login, {isLoading}] = useLoginMutation()
    const error = useSelector((s: RootState) => s.auth.error)
    const dispatch = useDispatch()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            dispatch(setPending())
            const dto = await login({username, password}).unwrap()
            const mapped = mapAuthDtoToProfile(dto)
            dispatch(setCredentials(mapped))
            // NOTE: No navigation here; App will re-render since auth.token is now set
        } catch (err) {
            dispatch(setError(getLoginErrorMessage(err)))
        }
    }

    return (
        <Box sx={{minHeight: '100dvh', display: 'grid', placeItems: 'center', p: 2, bgcolor: 'background.default'}}>
            <Card sx={{width: 'min(420px, 92vw)', boxShadow: 6}}>
                <form onSubmit={onSubmit} noValidate>
                    <CardContent sx={{display: 'grid', gap: 2}}>
                        <Typography variant="h5" component="h1">
                            {t('common.login')}
                        </Typography>

                        <TextField
                            label={t('common.username')}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            fullWidth
                            required
                        />

                        <TextField
                            label={t('common.password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            fullWidth
                            required
                            type={showPwd ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility"
                                                    onClick={() => setShowPwd((v) => !v)} edge="end">
                                            {showPwd ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {typeof error === 'string' && (
                            <Typography variant="body2" color="error" role="alert">
                                {error}
                            </Typography>
                        )}
                    </CardContent>

                    <CardActions sx={{px: 2, pb: 2}}>
                        <Button type="submit" startIcon={isLoading ? <CircularProgress size={18}/> : <LoginIcon/>}
                                disabled={isLoading} fullWidth>
                            {t('common.login')}
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </Box>
    )
}

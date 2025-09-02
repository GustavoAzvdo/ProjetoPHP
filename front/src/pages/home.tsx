import { Card, CardContent, Typography, Button, Container, Grid, Box, Avatar, Stack } from "@mui/material"
import { Add, Search, Inventory } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 4 }}>
            <Box sx={{ width: "100%" }}>
                <Stack direction={{ xs: 'column', md: 'column' }} sx={{ textAlign: "center", mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: ' center', gap: 5 }}>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold", m: 0 }}>
                            Sistema de Gerenciamento de Produtos
                        </Typography>
                        <Inventory sx={{ fontSize: 50, display: { xs: 'none', md: 'flex' } }} />
                    </Box>
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: ' center', pb: 5, textAlign: 'center' }}>

                    <Typography variant="h6" color="text.secondary">
                        Gerencie seus produtos de forma simples e eficiente
                    </Typography>
                </Box>

                <Grid container spacing={6} justifyContent="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                height: "100%",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <Stack direction={'column'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
                                <Avatar sx={{ bgcolor: "primary.main", width: 54, height: 54 }}>
                                    <Add sx={{ fontSize: 30 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                                        Cadastrar Produto
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Adicione novos produtos ao sistema com informações detalhadas
                                    </Typography>
                                </Box>
                            </Stack>

                            <CardContent>
                                <Button
                                    onClick={() => navigate('/cadastro')}
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={<Add />}
                                    sx={{ py: 1.5 }}
                                >
                                    Cadastrar Produto
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card
                            sx={{
                                height: "100%",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                },
                            }}
                        >

                            <Box>
                                <Stack direction={'column'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
                                    <Avatar sx={{ bgcolor: "secondary.main", width: 54, height: 54 }}>
                                        <Search sx={{ fontSize: 32 }} />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                                            Consultar Produtos
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Visualize e gerencie todos os produtos cadastrados no sistema
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <CardContent>
                                <Button
                                   onClick={() => navigate('/consulta')}
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    startIcon={<Search />}
                                    sx={{ py: 1.5 }}
                                >
                                    Consultar Produtos
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 8, textAlign: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>

                        <Typography variant="body2" color="text.secondary">
                            Desenvolvido por Gustavo Azevedo & Jhonathan William
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}




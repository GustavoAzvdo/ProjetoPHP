import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
  TableContainer,
  Stack, // Import TableContainer
} from "@mui/material"
import { ArrowBack, Search, LocationSearching, Edit, Delete } from "@mui/icons-material"

interface Produto {
  id: number
  nome: string
  preco: number
  dataValidade: string
}


export default function Consulta() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [filtro, setFiltro] = useState("")
  const [loading, setLoading] = useState(true)

  // Simular carregamento de dados do banco
  useEffect(() => {
    const produtosMock: Produto[] = [
      {
        id: 1,
        nome: "Smartphone Samsung Galaxy",

        preco: 1299.99,
        dataValidade: "2024-01-15",
      },
      {
        id: 2,
        nome: "Notebook Dell Inspiron",
        preco: 2499.9,
        dataValidade: "2024-01-20",
      },
      {
        id: 3,
        nome: "Camiseta Polo",
        preco: 89.9,
        dataValidade: "2024-01-25",
      },
      {
        id: 4,
        nome: "Fone de Ouvido Bluetooth",
        preco: 299.99,
        dataValidade: "2024-02-01",
      },
    ]

    setTimeout(() => {
      setProdutos(produtosMock)
      setLoading(false)
    }, 1000)
  }, [])

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(filtro.toLowerCase())

  )


  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack sx={{ display: "flex", alignItems: "start", gap: 2, mb: 3 }}>
          <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate('/')}>
            Voltar ao Menu
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <LocationSearching color="primary" />
            <Typography variant="h4" component="h1">
              Consultar Produtos
            </Typography>
          </Box>
        </Stack>

        <Card>
          <CardHeader
            title="Lista de Produtos"
            subheader="Visualize e gerencie todos os produtos cadastrados no sistema"
            action={
              <TextField
                placeholder="Buscar por nome ou categoria..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                size="small"
                sx={{ minWidth: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#c9c9c9' }} />
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
          <CardContent>
            {loading ? (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
                <CircularProgress />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Carregando produtos...
                </Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Preço</TableCell>
                      <TableCell>Data Validade</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {produtosFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                          <Typography variant="body2" color="text.secondary">
                            {filtro
                              ? "Nenhum produto encontrado com os filtros aplicados."
                              : "Nenhum produto cadastrado."}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      produtosFiltrados.map((produto) => {
                       
                        return (
                          <TableRow key={produto.id} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                #{produto.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight="medium">
                                  {produto.nome}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{
                                    display: "block",
                                    maxWidth: 200,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                 
                                </Typography>
                              </Box>
                            </TableCell>
                           
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                R$ {produto.preco.toFixed(2).replace(".", ",")}
                              </Typography>
                            </TableCell>
                           
                           
                            <TableCell>{new Date(produto.dataValidade).toLocaleDateString("pt-BR")}</TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                <IconButton size="small" color="primary">
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

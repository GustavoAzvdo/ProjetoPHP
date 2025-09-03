import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
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
  Stack,
  Alert, // Import TableContainer
} from "@mui/material"


import { ArrowBack, Search, LocationSearching, Edit, Delete, Add } from "@mui/icons-material"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({ nome: "", preco: "", dataValidade: "" });


  //edicao
  const handleOpenEditDialog = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setEditForm({
      nome: produto.nome,
      preco: produto.preco.toString(),
      dataValidade: produto.dataValidade,
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setProdutoSelecionado(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if (!produtoSelecionado) return;
    try {
      await axios.put(
        "http://localhost:8080/cadastro-pdo/controller/ProductController.php",
        {
          id_pro: produtoSelecionado.id,
          name_pro: editForm.nome,
          value_pro: Number(editForm.preco),
          date_pro: editForm.dataValidade,
        }
      );
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === produtoSelecionado.id
            ? {
              ...p,
              nome: editForm.nome,
              preco: Number(editForm.preco),
              dataValidade: editForm.dataValidade,
            }
            : p
        )
      );
      setSnackbar({ open: true, message: "Produto atualizado com sucesso.", severity: "success" });
      handleCloseEditDialog();
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao atualizar produto.", severity: "error" });
    }
  };
  //exclusao
  const handleOpenDialog = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProdutoSelecionado(null);
  };

  const handleDelete = async () => {
    if (!produtoSelecionado) return;
    try {
      await axios.delete(`http://localhost:8080/cadastro-pdo/controller/ProductController.php?id_pro=${produtoSelecionado.id}`);
      setProdutos((prev) => prev.filter((p) => p.id !== produtoSelecionado.id));
      setSnackbar({ open: true, message: `Produto "${produtoSelecionado.nome}" excluído com sucesso.`, severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Erro ao excluir produto.", severity: "error" });
    } finally {
      handleCloseDialog();
    }
  };
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await axios.get("http://localhost:8080/cadastro-pdo/controller/ProductController.php")
        // if (!response.ok) {
        //   throw new Error("Erro ao buscar produtos")
        // }
        const data = response.data
        console.log("Response do backend:", response)

        // Ajustar os campos para bater com o seu backend
        const produtosDoBanco: Produto[] = Array.isArray(data)
          ? data.map((item: any) => ({
            id: item.id_pro,
            nome: item.name_pro,
            preco: parseFloat(item.value_pro),
            dataValidade: item.date_pro,
          }))
          : []

        setProdutos(produtosDoBanco)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    setTimeout(() => {
      carregarProdutos()
      setLoading(false)
    }, 1000)
  }, [])

  const produtosFiltrados = produtos.filter((produto) => {
    const filtroLower = filtro.toLowerCase();

    // Nome
    const nomeMatch = produto.nome.toLowerCase().includes(filtroLower);

    // Preço (formata para string com vírgula e ponto)
    const precoStr = produto.preco.toFixed(2).replace('.', ',');
    const precoMatch =
      precoStr.includes(filtroLower) ||
      produto.preco.toString().includes(filtroLower);

    // Data (formata para pt-BR e ISO)
    const dataBR = new Date(produto.dataValidade).toLocaleDateString("pt-BR");
    const dataISO = produto.dataValidade; // yyyy-mm-dd
    const dataMatch =
      dataBR.includes(filtroLower) ||
      dataISO.includes(filtroLower);

    return nomeMatch || precoMatch || dataMatch;
  });


  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack sx={{ display: "flex", alignItems: "start", gap: 2, mb: 3 }}>
          <Button variant="outlined" startIcon={<ArrowBack />} sx={{ width: { xs: '100%', sm: '50%', md: '20%' } }} onClick={() => navigate('/')}>
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
            title={
              <Typography variant="h6" sx={{ fontSize: { xs: 18, sm: 22 } }}>
                Lista de Produtos
              </Typography>
            }
            subheader={
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 16 } }}>
                Visualize e gerencie todos os produtos cadastrados no sistema
              </Typography>
            }
            sx={{
              px: { xs: 1, sm: 3 },
              py: { xs: 1, sm: 2 },
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 1, sm: 0 }
            }}
            action={
              <Box sx={{ width: { xs: "100%", sm: 300 }, mt: { xs: 1, sm: 0 } }}>
                <TextField
                  sx={{ width: { xs: '100%' } }}
                  placeholder="Buscar por nome, preço ou data"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: '#c9c9c9' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
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
                                <IconButton size="small" color="primary" onClick={() => handleOpenEditDialog(produto)}>
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleOpenDialog(produto)}
                                >
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
            <Button variant="outlined" startIcon={<Add />} sx={{ width: { xs: '100%', sm: '50%', md: '20%' }, my: 2 }} onClick={() => navigate('/cadastro')}>
              Cadastrar novos produtos
            </Button>
          </CardContent>
          {/* Modal de confirmação */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogContent>
              Deseja excluir o produto "{produtoSelecionado?.nome}"?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Não
              </Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                Sim
              </Button>
            </DialogActions>
          </Dialog>

          {/* Modal de edição */}
          <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5">
                Editar Produto

              </Typography>
              <Edit color="primary" />
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 350, py: 4 }}>
              <TextField
                required
                margin="dense"
                label="Nome"
                name="nome"
                value={editForm.nome}
                onChange={handleEditInputChange}
                fullWidth
              />
              <TextField
                required
                margin="dense"
                label="Preço"
                name="preco"
                type="number"
                value={editForm.preco}
                onChange={handleEditInputChange}
                fullWidth
              />
              <TextField
                required
                margin="dense"
                label="Data de Validade"
                name="dataValidade"
                type="date"
                value={editForm.dataValidade}
                onChange={handleEditInputChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleEditSave} color="success" variant="contained">
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          >
            <Alert
              onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Card>
      </Box>
    </Container>
  )
}

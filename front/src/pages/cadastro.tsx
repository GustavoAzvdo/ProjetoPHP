
import type React from "react"
import { useState } from "react"
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
  Grid,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material"
import { ArrowBack, Save, Inventory } from "@mui/icons-material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Cadastro() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    estoque: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.nome || !formData.preco || !formData.categoria) {
      setSnackbar({
        open: true,
        message: "Por favor, preencha todos os campos obrigatórios.",
        severity: "error",
      })
      return
    }

    // Simular salvamento no banco de dados
    console.log("Dados do produto:", formData)

    setSnackbar({
      open: true,
      message: `O produto "${formData.nome}" foi cadastrado com sucesso.`,
      severity: "success",
    })

    // Limpar formulário
    setFormData({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
      estoque: "",
    })
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction={'column'} sx={{ display: 'flex', mb: 2, gap: 5 }}>
          <Button variant="outlined" startIcon={<ArrowBack />} sx={{ width: '20%' }} onClick={() => navigate('/')}>
            Voltar ao Menu
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Inventory color="primary" />
            <Typography variant="h4" component="h1">
              Cadastrar Produto
            </Typography>
          </Box>

        </Stack>


        <Card>
          <CardHeader
            title="Informações do Produto"
            subheader="Preencha os dados abaixo para cadastrar um novo produto no sistema"
          />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Nome do Produto"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite o nome do produto"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    placeholder="Ex: Eletrônicos, Roupas, etc."
                    required
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Preço (R$)"
                    name="preco"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={formData.preco}
                    onChange={handleInputChange}
                    placeholder="0,00"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Quantidade em Estoque"
                    name="estoque"
                    type="number"
                    value={formData.estoque}
                    onChange={handleInputChange}
                    placeholder="0"
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']} >
                      <DatePicker
                        
                        label="Data de validade"
                        sx={{
                          pt: 0,
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'green',
                            },
                            '&:hover fieldset': {
                              borderColor: 'green',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'green',
                            },
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <TextField
                  margin='dense'
                    fullWidth
                    label="Descrição"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    placeholder="Descreva as características do produto"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button type="submit" variant="contained" size="large" startIcon={<Save />} sx={{ flex: 1 }}>
                  Cadastrar Produto
                </Button>
                <Button type="button" variant="outlined" size="large" >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

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
    </Container>
  )
}


import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// api

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
import dayjs, { Dayjs } from "dayjs"
import utc from 'dayjs/plugin/utc';




import 'dayjs/locale/pt-br';

export default function Cadastro() {
  dayjs.extend(utc);
  const cadastrarProduto = async (product: { name_pro: string, value_pro: number, date_pro: string }) => {
    return axios.post('http://localhost:8080/cadastro-pdo/controller/ProductController.php', product);
  };

  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
  const [formData, setFormData] = useState({  
    nome: "",
    preco: "",
    validade: null as Dayjs | null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      validade: date,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await cadastrarProduto({
        name_pro: formData.nome,
        value_pro: Number(formData.preco),
        date_pro: formData.validade ? dayjs.utc(formData.validade).format("YYYY-MM-DD") : ""
      });
      console.log(response)
      if (response.data.message === 'Product created successfully') {
        setSnackbar({
          open: true,
          message: `O produto "${formData.nome}" foi cadastrado com sucesso.`,
          severity: "success",
        });
        setFormData({
          nome: "",
          validade: null,
          preco: "",

        });
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Erro ao cadastrar produto.",
        severity: "error",
      });
    }
  };



  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction={'column'} sx={{ display: 'flex', mb: 2, gap: 5 }}>
          <Button variant="outlined" startIcon={<ArrowBack />} sx={{ width: {xs: '100%', sm: '50%', md: '20%'} }} onClick={() => navigate('/')}>
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
                <Grid size={{ xs: 12, md: 12 }}>
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
                    margin='dense'
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
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <DemoContainer components={['DatePicker']} >
                      <DatePicker

                        value={formData.validade ?? null}
                        onChange={(date) => handleDateChange(dayjs(date))}
                        format="DD/MM/YYYY" // aqui força o formato brasileiro
                        label="Data de validade"
                        sx={{
                          width: '100%',
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

              </Grid>

              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button type="submit" variant="contained" size="large" startIcon={<Save />} sx={{ flex: 1 }}>
                  Cadastrar Produto
                </Button>
                <Button type="button" variant="outlined" size="large" onClick={() => navigate('/')} >
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

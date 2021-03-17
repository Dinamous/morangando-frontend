import React, { useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Input, Button, Label,Select } from "@windmill/react-ui";
import API from "../../api";
import { useHistory, useLocation } from "react-router";
import authHeader from "../../services/auth.header";

function Forms() {
  const location = useLocation();
  let dado;
  if (location.state) {
    dado = location.state.produto;
  } else {
    dado = false;
  }

  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const history = useHistory();

  const [quantidadeProduto, setquantidadeProduto] = useState(0)
  const [idFornecedor, setidFornecedor] = useState()
  const [nomeFornecedor, setnomeFornecedor] = useState('')
  const [idProduto, setidProduto] = useState()
  const [nomeProduto, setnomeProduto] = useState('')
  const [tipoProduto, settipoProduto] = useState('')


  API.get("produtos").then(function (response) {
    setProdutos(response.data.response.produtos);
  });

  API.get("fornecedores").then(function (response) {
    setFornecedores(response.data.response.fornecedores);
  });


  function CadastrarEntrada() {
    API.post("entradas", {
      quantidadeProduto,
      fornecedor:{
        idFornecedor: idFornecedor,
        nome: nomeFornecedor
      },
      produto:{
        idProduto: idProduto,
        nome: nomeProduto,
        tipo: tipoProduto
      },
     
    })
      .then(function (response) {
        handleButtonVoltar();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function AtualizaProduto() {
     
    API.post(`entradas/${dado.idProduto}`, {
      quantidadeProduto,
      fornecedor:{
        idFornecedor: idFornecedor,
        nome: nomeFornecedor
      },
      produto:{
        idProduto: idProduto,
        nome: nomeProduto,
        tipo: tipoProduto
      },
     
    })
      .then(function (response) {
        handleButtonVoltar();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleButtonVoltar() {
    history.push("entradas");
  }

  return (
    <>
      <PageTitle>{dado ? "Editar Entrada" : "Adiconar Entrada"}</PageTitle>

      <SectionTitle>Preencha os campos</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <Label className="mt-4">
          <span>Produto</span>
          <Select className="mt-1">
            {produtos.map((linha,i)=>(
                <option key={i}>{linha.nome}{linha.tipo}</option>
            ))
            }
          </Select>
        </Label>
        <Label className="mt-4">
          <span>Quantidade</span>
          <Input
            value={quantidadeProduto}
            className="mt-1"
            placeholder="Ex: 200"
            onChange={(e) => setquantidadeProduto(e.target.value)}
          />
        </Label>
        <Label className="mt-4">
          <span>Fornecedor</span>
          <Select className="mt-1">
            {fornecedores.map((linha,i)=>(
                <option key={i}>{linha.nome}</option>
            ))
            }
          </Select>
        </Label>
        
      </div>
      <div className="flex items-center justify-between">
        <Button layout="outline" size="larger" onClick={handleButtonVoltar}>
          Voltar
        </Button>
        {dado ? (
          <Button size="larger" onClick={AtualizaProduto}>
            Salvar Alterações
          </Button>
        ) : (
          <Button size="larger" onClick={CadastrarEntrada}>
            Cadastrar Produto
          </Button>
        )}
      </div>
    </>
  );
}

export default Forms;

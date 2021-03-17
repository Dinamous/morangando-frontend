import React, { useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Input, Button, Label } from "@windmill/react-ui";
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

  const [nome, setNome] = useState(dado ? dado.nome : "");
  const [tipo, setTipo] = useState(dado ? dado.tipo : "");
  const [quantidade, setQuantidade] = useState(
    dado ? dado.quantidadeEstoque : 0
  );
  const history = useHistory();

  function CadastrarProduto() {
    API.post("produtos", {
      nome,
      tipo,
      qtdEstoque: quantidade,
    })
      .then(function (response) {
        handleButtonVoltar();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function AtualizaProduto() {
    console.log(nome, tipo, quantidade);
    API.post(`produtos/${dado.idProduto}`, {
      nome,
      tipo,
      quantidadeEstoque: quantidade,
    }).catch(function (error) {
      console.log(error);
    });
  }

  function handleButtonVoltar() {
    history.push("produtos");
  }

  return (
    <>
      <PageTitle>{dado ? "Editar Produto" : "Adiconar Produto"}</PageTitle>

      <SectionTitle>Preencha os campos</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Nome do Produto</span>
          <Input
            className="mt-1"
            placeholder="Morango"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Label>

        <Label className="mt-4">
          <span>Tipo do Produto</span>
          <Input
            value={tipo}
            className="mt-1"
            placeholder="Tipo 1"
            onChange={(e) => setTipo(e.target.value)}
          />
        </Label>
        <Label className="mt-4">
          <span>Quantidade em estoque</span>
          <Input
            value={quantidade}
            className="mt-1"
            placeholder="Ex: 200"
            onChange={(e) => setQuantidade(e.target.value)}
          />
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
          <Button size="larger" onClick={CadastrarProduto}>
            Cadastrar Produto
          </Button>
        )}
      </div>
    </>
  );
}

export default Forms;

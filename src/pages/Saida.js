import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../icons";

import response from "../utils/demo/tableData";
import API from "../api";

function Tables() {
  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState([]);
  const history = useHistory();
  // pagination setup
  const resultsPerPage = 10;
  const [totalResults, setTotalResults] = useState(1);
  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable(p);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProduto, setIdProduto] = useState("");
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function deletarProduto() {}

  // on page change, load new sliced data
  // here you would make another server request for new data
  // useEffect(() => {
  //   setDataTable(
  //     response2.slice(
  //       (pageTable2 - 1) * resultsPerPage,
  //       pageTable2 * resultsPerPage
  //     )
  //   );
  // }, [pageTable2]);

  useEffect(() => {
    API.get("saidas").then(function (response) {
      // handle success
      setDataTable(response.data.response.saidas);
      setTotalResults(response.data.response.quantidade);
    });
  }, []);

  function NovoProduto() {
    history.push("formSaida");
  }

  return (
    <>
      <PageTitle>Saída de Produtos</PageTitle>

      <div className="flex items-center flex-row-reverse">
        <Button
          size="large"
          onClick={NovoProduto}
          renderAs={Link}
          to="/app/formSaida"
        >
          Adicionar Nova Saída
        </Button>
      </div>

      <SectionTitle>Saídas cadastradas</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Data</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Produto Tipo</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Corte</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>valor</TableCell>
              <TableCell>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((linha, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="font-semibold">{linha.dataSaida}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{linha.produto.nome}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{linha.produto.tipo}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{linha.qtdProduto}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{linha.qtdCorte}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{linha.cliente.nome}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{linha.valorSaida}</span>
                </TableCell>
                

                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="icon"
                      onClick={() => {
                        setIdProduto(linha.idProduto);
                        openModal();
                      }}
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Deletar Produto id {idProduto}</ModalHeader>
        <ModalBody>
          Deseja realmente deletar este produto? Todas as compras e vendas
          associadas a ele será também apagada.
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancelar
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={deletarProduto}>Deletar Produto</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Tables;

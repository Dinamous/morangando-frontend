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
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../icons";

import response from "../utils/demo/tableData";
import API from "../api";

function Tables() {
  // setup pages control for every table
  const [pageTable2, setPageTable2] = useState(1);

  // setup data for every table
  const [dataTable, setDataTable] = useState([]);
  const history = useHistory();
  // pagination setup
  const resultsPerPage = 10;
  const [totalResults, setTotalResults] = useState(1);
  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  // useEffect(() => {
  //   setDataTable2(
  //     response2.slice(
  //       (pageTable2 - 1) * resultsPerPage,
  //       pageTable2 * resultsPerPage
  //     )
  //   );
  // }, [pageTable2]);

  API.get("produtos").then(function (response) {
    // handle success
    console.log(response.data.response);
    setDataTable(response.data.response.produtos);
    setTotalResults(response.data.response.quantidade);
  });

  useEffect(() => {}, []);

  function NovoProduto() {
    history.push("formProdutos");
  }

  return (
    <>
      <PageTitle>Produtos</PageTitle>

      <div className="flex items-center flex-row-reverse">
        <Button
          size="large"
          onClick={NovoProduto}
          renderAs={Link}
          to="/app/formProdutos"
        >
          Adicionar Produto
        </Button>
      </div>

      <SectionTitle>Produtos cadastrados</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Ações</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((linha, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="font-semibold">{linha.nome}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{linha.tipo}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{linha.quantidadeEstoque}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
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
    </>
  );
}

export default Tables;

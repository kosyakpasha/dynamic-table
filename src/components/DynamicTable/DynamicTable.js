import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {DynamicTableHeader, DynamicTableRow} from "./index";
import {fakeRequest} from "./utils/api";
import DynamicTableBody from "./DynamicTableBody";
import TableModal from "../Modal/TableModal";
import createId from "./utils/createId";

const TableStyled = styled.table`
  margin: 50px auto;
`;

const Loader = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border: 5px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const DynamicTable = () => {
    const [rowsData, setRowsData] = useState(null);
    const [isLoaderShown, setIsLoaderShown] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);

    const fetchData = async () => {
        const data = await fakeRequest();
        setRowsData(data)
        setIsLoaderShown(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const columnsNumber = rowsData?.data[0].value.length;
    const emptyRowContent = Array(columnsNumber).fill('');

    const [rowsModalData, setRowsModalData] = useState({
        data: [{
            id: createId(),
            value: emptyRowContent,
        }]
    });

    useEffect(() => {
        setRowsModalData({
            data: [{
                id: createId(),
                value: emptyRowContent,
            }]
        });
    },[columnsNumber])

   const tableHeaders = rowsData?.headers.value;

    const addModalEmptyRows = () => {
        const newRow = [{
            id: createId(),
            value: emptyRowContent
        }];

        setRowsModalData({
            ...rowsModalData,
            data: [...rowsModalData.data, ...newRow]
        });
    }

    const saveModal = () => {
        setRowsData({
            headers: rowsData.headers,
            data: [...rowsData.data, ...rowsModalData.data]
        })
        setIsModalOpen(false);
        setRowsModalData({
            data: [{
                id: createId(),
                value: emptyRowContent,
            }]
        });
    }

    const deleteRows = (index, data) => {
        if (data.length > 1) {
            data.splice(index, 1);
            setRowsData({...rowsData, ...data});
        }
    }

    const handleTableChange = (indexRow, indexColumn, e) => {
        const {value} = e.target;
        rowsData.data[indexRow].value[indexColumn] = value;
        setRowsData({...rowsData, data: rowsData.data});
    }

    const handleModalChange = (indexRow, indexColumn, e) => {
        const {value} = e.target;
        rowsModalData.data[indexRow].value[indexColumn] = value;
        setRowsModalData({...rowsModalData, data: rowsModalData.data});

        rowsModalData.data.forEach(elem => {
            if (elem.value.some(elem => elem.length === 0)) {
                setIsSaveBtnDisabled(true)
            } else {
                setIsSaveBtnDisabled(false)
            }
        })
    }

    return <>
        {isLoaderShown && <Loader/>}
        {isModalOpen && <TableModal
                            setIsModalOpen={setIsModalOpen}
                            tableHeaders={tableHeaders}
                            addModalEmptyRows={addModalEmptyRows}
                            handleTableChange={handleModalChange}
                            rowsModalData={rowsModalData}
                            deleteRows={deleteRows}
                            saveModal={saveModal}
                            isSaveBtnDisabled={isSaveBtnDisabled}
                            setIsSaveBtnDisabled={setIsSaveBtnDisabled}/>}
        {!isLoaderShown && <TableStyled>
            <DynamicTableHeader
                tableHeaders={tableHeaders}
                addBtnHandler={() => setIsModalOpen(true)}/>
            <DynamicTableBody>
                <DynamicTableRow
                    rowsData={rowsData?.data}
                    deleteRows={deleteRows}
                    handleTableChange={handleTableChange}/>
            </DynamicTableBody>
        </TableStyled>}
    </>
}

export default DynamicTable;
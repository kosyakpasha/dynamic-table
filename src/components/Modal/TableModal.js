import styled from "styled-components";
import DynamicTableHeader from "../DynamicTable/DynamicTableHeader";
import DynamicTableBody from "../DynamicTable/DynamicTableBody";
import {DynamicTableRow} from "../DynamicTable";
import React from "react";

const ModalWrapperStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalStyled = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  width: 50%;
  padding: 20px;
  background: #fff;
`;

const CloseButtonStyled = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const SaveButtonStyled = styled.button`
  display: block;
  margin: 20px auto 0;
`;

const TableModal = ({
        setIsModalOpen,
        tableHeaders,
        addModalEmptyRows,
        rowsModalData,
        deleteRows,
        handleTableChange,
        saveModal,
        isSaveBtnDisabled,
        setIsSaveBtnDisabled
    }) => {
    return (<ModalWrapperStyled>
        <ModalStyled>
            <form>
                <CloseButtonStyled onClick={() => setIsModalOpen(false)}>x</CloseButtonStyled>
                <table>
                    <DynamicTableHeader tableHeaders={tableHeaders} addBtnHandler={() => {
                        addModalEmptyRows();
                        setIsSaveBtnDisabled(true);
                    }}/>
                    <DynamicTableBody>
                        <DynamicTableRow
                            rowsData={rowsModalData.data}
                            deleteRows={deleteRows}
                            handleTableChange={handleTableChange}/>
                    </DynamicTableBody>
                </table>
                <SaveButtonStyled disabled={isSaveBtnDisabled} type="button" onClick={saveModal}>Save
                    changes</SaveButtonStyled>
            </form>
        </ModalStyled>
    </ModalWrapperStyled>)
}

export default TableModal;
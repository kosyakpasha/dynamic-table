import React from "react";
import styled from "styled-components";

const Input = styled.input`
  border: 1px solid black;
  
  &:invalid {
    border-color: red;
  }
`;

function DynamicTableRow({rowsData, deleteRows, handleTableChange}) {
    const renderRows = (data, indexRow) => {
        return Object.keys(data).map((key, indexColumn) => {
            return (
                <td key={key}>
                    <Input type="text" value={data[key]} onChange={e => handleTableChange(indexRow, indexColumn, e)}
                           name={key} required/>
                </td>
            )
        })
    }

    return (
        rowsData?.map((data, index) => {
            const { id, value } = data;

            return (
                <tr key={id}>
                    {renderRows(value, index)}
                    <td>
                        <button type="button" onClick={() => deleteRows(index, rowsData)}>x</button>
                    </td>
                </tr>
            )
        })
    )
}

export default DynamicTableRow;
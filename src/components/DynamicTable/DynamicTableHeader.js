const DynamicTableHeader = ({tableHeaders, addBtnHandler}) => {
    return (<thead>
    <tr>
        {tableHeaders?.map((tableHeader, index) => <th key={index}>{tableHeader}</th>)}
        <th>
            <button type="button" onClick={addBtnHandler}>+</button>
        </th>
    </tr>
    </thead>)
};

export default DynamicTableHeader;
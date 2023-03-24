import React from "react";

const DynamicTableBody = (props) => {
    return <tbody>
        {props.children}
    </tbody>
}

export default DynamicTableBody;
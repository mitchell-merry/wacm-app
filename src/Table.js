import React, { cloneElement } from "react";
import './Table.scss';

function Table() {
    const tableContents = {
        header: ["", "Unit Name", "ID"],
        body: [
            ["", "Mitchell mery", "19520"]
        ]
    }
    return <div className={"table"}><table>
        {
            tableContents.header.map(head => {
                return <th>{head}</th>
            })
        }
        {
            tableContents.body.map(row => {
                return <tr>{row.map(cell => {
                    return <td>{cell}</td>
                })}</tr>
            })   
        }
    </table></div>;
}

export default Table;
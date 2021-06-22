import React from 'react'
import numeral from "numeral";
import './Table.css'
function Table({countries}) {
    let i = 1;
    return (
        <div className="table">
            {countries.slice(0,10).map(({country,cases}) => (
                <tr>
                    <td>{i++}</td>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format()}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default Table

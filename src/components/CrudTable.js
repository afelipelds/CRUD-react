import React from 'react'
import CrudTableRow from './CrudTableRow'

const CrudTable = ({ data, setDataToEdit, deleteDataRegister }) => {
  return (
    <div>
      <h3>Tada Table</h3>
      <table className="App">
        <thead>
          <tr>
            <th>Name</th>
            <th>Constellation</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length === 0 
              ? <tr>
                <td>No Data</td>
              </tr>
              : (
                data.map( element => 
                  <CrudTableRow 
                    key={element.id} 
                    element={element}
                    setDataToEdit={setDataToEdit}
                    deleteDataRegister={deleteDataRegister}
                  /> 
                )
              )
          }
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable

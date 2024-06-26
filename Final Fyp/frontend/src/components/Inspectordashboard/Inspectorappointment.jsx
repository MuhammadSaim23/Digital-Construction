import React from 'react'
import './Inspectorappointments.css';

const Inspectorappointment = () => {
    return (
        
        <div className="order-table1"> 
         <h1>APPOINTMENTS</h1> <br />
         <table >
           
            <tr>
            <th>No</th>
            <th>Name</th>
            <th>Appoint Purpose</th>
            <th>Time duration</th>
            <th>Contact Number </th>
            <th>Button</th>
            </tr>

            <tr>
                <td>1</td>
                <td>Saim</td>
                <td>Build House </td>
                <td>250 days</td>
                <td>03226973676 </td>
                <td> <input type="submit" name="submit" value="Approve" className="submitbutton"/> </td>
            </tr>
         </table>


        </div>
    )
       
}
export default Inspectorappointment
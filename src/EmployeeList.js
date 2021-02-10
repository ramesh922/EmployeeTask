import React, { useState } from 'react';

const data = {
    "data": [
        {
            "id": 1,
            "name": "John",
            "emailId": "john@companyname.com",
            "aadharNumber": "3653782476",
            "panNumber": "R05HKI2BHY",
            "employeeType": "Full-Time",
            "joiningDate": "18-02-2019"
        },
        {
            "id": 2,
            "name": "Gulnar",
            "emailId": "gulnar@companyname.com",
            "aadharNumber": "5864636979",
            "panNumber": "JU3XUBVXFI",
            "employeeType": "Part-Time",
            "joiningDate": "09-04-2019"
        },
        {
            "id": 3,
            "name": "Maxene",
            "emailId": "maxene@companyname.com",
            "aadharNumber": "4439662981",
            "panNumber": "ZSIW4XGXWX",
            "employeeType": "Part-Time",
            "joiningDate": "04-06-2019"
        },
        {
            "id": 4,
            "name": "Joanna",
            "emailId": "joanna@companyname.com",
            "aadharNumber": "8992106113",
            "panNumber": "TRQ5GOSEKQ",
            "employeeType": "Full-Time",
            "joiningDate": "10-11-2019"
        }
    ]
}

const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const panFormat = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;

function EmployeeList() {

    const [employeeData, setEmployeeData] = useState([...data['data']]);
    const [editEmp, setEditEmp] = useState(false);
    const [editEmpData, setEditEmpData] = useState({});
    const handleEditEmp = (emp, index) => {
        console.log(emp, index);
        setEditEmp(true);
        const empData = { ...emp };
        empData.joiningDate = empData.joiningDate.split("-").reverse().join("-");
        setEditEmpData(empData);
    }

    const handleCloseModal = () => {
        setEditEmp(false);
        setEditEmpData({});
    }
    const handleSubmitEmpData = (data) => {
        const dataObj = { ...data };
        dataObj.joiningDate = dataObj.joiningDate.split("-").reverse().join("-");
        const newData = employeeData.map(item => {
            if (item.id === dataObj.id) return dataObj;
            else return item;
        })
        setEmployeeData(newData);
        setEditEmp(false);
        setEditEmpData({});
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        const newEditEmpData = { ...editEmpData };
        switch (e.target.id) {
            case 'name':
                newEditEmpData.name = e.target.value;
                break;
            case 'email':
                newEditEmpData.emailId = e.target.value;
                break;
            case 'pan':
                newEditEmpData.panNumber = e.target.value;
                break;
            case 'aadhar':
                newEditEmpData.aadharNumber = e.target.value;
                break;
            case 'Full-Time':
                newEditEmpData.employeeType = 'Full-Time';
                break;
            case 'Part-Time':
                newEditEmpData.employeeType = 'Part-Time';
                break;
            case 'joiningDate':
                newEditEmpData.joiningDate = e.target.value;
                break;
        }
        setEditEmpData(newEditEmpData);
    }

    return (
        <div className="App">
            <h3>List of Employees</h3>
            <table>
            <tr class="tableheader">
                <th>Name</th>
                <th>Email</th>
                <th>Aadhar</th>
                <th>PAN</th>
                <th>Emp Type</th>
                <th>Joining Date</th>
                <th></th>
            </tr>
            {
                employeeData.map((item, index) => {
                    return (
                        <tr>
                            <th>{item.name}</th>
                            <th>{item.emailId}</th>
                            <th>{item.aadharNumber}</th>
                            <th>{item.panNumber}</th>
                            <th>{item.employeeType}</th>
                            <th>{item.joiningDate}</th>
                            <th><button class="button" data-toggle="modal" data-target={editEmp ? '#myModal' : ''} onClick={() => handleEditEmp(item, index)}>Edit</button></th>
                        </tr>
                    )
                })
            }
            </table>
            {
                editEmp && <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" onClick={() => handleCloseModal()}>&times;</button>
                                <h4 class="modal-title">Edit Employee</h4>
                            </div>
                            <div class="modal-body">

                                <label for="name">Name:</label>
                                <input className="input-width" type="text" id="name" name="name" value={editEmpData.name} onChange={(e) => handleChange(e)} /><br />
                                {!editEmpData.name.length && <span style={{ color: 'red' }}>name cannot be empty</span>}
                                <br />
                                <label for="email">Email:</label>
                                <input className="input-width" type="email" id="email" name="email" value={editEmpData.emailId} onChange={(e) => handleChange(e)} /><br />
                                {(!editEmpData.emailId.length || !mailformat.test(editEmpData.emailId)) && <span style={{ color: 'red' }}>email should be valid and cannot be empty</span>}
                                <br />
                                <label for="aadhar">Aadhar:</label>
                                <input className="input-width" type="text" id="aadhar" name="aadhar" value={editEmpData.aadharNumber} onChange={(e) => handleChange(e)} /><br />
                                {(!editEmpData.aadharNumber.length || editEmpData.aadharNumber.length > 10 || editEmpData.aadharNumber.length < 10 || isNaN(editEmpData.aadharNumber)) && <span style={{ color: 'red' }}>aadhar should be numeric with 10 digits</span>}
                                <br />
                                <label for="pan">PAN:</label>
                                <input className="input-width" type="text" id="pan" name="pan" value={editEmpData.panNumber} onChange={(e) => handleChange(e)} /><br />
                                {(!editEmpData.panNumber.length || !panFormat.test(editEmpData.panNumber) || editEmpData.panNumber.length > 10 || editEmpData.panNumber.length < 10) && <span style={{ color: 'red' }}>pan should be alpha numeric with 10 chars</span>}
                                <br />
                                <div style={{ paddingLeft: '6%', textAlign: 'left' }}>
                                    <p>select employee type:</p>
                                    <input type="radio" id="Full-Time" name="Full-Time" value="Full-Time" onClick={(e) => handleChange(e)} checked={editEmpData.employeeType === 'Full-Time'} />
                                    <label for="Full-Time">Full-Time</label><br></br>
                                    <input type="radio" id="Part-Time" name="Part-Time" value="Part-Time" onClick={(e) => handleChange(e)} checked={editEmpData.employeeType === 'Part-Time'} />
                                    <label for="Part-Time">Part-Time</label><br></br>
                                </div>
                                <br />
                                <div style={{ paddingLeft: '6%', textAlign: 'left' }}>
                                <label for="date">Joining Date:</label>
                                <input type="date" id="joiningDate" name="joiningDate" onChange={(e) => handleChange(e)} value={editEmpData.joiningDate} />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button disabled={!editEmpData.name.length || (!editEmpData.emailId.length || !mailformat.test(editEmpData.emailId)) || (!editEmpData.aadharNumber.length || isNaN(editEmpData.aadharNumber) || editEmpData.aadharNumber.length > 10 || editEmpData.aadharNumber.length < 10) || (!editEmpData.panNumber.length || !panFormat.test(editEmpData.panNumber) || editEmpData.panNumber.length > 10 || editEmpData.panNumber.length < 10)} data-dismiss="modal" class="btn btn-primary" onClick={(e) => handleSubmitEmpData(editEmpData)}>Submit</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal" onClick={() => handleCloseModal()}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default EmployeeList;
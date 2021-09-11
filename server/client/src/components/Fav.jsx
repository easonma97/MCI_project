import React , {useEffect, useState} from "react";
import image from '../assets/img/user.jpg';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import axios from "axios";

const user_id = JSON.parse(sessionStorage.getItem('user_id'));

function onInsertRow(row) {
  let newRowStr = ''
 
  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n'
  }
  alert('You inserted:\n ' + newRowStr)
  const input = {
    sentence_storage: row['value'],
    sentence_class: row['name']
  }
  axios.post('http://localhost:8080/users/update/' + user_id, input)
  .then(res => console.log(res.data));
}
 
 
function onDeleteRow(rowKeys) {
  alert('You deleted: ' + rowKeys)
  const input = {
    index: rowKeys
  }
  axios.post('http://localhost:8080/users/delete/' + user_id, input)
  .then(res => console.log(res.data));
}


function Fav(){
  const [username, setUserName] = useState('')
  const [sentence, setSentence] = useState([]);
  const [_class, setClass] = useState([]);

  function getUserName(user_id){
    axios.get('http://localhost:8080/users/' + user_id)
      .then(res => {
        console.log(res.data);
        setUserName(res.data.username);
      })
    return username
    }

  useEffect(() => {
    axios.get('http://localhost:8080/users/' + user_id)
        .then(res => {
          console.log(res.data.sentence_storage);
          setSentence(res.data.sentence_storage);
          setClass(res.data.sentence_class)
        })
  }, []);
  
  function getData() {
    var data = []
    // var classname = _class
    for (var i = 0; i < sentence.length; ++i) {
      data[i] = {id: i, name: _class[i], value: sentence[i]}
    }
         
     return data
  }

  // To delete rows you be able to select rows
  const selectRowProp = {
    mode: 'checkbox'
  }


    const options = {
      page: 1,
      prePage:  <i class="icofont-rounded-left"></i>,
      nextPage: <i class="icofont-rounded-right"></i>,
      firstPage: <i class="icofont-double-left"></i>,
      lastPage: <i class="icofont-double-right"></i>,
      afterInsertRow: onInsertRow,
      afterDeleteRow: onDeleteRow
    }
  

    return <div className="suggestion1">
    <div className="container-suggestion1">
      <div className="dropdown col-lg-12 col-md-12">
        <button className="btn dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{WebkitAppearance: 'none'}}>
          <img src={image} className=" img-thumbnail rounded-circle" alt="" style={{width: '60px'}} />
        </button>
          <li><a className="dropdown-item">Hello {getUserName(user_id)}</a></li>
          <li><a className="dropdown-item" href='/'>Log Out</a></li>
          <li><a className="dropdown-item" href='/page'>Suggestion</a></li>
          <li><a className="dropdown-item" href='/fileupload'>Want to upload?</a></li>
      </div>
      <div className="container mt-2 mb-2" id="toolbar">
        <div id="toolbar">
          <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">New Sentence</h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label" />
                      <textarea className="form-control" id="message-text" defaultValue={""} />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="container mt-2 mb-2 pageTable" style={{textAlign: 'center'}}>

        <BootstrapTable data={getData()}
                        insertRow={true}
                        deleteRow={true}
                        selectRow={selectRowProp}
                          pagination={true}
                          options={options}
                          exportCSV
                          csvFileName='fav.csv'
        >
            <TableHeaderColumn isKey dataField='id'
            >
              ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField='name'
            >
              Classification
           </TableHeaderColumn>
            <TableHeaderColumn dataField='value'
          >
              Sentences
            </TableHeaderColumn>
        </BootstrapTable>
    </div>

    </div>
  </div>
}

export default Fav;
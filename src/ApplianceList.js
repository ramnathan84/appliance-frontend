import React, { Component,useState  } from 'react';
import {Alert, Button, ButtonGroup, Container, Table, Form, FormGroup, Input, Label,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { getAllAppliance } from './util/APIUtils';
import { searchAppliance } from './util/APIUtils';
import { deleteAppliance } from './util/APIUtils';


class ApplianceList extends Component {

  constructor(props) {
    super(props);
    this.state = {data: [], searchValue:'',filterDisplayValue:'Search Filter',filterValue:'',dropdownOpen: false,isLoading: true};
    //this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.clearSearch=this.clearSearch.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    this.loadData();
    
  }

  changeValue(event){
      console.log("Dropdown Value",event.currentTarget.getAttribute("dropdownvalue"));
      console.log("Dropdown Value",event.currentTarget.textContent);
      let value=event.currentTarget.getAttribute("dropdownvalue");
      //this.setState({newValue: event.currentTarget.textContent});
      this.setState({filterValue:value,filterDisplayValue:event.currentTarget.textContent});
      
  }

  async clearSearch(){
   
    const clearLoadData=await getAllAppliance();

    this.setState({
        data: clearLoadData
    });   
    

  }

  handleChange(event) {
      console.log(event);
    
    const target = event.target;
    const value = target.value;
    console.log("Event ",event.curentTarget);
    this.setState({searchValue:value});
    //console.log(this.state.searchValue);
}


async submitSearch(event) {
    
    console.log("inside search submit",this.state.filterValue);
    console.log("inside search submit",this.state.searchValue);
    var filteredVal=this.state.filterValue;
    var searchVal=this.state.searchValue;
    if( !filteredVal||!searchVal ) {
      alert("Choose Search filter and Search term");
    }
    var obj = '{'
    + '"' + filteredVal + '"'+':'+ '"' + searchVal +'"' +'}';

    console.log(obj);

    searchAppliance(obj)
    .then(response => {
        console.log("Search Success:: ",response);
        this.setState({
            data: response
        });     
    }).catch(error => {
        console.log("error:: ",error);
      alert(error.message);
    });
}

  loadData() {
    let promise;
    
    promise = getAllAppliance();

    if(!promise) {
        return;
    }

    this.setState({
        isLoading: true
    });

    promise            
    .then(response => {
        this.setState({
            data: response,
            isLoading: false
        });       
      console.log("Response:: ",this.state);
    }).catch(error => {
        alert(error);
        this.setState({
            isLoading: false
        })
    });  
    
}

toggle(event) {

    this.setState({
        dropdownOpen: !this.state.dropdownOpen
    });
}



  async remove(id) {
      try {
        const items= await deleteAppliance(id);
        let updatedData = [...this.state.data].filter(i => i.id !== id);
        this.setState({data: updatedData});
      } catch (error) {
        alert(error);
      }
    }



render() {
    const {data, isLoading} = this.state;
    
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const applianceList = data.map(item => {
     console.log("Inside:: "  + item);
      return <tr key={item.id}>
        <td style={{whiteSpace: 'nowrap'}}>{item.brand}</td>
        <td>{item.serialNumber}</td>
        <td>{item.model}</td>
        <td>{item.status}</td>
        <td>{new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(new Date(item.dateBought))}
        </td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/appliance/" + item.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(item.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });
   
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/appliance/new">Add New Appliance</Button>
          </div>
        
          <div className="row">
            <FormGroup>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                <DropdownToggle caret className=" toggle-dropdown" >{this.state.filterDisplayValue} </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.changeValue} dropDownValue="brand">Brand</DropdownItem>
                    <DropdownItem onClick={this.changeValue} dropDownValue="serialNumber">Serial Number</DropdownItem>
                    <DropdownItem onClick={this.changeValue} dropDownValue="model">Model</DropdownItem>
                    <DropdownItem onClick={this.changeValue} dropDownValue="dateBought">Date Bought</DropdownItem>
                    <DropdownItem onClick={this.changeValue} dropDownValue="status">Status</DropdownItem>
                </DropdownMenu>
             </Dropdown>
            </FormGroup>
            <FormGroup className="col-md-2">
                <Input type="text" name="searchValue" id="searchValue" placeholder="Search..."
                    onChange={this.handleChange} autoComplete="searchValue"/>
            </FormGroup >
            <FormGroup>
               <Button color="primary" onClick={this.submitSearch}>Search</Button>{' '}
               <Button color="primary" onClick={this.clearSearch}>Clear Search</Button>{' '}
            </FormGroup >
          </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Brand</th>
              <th width="20%">Serial Number</th>
              <th>Model</th>
              <th>Status</th>
              <th width="20%">Date Bought</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {applianceList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ApplianceList;
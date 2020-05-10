import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import DatePicker from  'reactstrap-date-picker';
import { insertNewAppliance } from './util/APIUtils';
import { updateAppliance } from './util/APIUtils';
import { getApplianceById } from './util/APIUtils';

class ApplianceEdit extends Component {

  emptyItem = {
    brand: '',
    serialNumber: '',
    model: '',
    status: '',
    dateBought: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      //const group = await (await fetch(`http://localhost:8080/api/getApplianceById/${this.props.match.params.id}`)).json();
     console.log(this.props.match.params.id);
      try {
        const items= await getApplianceById(this.props.match.params.id);
         this.setState({item: items});
      } catch (error) {
        alert(error);
      }

     
    }
  }

  handleChange(event) {
      console.log(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  handleDateChange(value, formattedValue) {
      console.log("Date ::", value);
      let item = {...this.state.item};
      console.log("item ::", item);
      item.dateBought=value;
    this.setState({
        item// ISO String, ex: "2016-11-19T12:00:00.000Z"
    })
  }

  

  async handleSubmit(event) {
    let url;
    let response;
    event.preventDefault();
    const {item} = this.state;
    console.log("Items are ::: " ,event);
    if (this.props.match.params.id == 'new') {
        console.log("Inside  add");
        try {
            url= await insertNewAppliance(item);
            this.props.history.push('/appliance');
          } catch (error) {
            alert(error.message);
          }
    }else{
        console.log("Inside  edit");
        try {
            url=await updateAppliance(item);   
            this.props.history.push('/appliance');     
          } catch (error) {
            alert(error.message);
          }  
    }    
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Appliance' : 'Add Appliance'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="brand">Brand</Label>
            <Input type="text" name="brand" id="brand" value={item.brand || ''}
                   onChange={this.handleChange} autoComplete="brand"/>
          </FormGroup>
          <FormGroup>
            <Label for="serialNumber">Serial Number</Label>
            <Input type="text" name="serialNumber" id="serialNumber" value={item.serialNumber || ''}
                   onChange={this.handleChange} autoComplete="serialNumber"/>
          </FormGroup>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input type="text" name="model" id="model" value={item.model || ''}
                   onChange={this.handleChange} autoComplete="model"/>
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input type="text" name="status" id="statusmodel" value={item.status || ''}
                   onChange={this.handleChange} autoComplete="status"/>
          </FormGroup>
          <FormGroup>
            <Label>Date Bought</Label>
            <DatePicker id = "dateBought" value={item.dateBought || ''} onChange= {(v,f) => this.handleDateChange(v, f)} />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/appliance">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ApplianceEdit);
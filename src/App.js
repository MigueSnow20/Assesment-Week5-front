import React, { Component } from 'react';
import './App.css';
import { BankService} from './service/BankService';
import { UserService} from './service/UserService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';


import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      user: {
        id: null,
        firstName: null,
        lastName: null,
        username: null,
        password : null,
        email : null,
        phone : null
      },
      selectedUser : {

      }
    };
    this.items = [
      {
        label : 'Nuevo',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Eliminar',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    this.bankService = new BankService();
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount(){
    this.userService.getAll().then(data => this.setState({users: data}))
  }

  create() {
    this.BankService.create(this.state.user).then(data => {
      this.setState({
        visible : false,
        user: {
          id: null,
          nombre: null,
          apellido: null,
          direccion: null,
          telefono : null
        }
      });
      this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.'});
      this.userService.getAll().then(data => this.setState({users: data}))
    })
  }

  delete() {
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.userService.delete(this.state.selecteduser.id).then(data => {
        this.growl.show({severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.'});
        this.userService.getAll().then(data => this.setState({users: data}));
      });
    }
  }

  render(){
    return (
      <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header="React CRUD App">
            <DataTable value={this.state.users} paginator={true} rows="4" selectionMode="single" selection={this.state.selecteduser} onSelectionChange={e => this.setState({selecteduser: e.value})}>
              <Column field="id" header="ID"></Column>
              <Column field="firstName" header="First Name"></Column>
              <Column field="lastName" header="First Name"></Column>

              <Column field="apellido" header="Apellido"></Column>
              <Column field="direccion" header="Direccion"></Column>
              <Column field="telefono" header="Teléfono"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear user" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
            <form id="user-form">
              <span className="p-float-label">
                <InputText value={this.state.user.nombre} style={{width : '100%'}} id="nombre" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let user = Object.assign({}, prevState.user);
                        user.nombre = val;

                        return { user };
                    })}
                  } />
                <label htmlFor="nombre">Nombre</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.user.apellido} style={{width : '100%'}} id="apellido" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let user = Object.assign({}, prevState.user);
                        user.apellido = val

                        return { user };
                    })}
                  } />
                <label htmlFor="apellido">Apellido</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.user.direccion} style={{width : '100%'}} id="direccion" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let user = Object.assign({}, prevState.user);
                        user.direccion = val

                        return { user };
                    })}
                  } />
                <label htmlFor="direccion">Dirección</label>
              </span>
              <br/>
              <span className="p-float-label">
                <InputText value={this.state.user.telefono} style={{width : '100%'}} id="telefono" onChange={(e) => {
                    let val = e.target.value;
                    this.setState(prevState => {
                        let user = Object.assign({}, prevState.user);
                        user.telefono = val

                        return { user };
                    })}
                  } />
                <label htmlFor="phone">phone</label>
              </span>
            </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      user: {
        id: null,
        firstName: null,
        lastName: null,
        username: null,
        password : null,
        email : null,
        phone : null
      }
    });
    document.getElementById('user-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible : true,
      user: {
        id: null,
        firstName: null,
        lastName: null,
        username: null,
        password : null,
        email : null,
        phone : null
      }
    })
  }
}

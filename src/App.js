import React, { Component } from 'react';
import Users from './components/Users';
import EditUser from './components/EditUser';
import AppStore from './components/AppStore';
import './styles/main.css';

class App extends Component {
    
    constructor(){
        super();
        this.state = {updating: false, users: AppStore.getAll(), userUpdating: AppStore.getUserUpdating()};
    }
    
    componentDidMount(){
        // Re-render components with new data if store emits change
        AppStore.on("change", () => {
            this.setState({
                updating: AppStore.checkUpdating(),
                users: AppStore.getAll(),
                userUpdating: AppStore.getUserUpdating()
            })
        })
    }

    getComponent() {
        // Return component based on editing or not editing state
        if (this.state.updating === false) {
            return <Users users={this.state.users} formEmpty={true}/>
        } else {
            return <EditUser userUpdating={this.state.userUpdating} formEmpty={false}/>
        }
    }
    
    getPageTitle() {
        // Set page title based on updating state
        if (this.state.updating === false) {
            return "Create User"
        } else {
            return "Update User"
        }
    }
    
    render() {

        const PageTitle = this.getPageTitle();
        
        const ComponentToRender = this.getComponent();
        
        return (
            <div id="main-container">
                <h1>{PageTitle}</h1>
                {ComponentToRender}
            </div>
        )
    }
}

export default App;

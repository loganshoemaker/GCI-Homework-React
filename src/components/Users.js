import React from 'react';
import * as AppActions from './AppActions';
import UserForm from './UserForm';
import User from './User';

class Users extends React.Component {

    constructor(props){
        super(props);
        this.state = {users: props.users, firstName: '', lastName: '', addressStreetFirst: '', addressStreetSecond: '', city: '', state: '', zip: ''};  
    }

    // Reset form after submission
    componentWillReceiveProps(nextProps){
            this.setState({firstName: '', lastName: '', addressStreetFirst: '', addressStreetSecond: '', city: '', state: '', zip: ''
        })
    }

    // Update state to reflect input values
    handleOnChange = (event) => {     
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    // Really basic form validation; need at least some data to create record
    checkFormData = () => {
        let formEmpty = true;
        for (const key in this.state) {
            if (key !== 'users') {
                if (this.state[key] !== '' && this.state[key] !== undefined) {
                    formEmpty = false;
                }
            }
        }
        return formEmpty;
    }
    
    // New user should have latest state values
    createUser = () => {
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            addressStreetFirst: this.state.addressStreetFirst,
            addressStreetSecond: this.state.addressStreetSecond,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip
        }  
        AppActions.createUser(newUser); 
    }
    
    // Get action buttons to show error or create button
    getActionButton = () => { 
        if (this.checkFormData() === true){
            return <div> 
                        <button disabled type="button" className="success">Create User</button><br />
                        <span className="error">Form must have at least one value</span>
                   </div>
        } else {
            return <button type="button" className="success" onClick={ () => this.createUser() }>Create User</button>
        }
    }

    // Prepare each user
    formatUserData() {
        return (
            this.state.users.map((item, i) => {
                return (
                    <User key={i} id={i} user={item} />
                )
            })
        )
    }    

    render() {
        const usersList = this.formatUserData();
        const actionButton = this.getActionButton();

        this.checkFormData();
        return (
            <div>
                <div> 
                    <h1>{this.state.pageTitle}</h1>
                    <UserForm handleOnChange={this.handleOnChange} 
                            formDataFirstName={this.state.firstName} 
                            formDataLastName={this.state.lastName} 
                            formDataAddressLine1={this.state.addressStreetFirst} 
                            formDataAddressLine2={this.state.addressStreetSecond} 
                            formDataCity={this.state.city} formDataState={this.state.state} 
                            formDataZip={this.state.zip} 
                            createUser={this.createUser}
                            actionButton={actionButton}/>
                </div>
                <div>
                    {usersList}
                </div>
            </div>
        )
    }
}

export default Users;

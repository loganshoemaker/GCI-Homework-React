import React from 'react';
import * as AppActions from './AppActions';
import UserForm from './UserForm';
class EditUser extends React.Component {

    constructor(props){
        super(props);
        this.state = {userUpdating: props.userUpdating, firstName: props.userUpdating.firstName, lastName: props.userUpdating.lastName, addressStreetFirst: props.userUpdating.addressStreetFirst, addressStreetSecond: props.userUpdating.addressStreetSecond, city: props.userUpdating.city, state: props.userUpdating.state, zip: props.userUpdating.zip, indexToUpdate: props.userUpdating.indexToUpdate}; 
    }
    
    handleOnChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value 
        })     
    }
    
    // Really basic form validation; need at least some data to create record
    checkFormData = () => {
        let formEmpty = true;
        for (const key in this.state) {
            if (key !== 'indexToUpdate' && key!== 'userUpdating') {
                if (this.state[key] !== '') {
                    formEmpty = false;
                }
            }
        }
        return formEmpty;
    }

    updateUser = () => {
        const updatedUserData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            addressStreetFirst: this.state.addressStreetFirst,
            addressStreetSecond: this.state.addressStreetSecond,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            indexToUpdate: this.state.indexToUpdate
        }
        AppActions.updateUser(updatedUserData);
    }
    
    // Get action buttons to show error or create button
    getActionButton = () => { 
        if (this.checkFormData() === true){
            return <div> 
                        <button disabled type="button" className="success">Update User</button><br />
                        <span className="error">Form must have at least one value</span>
                   </div>
        } else {
            return <button type="button" className="success" onClick={ () => this.updateUser() }>Update User</button>
        }
    }

    render() {
        
        const actionButton = this.getActionButton();
        
        return (
            <div>
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
        )

    }
}

export default EditUser;

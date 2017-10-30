import React from 'react';
import * as AppActions from './AppActions';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {firstName: props.user.firstName, lastName: props.user.lastName, addressStreetFirst: props.user.addressStreetFirst, addressStreetSecond: props.user.addressStreetSecond, city: props.user.city, state: props.user.state, zip: props.user.zip, key: props.id, needConfirmation: false}
    }    
    
    componentWillReceiveProps(nextProps){
        this.setState({
            firstName: nextProps.user.firstName,
            lastName: nextProps.user.lastName,
            addressStreetFirst: nextProps.user.addressStreetFirst,
            addressStreetSecond: nextProps.user.addressStreetSecond,
            city: nextProps.user.city,
            state: nextProps.user.state,
            zip: nextProps.user.zip,
            key: nextProps.id
        })
    }
    
    // Begin updating the user selected
    startUpdate = () => {
        AppActions.startUpdating(this.state.key);
    }
    
    // Toggle state used to show buttons
    toggleDelete = () => {
        if (this.state.needConfirmation === true) {
            this.setState({
                needConfirmation: false
            });
        } else {
            this.setState({
                needConfirmation: true
            });
        }
    }
    
    // Actually remove user
    deleteUser = () => {
        AppActions.deleteUser(this.state.key);
        this.toggleDelete();
    }    
    
    // Show buttons based on individual user state
    setDeleteButtons = () => {
        if (this.state.needConfirmation === true){
            return  <div>
                        <button className="danger" onClick={ () => this.deleteUser()}>Confirm</button>
                        <button className="neutral" onClick={ () => this.toggleDelete()}>Cancel</button>
                    </div>
            
        } else {
            return <div>
                        <button className="danger" onClick={ () => this.toggleDelete()}>Delete User</button>
                        <button className="neutral" onClick={ () => this.startUpdate()}>Update User</button>
                    </div>
        }
    }

    render() {
        const buttons = this.setDeleteButtons();
        return (
            <div className="user-item">
                <section id="name">
                    <div className="user-item-title">Name</div>
                    <div id="firstName" className="user-item-entry">{this.state.firstName}</div>
                    <div id="lastName" className="user-item-entry">{this.state.lastName}</div>
                </section>
                <section id="address">
                    <div className="user-item-title">Address</div>
                    <div id="addressFirst" className="user-item-entry">{this.state.addressStreetFirst}</div>                     
                    <div id="addressSecond" className="user-item-entry">{this.state.addressStreetSecond}</div>
                    <div id="city" className="user-item-entry">{this.state.city}</div>
                    <div id="state" className="user-item-entry">{this.state.state}</div>
                    <div id="zip" className="user-item-entry">{this.state.zip}</div>
                </section>
                <section id="actions">
                    {buttons}
                </section>
            </div>
        )
    }
}

export default User;
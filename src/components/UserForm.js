import React from 'react';

export default class UserForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {handleOnChange: props.handleOnChange, 
                      firstName: props.formDataFirstName, 
                      lastName: props.formDataLastName, 
                      addressStreetFirst: props.formDataAddressLine1, 
                      addressStreetSecond: props.formDataAddressLine2, 
                      city: props.formDataCity, 
                      state: props.formDataState, 
                      zip: props.formDataZip, 
                      createUser: props.createUser,
                      actionButton: props.actionButton}
    }
    
    // Reset form after submission
    componentWillReceiveProps(nextProps){
        this.setState({
          firstName: nextProps.formDataFirstName, 
          lastName: nextProps.formDataLastName, 
          addressStreetFirst: nextProps.formDataAddressLine1, 
          addressStreetSecond: nextProps.formDataAddressLine2, 
          city: nextProps.formDataCity, 
          state: nextProps.formDataState, 
          zip: nextProps.formDataZip,
          actionButton: nextProps.actionButton
        })
    }
  
    render() {
        return (
            <form name="UserForm">
                <fieldset>
                    <legend>User Name</legend>
                        <div className="form-item">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" value={this.state.firstName} onChange={this.state.handleOnChange} id="firstName" placeholder="First Name"/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" value={this.state.lastName} onChange={this.state.handleOnChange} id="lastName" placeholder="Last Name"/>  
                        </div>
                </fieldset>
                <fieldset>
                    <legend>User Address</legend>
                        <div className="form-item">
                            <label htmlFor="addressStreetFirst">Address Line 1</label>
                            <input type="text" value={this.state.addressStreetFirst} onChange={this.state.handleOnChange} id="addressStreetFirst" placeholder="Address Line 1"/>             
                        </div>
                        <div className="form-item">
                            <label htmlFor="addressStreetSecond">Address Line 2</label>
                            <input type="text" value={this.state.addressStreetSecond} onChange={this.state.handleOnChange} id="addressStreetSecond" placeholder="Address Line 2"/>            
                        </div>
                        <div className="form-item">
                            <label htmlFor="city">City</label>
                            <input type="text" value={this.state.city} onChange={this.state.handleOnChange} id="city" placeholder="City"/>            
                        </div>
                        <div className="form-item">
                            <label htmlFor="state">State</label>
                            <input type="text" value={this.state.state} onChange={this.state.handleOnChange} id="state" placeholder="State"/>            
                        </div>
                        <div className="form-item">
                            <label htmlFor="zip">Zip</label>
                            <input type="text" value={this.state.zip} onChange={this.state.handleOnChange} id="zip" placeholder="Zip"/>
                        </div>
                </fieldset>
                {this.state.actionButton}
            </form>
        )
    }
}
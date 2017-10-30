import { EventEmitter } from 'events';
import Dispatcher from './AppDispatcher';

class AppStore extends EventEmitter {

    constructor() {
        super();
        this.users = [];
        this.userUpdating = {};
        this.updating = false;
    }

    getAll() {
        return this.users;
    }
        
    checkUpdating() {
        return this.updating;
    }
    
    startUpdating(key) {
        // Get the user to update
        this.userUpdating = this.users[key];
        // Set the key as a field to access in components
        this.userUpdating.indexToUpdate = key;
        this.updating = true;
        this.emit("change");
    }
    
    getUserUpdating() {
        return this.userUpdating;
    }
    
    createUser(data) {
        // Assign new user received data
        let newUser = Object.assign({}, data);
        this.users.push(newUser);
        this.emit("change"); 
    }
    
    deleteUser(key) {
        this.users.splice(key, 1);
        this.emit("change");
    }

    updateUser(data) {
        
        // Get the user to update
        const userUpdating = this.users[data.indexToUpdate];
        // Check user updating values against new values and change if no match
        for (let currentKey in userUpdating){
            for (let newKey in data) {
                if (currentKey === newKey) {
                    if ( userUpdating[currentKey] !== data[newKey]) {
                        userUpdating[currentKey] = data[newKey]
                    }
                }
            }
        }
        
        this.updating = false;
        this.emit("change");
        
    }
    
    handleActions(action) {
        switch(action.type) {
            case "CREATE_USER": {
                this.createUser(action.data);
                break;
            }            
            case "UPDATE_USER": {
                this.updateUser(action.data);
                break;
            }    
            case "DELETE_USER": {
                this.deleteUser(action.key);
                break;
            }
            case "CHECK_UPDATING": {
                this.checkUpdating();
                break;
            }  
            case "START_UPDATING": {
                this.startUpdating(action.key);
                break;
            }     
                
            default: {
                break;
            }
        }
    }
}

const appStore = new AppStore();
Dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;

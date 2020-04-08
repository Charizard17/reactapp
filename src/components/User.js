import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserConsumer from "../context";
import axios from 'axios';
import {Link} from "react-router-dom";

class User extends Component {
    state = {
        isVisible : false
    }
    static defaultProps = {
        name : "Unknown",
        salary : "Unknown",
        department : "Unknown"
    }
    //constructor(props) {
    //    super(props);
    //    this.onClickEvent = this.onClickEvent.bind(this);
    //}

    onClickEvent = (e) => {
        
        this.setState({
            isVisible : !this.state.isVisible
        })
    }
    onDeleteUser = async (dispatch,e) => {
        const {id} = this.props;
        // Delete Request
        await axios.delete(`http://localhost:3007/users/${id}`);

        // Consumer Dispatch
        dispatch({type : "DELETE_USER",payload:id});
    }    
    render() {

        // Destructing
        const {id,name,department,salary} = this.props;
        const {isVisible} = this.state;
        return (
            <UserConsumer>
            {
                value => {
                    const {dispatch} = value; 

                    return (
                    <div>
                    <div className = "col-md-8 mb-4">
                    <div className = "card" style={isVisible ? {backgroundColor:"#ee2c2c",color:"white"} : null}>
                    <div className="card-header d-flex justify-content-between">
                    <h4 className = "d-inline" onClick = {this.onClickEvent.bind(this)}>{name}</h4>
                    <i onClick = {this.onDeleteUser.bind(this,dispatch)} className = "fas fa-trash-alt" style = {{cursor : "pointer"}}></i>
                    </div>
                    {
                        isVisible ? <div className = "card-body">
                        <p className = "card-text">Salary : {salary}</p>
                        <p className = "card-text">Department : {department}</p>
                        <Link to = {`edit/${id}`} className="btn btn-dark btn-block">Update User</Link>
                        </div> : null  
                    }
                    </div>
                    </div>
                    </div>
                    )
                }
            }
            </UserConsumer>)
        
    }
}   

User.propTypes = {
    name : PropTypes.string.isRequired,
    salary : PropTypes.string.isRequired,
    department : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired
}

export default User;
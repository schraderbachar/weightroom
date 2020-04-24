import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        super(props);

        //binds each this to the correct method.
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        //how to create variables in react
        this.state = {
            username: '',
            email: '',
            password: ''
        }

    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            //add email
            email: this.state.email,
            password: this.state.password,
        }

        console.log(user);
        //sends the user to the DB
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
            })

        this.setState({
            username: '',
            email: '',
            password: ''

        })


    }
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                        </input>
                        <label>Email: </label>
                        <input type="userInput"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}>
                        </input>
                        <label>Password: </label>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}>
                        </input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
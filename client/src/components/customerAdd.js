import React from 'react'
import { post } from 'axios';

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // file: null,
            uid: '',
            component: '',
            language: '',
            as_is: '',
            to_be: ''
            // fileName: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addCustomer()
        .then((response) => {
            console.log(response.data);
        })
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer(){
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('uid', this.state.uid)
        formData.append('component', this.state.component)
        formData.append('language', this.state.language)
        formData.append('as_is', this.state.as_is)
        formData.append('to_be', this.state.to_be)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addCustomer()
        .then((response) => {
            console.log(response.data);
        })
        this.setState({
            // file: null,
            uid: '',
            component: '',
            language: '',
            as_is: '',
            to_be: ''
            // fileName: ''
        })
        window.location.reload();    
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>Add Label</h1>
                {/* Profile Image: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/> */}
                UID: <input type="text" name="uid" value={this.state.uid} onChange={this.handleValueChange} /><br/>
                Component: <input type="text" name="component" value={this.state.component} onChange={this.handleValueChange} /><br/>
                Language: <input type="text" name="language" value={this.state.language} onChange={this.handleValueChange} /><br/>
                AS IS: <input type="text" name="as_is" value={this.state.as_is} onChange={this.handleValueChange} /><br/>
                TO BE: <input type="text" name="to_be" value={this.state.to_be} onChange={this.handleValueChange} /><br/>
                <button type="submit">Add</button>
            </form>
        )
    }
}

export default CustomerAdd
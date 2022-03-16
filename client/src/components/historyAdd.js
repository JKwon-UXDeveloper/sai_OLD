import React from 'react'
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }  
});

class HistoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            component: '',
            language: '',
            as_is: '',
            to_be: '',
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addHistory = this.addHistory.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addHistory()
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
        this.setState({
            uid: '',
            component: '',
            language: '',
            as_is: '',
            to_be: '',
            open: false
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

    addHistory(){
        const url = '/api/history';
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

    handleClickOpen() {
        this.setState({
            open: true
        });       
    }

    handleClose() {
        this.setState({
            uid: '',
            component: '',
            language: '',
            as_is: '',
            to_be: '',
            open: false
        })    
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addHistory()
        .then((response) => {
            console.log(response.data);
        })
        this.setState({
            uid: '',
            component: '',
            language: '',
            as_is: '',
            to_be: ''
        })   
        this.props.stateRefresh();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Change Label
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Change Label</DialogTitle>
                    <DialogContent>
                        {/* <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === ''? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label><br/> */}
                        <TextField label="UID" type="text" name="uid" value={this.state.uid} onChange={this.handleValueChange} /><br/>
                        <TextField label="Component" type="text" name="component" value={this.state.component} onChange={this.handleValueChange} /><br/>
                        <TextField label="Language" type="text" name="language" value={this.state.language} onChange={this.handleValueChange} /><br/>
                        <TextField label="AS IS" type="text" name="as_is" value={this.state.as_is} onChange={this.handleValueChange} /><br/>
                        <TextField label="TO BE" type="text" name="to_be" value={this.state.to_be} onChange={this.handleValueChange} /><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Change</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(HistoryAdd)
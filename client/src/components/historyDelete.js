import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

class HistoryDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }
    
    handleClickOpen() {
        this.setState({
            open: true
        });
    }
    
    handleClose() {
        this.setState({
            open: false
        })
    }
    
    deleteCustomer(id){
        const url = '/api/history/' + id;
        fetch(url, {
            method: 'DELETE'    
        });
        this.props.stateRefresh();    
    }
    
    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    Delete
                </Button>
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogTitle onClose={this.handleClose}>
                        Delete Warning!!!
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            The selected change history will be deleted.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>Delete</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }    
}
    
export default HistoryDelete;
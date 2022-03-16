import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import HistoryDelete from './historyDelete';

class History extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.uid}</TableCell>
                <TableCell>{this.props.component}</TableCell>
                <TableCell>{this.props.language}</TableCell>
                <TableCell>{this.props.as_is}</TableCell>
                <TableCell>{this.props.to_be}</TableCell>
                <TableCell><HistoryDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

class HistoryProfile extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.uid}({this.props.id})</h2>
            </div>
        )
    }
}
    
class HistoryInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.component}</p>
                <p>{this.props.language}</p>
                <p>{this.props.as_is}</p>
                <p>{this.props.to_be}</p>
            </div>
        )
    }
}

export default History;
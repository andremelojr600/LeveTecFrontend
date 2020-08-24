import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.mostrarAlgo = this.mostrarAlgo.bind(this);

        this.state = { pessoas: [] };
    }
    componentDidMount() {
        axios
            .get('http://localhost:3001/pessoas')
            .then((response) => {
                this.setState({ pessoas: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    tabRow() {
        return this.state.pessoas.map((object, i) => {
            return <TableRow obj={object} key={i} mostrar={this.mostrarAlgo} />;
        });
    }

    mostrarAlgo(val) {
        console.log(val);
    }

    render() {
        return (
            <div>
                <h3 align="center">Indexed Students</h3>
                <table
                    className="table table-striped"
                    style={{ marginTop: 20 }}
                >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Social Security Number</th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody>{this.tabRow()}</tbody>
                </table>
            </div>
        );
    }
}
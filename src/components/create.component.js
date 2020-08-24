import React, { Component } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../css/create.css';


export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
        this.onChangeCPF = this.onChangeCPF.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sumirMsg = this.sumirMsg.bind(this);

        this.state = {
            nome: '',
            nomeAntigo: '',
            telefone: '',
            CPF: '',
            cursos: [],
            aparecerMsgSucesso: false,
        };
    }
    componentDidMount() {
        axios
            .get('http://localhost:3001/cursos')
            .then((response) => {
                this.setState({ cursos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeNome(e) {
        this.setState({
            nome: e.target.value,
        });
    }
    onChangeTelefone(e) {
        this.setState({
            telefone: e.target.value,
        });
    }
    onChangeCPF(e) {
        this.setState({
            CPF: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        /*  this.setState({
            aparecerMsgSucesso: true,
        }); */

        const cursosArray = [];
        for (const i in this.state.cursos) {
            if (document.getElementById(this.state.cursos[i].nome).checked) {
                console.log(this.state.cursos[i].nome);
                console.log(this.state.cursos[i]._id);
                cursosArray.push(this.state.cursos[i]._id);
            }
        }

        const obj = {
            nome: this.state.nome,
            telefone: this.state.telefone,
            CPF: this.state.CPF,
            cursos: cursosArray,
        };
        axios
            .post('http://localhost:3001/pessoas', obj)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    nomeAntigo: this.state.nome,
                    nome: '',
                    telefone: '',
                    CPF: '',
                    aparecerMsgSucesso: true,
                });
            })
            .catch((err) => console.log(err));
    }

    sumirMsg() {
        this.setState({
            aparecerMsgSucesso: false,
        });
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add new person</h3>
                {this.state.aparecerMsgSucesso ? (
                    <div className="success-box">
                        <p className="success-text">
                             {this.state.nomeAntigo} was sucessfully added
                             to the system!
                        </p>
                        <div className="close" onClick={this.sumirMsg} />
                    </div>
                ) : null}
                <fieldset>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nome}
                            onChange={this.onChangeNome}
                            maxLength="60"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number: </label>
                        <InputMask
                            type="tel"
                            className="form-control"
                            value={this.state.telefone}
                            onChange={this.onChangeTelefone}
                            placeholder="(DDD)9XXXX-XXXX"
                            mask="(999)99999-9999"
                        />
                    </div>
                    <div className="form-group">
                        <label>Social Security Number: </label>
                        <InputMask
                            type="text"
                            className="form-control"
                            value={this.state.CPF}
                            onChange={this.onChangeCPF}
                            placeholder="XXX.XXX.XXX-XX"
                            mask="999.999.999-99"
                        />
                    </div>
                    <div className="form-group">
                        <label>Courses: </label>
                        <ul>
                            {this.state.cursos.map((curso) => {
                                return (
                                    <li key={curso.nome}>
                                        <input
                                            id={curso.nome}
                                            type="checkbox"
                                            value={curso.nome}
                                        />{' '}
                                        {curso.nome}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
                </fieldset>
            </div>
        );
    }
}
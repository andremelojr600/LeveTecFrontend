import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../src/css/App.css';
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <Link to={'/create'} className="navbar-brand">
                            Coursey
                        </Link>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/index'} className="nav-link">
                                        INDEX
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>{' '}
                    <br />
                     <br />
                    <Switch>
                        <Route exact path="/create" component={Create} />
                        <Route path="/edit/:id" component={Edit} />
                        <Route path="/index" component={Index} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
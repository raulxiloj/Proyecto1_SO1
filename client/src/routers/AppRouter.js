import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MonitorScreen } from '../components/monitor/MonitorScreen';
import { HomeScreen } from '../components/home/HomeScreen';
import { Navbar } from '../components/ui/Navbar';


export const AppRouter = () => {
    
    return(
        <Router>
            <Navbar/>
            <div>
                <Switch>
                    <Route exact path="/" component={HomeScreen}/>
                    <Route exact path="/monitor" component={MonitorScreen}/>
                </Switch>
            </div>
        </Router>
    )


}
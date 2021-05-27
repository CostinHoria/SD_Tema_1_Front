import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'
import MedicationContainer from "./medication/medication-container";
import CaregiverContainer from "./caregiver/caregiver-container";
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import DoctorMainPage from "./doctor/doctor-main-page";
import LoginPage from "./login/login-page";


class App extends React.Component {



    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <LoginPage/>}
                        />

                        <Route
                            exact
                            path='/person'
                            render={() => <PersonContainer/>}
                        />

                        <Route
                            exact
                            path='/caregiver'
                            render={() => <CaregiverContainer/>}
                        />

                        <Route
                            exact
                            path='/doctor'
                            render={()=><DoctorMainPage/>}
                         />
                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App

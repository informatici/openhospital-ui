import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import PatientsDatabase from "./components/patientsDatabase/PatientsDatabase";
import PatientActivityContainer from "./components/patientsDatabase/PatientActivityContainer";
import NewPatient from "./components/patientsDatabase/NewPatient";
import ColleaguesDatabase from "./components/colleaguesDatabase/ColleaguesDatabase";
import ColleagueDetails from "./components/colleaguesDatabase/ColleagueDetails/ColleagueDetails";
import Pharmacy from "./components/pharmacy/Pharmacy";
import Ward from "./components/ward/Ward";
import Billing from "./components/billing/Billing";
import News from "./components/news/News";
import NewsDetails from "./components/news/newsDetails/NewsDetails";
import setting from "./components/settings/Setting";
import Calendar from "./components/calendar/Calendario";
import Notification from "./components/Notifications/Notification";
import PageNotFound from "./components/pageNotFound/PageNotFound";

// constants
import { 
    PATH_PATIENTS_DATABASE,
    PATH_NEW_PATIENT,
    PATH_PATIENT_DETAILS,
    PATH_PATIENT_VISIT,
    PATH_PATIENT_ADMISSION,
    PATH_NEW_LAB_TEST,
    PATH_PATIENT_THERAPY,
    PATH_PATIENT_EXAMINATION,
    PATH_PATIENT_VACCINATION,
    PATH_PATIENT_NEW_VACCINATION,
    PATH_OPD,
    PATH_NEW_OPD,
} from "./helpers/constants";

const Routes = () => (
   <div>
        <Header />
        <Switch>  
            <Redirect from="/" exact={true} to="/dashboard" />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact={true} path={PATH_PATIENTS_DATABASE} component={PatientsDatabase} />
            <Route path={PATH_NEW_PATIENT} component={NewPatient} />
            <Route path={PATH_PATIENT_ADMISSION} component={PatientActivityContainer}/>
            <Route path={PATH_PATIENT_VISIT} component={PatientActivityContainer}/>
            <Route path={PATH_NEW_LAB_TEST} component={PatientActivityContainer}/>
            <Route path={PATH_PATIENT_THERAPY} component={PatientActivityContainer}/>
            <Route path={PATH_PATIENT_EXAMINATION} component={PatientActivityContainer}/>
            <Route path={PATH_PATIENT_NEW_VACCINATION} component={PatientActivityContainer}/>
            <Route path={PATH_PATIENT_VACCINATION} component={PatientActivityContainer}/>
            <Route path={PATH_NEW_OPD} component={PatientActivityContainer}/>
            <Route path={PATH_OPD} component={PatientActivityContainer}/>
            <Route path={PATH_PATIENT_DETAILS} component={PatientActivityContainer}/>
            <Route exact={true} path="/colleagues" component={ColleaguesDatabase} />
            <Route path="/colleagues/colleagueDetails" component={ColleagueDetails} />
            <Route path="/pharmacy" component={Pharmacy} />
            <Route path="/ward" component={Ward} />
            <Route path="/billing" component={Billing} />
            <Route path="/news" component={News} />
            <Route exact={true} path="/newsDetails" component={NewsDetails} />
            <Route exact={true} path="/setting" component={setting} />
            <Route exact={true} path="/Calendar" component={Calendar} />
            <Route exact={true} path="/Notification" component={Notification} />
            {/* If no Route matches, show PageNotFound component */}
            <Route component={PageNotFound} />
        </Switch>
        <Footer />
    </div>
);

export default Routes;



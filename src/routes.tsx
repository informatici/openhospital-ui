import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import PatientsDatabase from "./components/patientsDatabase/PatientsDatabase";
import PatientVisit from "./components/patientsDatabase/PatientVisit/PatientVisit";
import PatientDetails from "./components/patientsDatabase/PatientDetails";
import PatientActivityContainer from "./components/patientsDatabase/PatientActivityContainer";
import Admission from "./components/patientsDatabase/Admission";
import PatientLabTest from "./components/patientsDatabase/PatientLabTest/PatientLabTest";
import PatientTherapy from "./components/patientsDatabase/PatientTherapy/PatientTherapy";
import PatientExamination from "./components/patientsDatabase/PatientExamination/PatientExamination";
import PatientVaccine from "./components/patientsDatabase/PatientVaccine/PatientVaccine";
import Vaccine from "./components/patientsDatabase/Vaccine/Vaccine";
import PatientOpd from "./components/patientsDatabase/PatientOpd/PatientOpd";
import Opd from "./components/patientsDatabase/Opd/Opd";
import NewPatient from "./components/patientsDatabase/NewPatient/NewPatient";
import ColleaguesDatabase from "./components/colleaguesDatabase/ColleaguesDatabase";
import ColleagueDetails from "./components/colleaguesDatabase/ColleagueDetails/ColleagueDetails";
import Pharmacy from "./components/pharmacy/Pharmacy";
import Ward from "./components/ward/Ward";
import Billing from "./components/billing/Billing";
import News from "./components/news/News";
import NewsDetails from "./components/news/newsDetails/NewsDetails";
import setting from "./components/settings/Setting";
import Calendar from "./components/Calendar/Calendario";
import Notification from "./components/Notifications/Notification";
import PageNotFound from "./components/pageNotFound/PageNotFound";

const Routes = () => (
   <>
        
        <Header />
        <Switch>
            
            <Redirect from="/" exact={true} to="/dashboard" />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact={true} path="/PatientsDatabase" component={PatientsDatabase} />
            <Route path="/PatientsDatabase/NewPatient" component={NewPatient} />
            <Route path="/PatientDatabase/PatientVisit" component={PatientVisit}/>
            <Route path="/PatientDatabase/PatientDetails/:id" component={PatientActivityContainer}/>
            <Route path="/PatientDatabase/PatientAdmission" component={Admission}/>
            <Route path="/PatientDatabase/PatientLabTest" component={PatientLabTest}/>
            <Route path="/PatientDatabase/PatientTherapy" component={PatientTherapy}/>
            <Route path="/PatientDatabase/PatientExamination" component={PatientExamination}/>
            <Route path="/PatientDatabase/PatientVaccine" component={PatientVaccine}/>
            <Route path="/PatientDatabase/Vaccine" component={Vaccine}/>
            <Route path="/PatientDatabase/PatientOpd" component={PatientOpd}/>
            <Route path="/PatientDatabase/Opd" component={Opd}/>
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
       

    </>

    
   
    
);




export default Routes;



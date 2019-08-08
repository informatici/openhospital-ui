import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./modules/header/Header";
import Footer from "./modules/footer/Footer";
import Dashboard from "./modules/dashboard/Dashboard";
import PatientsDatabase from "./modules/patientsDatabase/PatientsDatabase";
import PatientVisit from "./modules/PatientsDatabase/PatientVisit/PatientVisit";
import PatientDetails from "./modules/PatientsDatabase/PatientDetails/PatientDetails";
import PatientAdmission from "./modules/PatientsDatabase/PatientAdmission/PatientAdmission";
import PatientLabTest from "./modules/PatientsDatabase/PatientLabTest/PatientLabTest";
import PatientTherapy from "./modules/PatientsDatabase/PatientTherapy/PatientTherapy";
import PatientExamination from "./modules/PatientsDatabase/PatientExamination/PatientExamination";
import PatientVaccine from "./modules/PatientsDatabase/PatientVaccine/PatientVaccine";
import Vaccine from "./modules/PatientsDatabase/Vaccine/Vaccine";
import PatientOpd from "./modules/PatientsDatabase/PatientOpd/PatientOpd";
import Opd from "./modules/PatientsDatabase/Opd/Opd";
import NewPatient from "./modules/PatientsDatabase/NewPatient/NewPatient";
import ColleaguesDatabase from "./modules/colleaguesDatabase/ColleaguesDatabase";
import ColleagueDetails from "./modules/colleaguesDatabase/ColleagueDetails/ColleagueDetails";
import Pharmacy from "./modules/pharmacy/Pharmacy";
import Ward from "./modules/ward/Ward";
import Billing from "./modules/billing/Billing";
import News from "./modules/news/News";
import NewsDetails from "./modules/news/newsDetails/NewsDetails";
import setting from "./modules/setting/Setting";
import Calendar from "./modules/Calendario/Calendario";
import Notification from "./modules/Notification/Notification";
import PageNotFound from "./modules/pageNotFound/PageNotFound";



const Routes = () => (
      
   <>
        
        <Header />
        <Switch>
            
            <Redirect from="/" exact={true} to="/dashboard" />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact={true} path="/PatientsDatabase" component={PatientsDatabase} />
            <Route path="/PatientsDatabase/NewPatient" component={NewPatient} />
            <Route path="/PatientDatabase/PatientVisit" component={PatientVisit}/>
            <Route path="/PatientDatabase/PatientDetails/:id" component={PatientDetails}/>
            <Route path="/PatientDatabase/PatientAdmission" component={PatientAdmission}/>
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



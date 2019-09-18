import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link as LinkRouter } from 'react-router-dom';

// local imports
import { MaterialLinkRouter } from '../utils/LinkHelper';

// material imports
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";

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
} from "../../config/constants"

const routes = {
    '/': 'Home',
    [PATH_PATIENTS_DATABASE]: 'Patients Database',
    [PATH_PATIENT_DETAILS]: 'Patient Details',
    [PATH_NEW_PATIENT]: 'New Patient',
    [PATH_PATIENT_VISIT]: 'Visit',
    [PATH_PATIENT_ADMISSION]: 'Admission',
    [PATH_NEW_LAB_TEST]: 'New Lab Test',
    [PATH_PATIENT_THERAPY]: 'Therapy',
    [PATH_PATIENT_EXAMINATION]: 'Examination',
    [PATH_PATIENT_VACCINATION]: 'Vaccination',
    [PATH_PATIENT_NEW_VACCINATION]: 'New Vaccination',
    [PATH_OPD]: 'OPD',
    [PATH_NEW_OPD]: 'New OPD',
};

const findRouteName = url => routes[url];

const getPaths = (pathname) => {
    const paths = ['/'];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev, curr, index) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });

    return paths;
};

const BreadcrumbsItem = ({ ...rest, match }) => {
    const routeName = findRouteName(match.url);
    if (routeName) {
        return (
            match.isExact ?
            (<Typography color="inherit">{routeName}</Typography>) 
            :
            (<MaterialLinkRouter 
                color="secondary" 
                component={LinkRouter} 
                to={match.url || ''}>
                {routeName}
            </MaterialLinkRouter>)
        );
    }
    return null;
};

const BreadcrumbContainer = ({ ...rest, location: { pathname }, match }) => {
    const paths = getPaths(pathname);
    return (
        <Breadcrumbs>
            {paths.map(p => <Route path={p} component={BreadcrumbsItem} />)}
        </Breadcrumbs>
    );
};

export default props => (
    <div>
        <Route path="/:path" component={BreadcrumbContainer} {...props} />
    </div>
);
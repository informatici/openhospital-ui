export const GET_PATIENTS = 'GET_PATIENTS';
export const ADD_NEW_PATIENT = 'ADD_NEW_PATIENT';
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const UPDATE_PATIENT_DETAILS = 'UPDATE_PATIENT_DETAILS';

interface lastWhoVisited {
    name: string
    surname: string
    occupation: string
    phone: string
    email: string
}

export interface Patient {
    isChronic: boolean
    lastWhoVisited: lastWhoVisited
    firstName: string
    secondName: string
    id: string
    age: number
    sex: string
    gender: string
    photo: any
    bloodType: string
    nextKin: string
    notes: string
    lastAdmission: string
    reasonOfVisit: string
    treatment: string
    address: string
}

export interface PatientsList {
    patients: { [id: string]: Patient }
}

interface getPatientsAction{
    type: typeof GET_PATIENTS
    patients: PatientsList
}

interface addNewPatientAction{
    type: typeof ADD_NEW_PATIENT
    patient: Patient
}

interface deletePatientAction{
    type: typeof DELETE_PATIENT
    patient: Patient
}

interface updatePatientDetailsAction{
    type: typeof UPDATE_PATIENT_DETAILS
    patient: Patient
}

export type PatientsActionTypes = 
getPatientsAction | 
addNewPatientAction | 
deletePatientAction | 
updatePatientDetailsAction
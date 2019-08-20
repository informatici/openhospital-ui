# Redux Structure
Here goes the description of the redux `store` when it comes to its elements. Also, the list of `actions` which the application will use to change or get the values stored through redux. It's important to analyse the api docs for a better understanding of the functioning of actions that will perform async requests (:full_moon_with_face:Redux war veterans say "you don't say!").

## Store

- drugs;
- user;
- patients;
- colleagues;
- patientSummary;
- news;
- notifications.

## Actions

###### drugs
- RECEIVE_DRUGS;
- ADD_DRUGS;
- DELETE_DRUG.

###### user
- RECEIVE_USER_DATA;
- UPDATE_USER_DATA.

###### patients
- RECEIVE_PATIENTS;
- ADD_NEW_PATIENT;
- DELETE_PATIENT;
- UPDATE_PATIENT_DETAILS.

###### colleagues
- RECEIVE_COLLEAGUES.

###### patientSummary
- RECEIVE_PATIENT_SUMMARY.

###### news
- RECEIVE_NEWS.

###### notifications
- RECEIVE_NOTIFICATIONS


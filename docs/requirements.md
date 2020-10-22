# Open Hospital App

## Software Requirements

### 1. LoginActivity

- It should validate the **username** input;
  - **username** input is **REQUIRED**;
- It should validate the **password** input;
  - **password** input is **REQUIRED**;
- It should toggle the **password** visibility;
- It should have a **login** and **resetPassword** mode;
  - **login** mode should have **username** and **password** input fields, and a **“submit”** button;
  - **resetPassword** mode should have an **username** input field and a **“submit”** button;
- It should have a link that toggles the central panel to the **resetPassword** mode;
- It should have a **“back”** button that toggles the central panel to the **login** mode;
- It should reset the activity state to **login** mode after submitting the **resetPassword**’s **username** input;

### 2. AppHeader

- It should contain the **Breadcrumb** navigator;
- It should be child of a component with access to the user **credentials**;
- It should have a navigation menu at the bottom-right corner;
  - It should have a menu button that takes to the **PharmacyActivity**;
  - It should have a menu button that takes to the **WardActivity**;
  - It should have a menu button that takes to the **BillingActivity**;

### 3. DashboardActivity

- It should have the **AppHeader**;
- It should have access to the user **credentials**;
- It should present the action buttons in the center;
  - It should have an action button that takes to **NewPatientActivity**;
  - It should have an action button that takes to **SearchPatientActivity**;

### 4. PatientDataForm

- It should check if there is incoming data in the props for populating the fields’ values and the patient’s **profilePicture**;
- It should set the **“submit”** button behavior with the callback passed as prop;
- It should handle the patient’s **profilePicture**;
  - It should allow the patient’s **profilePicture** upload;
    - It should present a dialog for choosing the way of gathering the **patient**’s **profilePicture**;
    - It should be able to get the picture from local device storage;
    - It should be able to open the integrated hardware to take the picture instantly;
  - It should be able to remove the current **patient**’s **profilePicture**;
- It should validate the **name** input;
  - **name** input is **REQUIRED**;
  - **name** input should contain only alphabetic characters;
- It should validate **surname** input;
  - **surname** input is **REQUIRED**;
  - **surname** input should contain only alphabetic characters;
- It should **NOT** validate the **taxNumber** input;
- It should validate the **gender** input;
  - **gender** input is **REQUIRED**;
  - **gender** input should have the options **“man”**, **“woman”** and **“not declared”**;
- It should validate the **birthday** input;
  - **birthday** input is **REQUIRED**;
  - **birthday** input should be in the format **YYYYMMDD**;
  - **birthday** input should rendered with a mask (**MM/DD/YYYYY**);
- It should validate the **address** input;
  - **address** input is **REQUIRED**;
- It should validate the **city** input;
  - **city** input is **REQUIRED**;
- It should validate the **zipCode** input;
  - **zipCode** is **REQUIRED**;
- It should **NOT** validate the **bloodType** input;
- It should **NOT** validate the **telephone** input;
- It should validate the **email** input;
  - **email** input is **NOT** required;
  - **email** input has to be a valid email address;
- It should **NOT** validate the **insurance** input;
- It should have a **“submit”** button;
  - It should set the **“submit”** button’s text using the props;
- It should have a **“reset”** button;

### 5. NewPatientActivity

- It should have the **AppHeader**;
- It should have access to the user **credentials**;
- It should have a **PatientDataForm** as a child component;
  - It should pass in **initialValues** carrying only default values;
  - It should pass the **“submit”** button label;
  - It should pass the callback function for performing the API call;
  <!-- TODO: add a confirmation dialog? -->

### 6. PatientSearchItem

- It should receive a **patient** object as prop;
- It should receive the **routePrefix** as prop, add the **id** and use it to redirect;

### 7. SearchPatientActivity

- It should have the **AppHeader**;
- It should have access to the user **credentials**;
- It should present **patient**’s **id** and **taxNumber** as main search params;
- It should present **name**, **surname**, **birthday** and **address** as secondary search params;
  - It should validate the **name** input;
    - **name** input is **NOT** required;
    - **name** input should contain only alphabetic characters;
  - It should validate **surname** input;
    - **surname** input is **NOT** required;
    - **surname** input should contain only alphabetic characters;
  - It should validate the **birthday** input;
    - **birthday** input is **NOT** required;
    - **birthday** input should be in the format **YYYYMMDD**;
    - **birthday** input should rendered with a mask (**MM/DD/YYYYY**);
  - It should **NOT** validate the **address** input;
- It should display the results in a grid;
  - Each grid item should contain a **PatientSearchItem**;
  - It should pass the patient object to the **PatientSearchItem**;

### 8. PatientDetailsActivity

- It should have the **AppHeader**;
- It should have access to the user **credentials**;
- It should display the **patient**'s information;
  - It should use the **id** from the URL’s **queryParams** as key for retrieving the **patient** data;
  - It should prioritize getting data from the Redux **store**;
  - It should perform an API call as an alternative for retrieving the **patient**’s data
- It should display the **patient**’s summary information as the first tab;

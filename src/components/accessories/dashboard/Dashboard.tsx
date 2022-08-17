import React from "react";
import AppHeader from "../appHeader/AppHeader";
import Footer from "../footer/Footer";
import {
  Configuration,
  OpdControllerApi,
} from "../../../generated";
import { applyTokenMiddleware } from "../../../libraries/apiUtils/applyTokenMiddleware";
// import { AdminContext, AdminUI, Resource, useDataProvider, defaultI18nProvider, ListGuesser } from 'react-admin';
// import { useEffect, useState } from 'react';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const opdControllerApi = new OpdControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <AppHeader userCredentials={{}} breadcrumbMap={{}} />
      Dashboard
      {/* <AdminContext dataProvider={dataProvider} i18nProvider={defaultI18nProvider} >
          <Resources />
      </AdminContext> */}
      <Footer />
    </div>
  );
};

// const Resources = () => {
//      const [resources, setResources] = useState<any[]>([]);
//      const dataProvider = useDataProvider();
//      useEffect(() => {
//          dataProvider.introspect().then((r: any) => setResources(r));
//      }, []);

//      return (
//          <AdminUI>
//              {resources.map(resource => (
//                  <Resource name={resource.name} key={resource.key} list={ListGuesser} />
//              ))}
//          </AdminUI>
//      );
//  };
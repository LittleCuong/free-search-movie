import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from "~/layouts/MainLayout/MainLayout";
import { privateRoutes, publicRoutes } from '~/routes/routes.js';

function App() {
  return (
    <Router>
    <div className="App" style={{overflow: "hidden"}}>
        <Routes>
            {publicRoutes.map((route, index) => {
                let Layout = MainLayout;

                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }

                //chuyển component thành element
                const Page = route.component;

                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
            {privateRoutes.map((route, index) => {
                let Layout = MainLayout;

                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }

                //chuyển component thành element
                const Page = route.component;

                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    </div>
</Router>
  )
}

export default App;

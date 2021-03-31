import React, { useState } from 'react';

import { Head } from 'components';
import links from 'data/links';
import { SiteMetadata } from 'types';
import SignIn from '../components/Home/index'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';

//TODO: Update Metadata
const siteMetadata = new SiteMetadata(
    'Home',
    links.home,
    'Home Page',
    '/images/Favicon/favicon.png'
);

function Home() {
    const history = useHistory();
    if (Cookies.get('email')) { //TODO: Check this
        history.push("/dashboard");
    };
    return (
        <div className="App w-100">
            <Head siteMetadata={siteMetadata} />
            <div className="App-header background-image">
                <SignIn />
            </div>
        </div>
    );
}

export default Home;

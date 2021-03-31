import React, { useState } from 'react';

import { Head } from 'components';
import links from 'data/links';
import { SiteMetadata } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTable, faHamburger } from '@fortawesome/free-solid-svg-icons';
import { Orders, Records } from 'components/Dashboard';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
//TODO: Update Metadata
const siteMetadata = new SiteMetadata(
    'Dashboard',
    links.home,
    'Home Page',
    '/images/Favicon/favicon.png'
);

function DashBoard() {
    const history = useHistory();
    if (Cookies.get('email') === undefined) { //TODO: Check this
        history.push("/");
    };
    const userData = Cookies.get('email');
    let [switchPage, setSwitchPage] = useState(0);

    const SignOut = () => {
        Cookies.remove('email');
        history.push("/");
    }
    return (
        <div className="App w-100 row">
            <Head siteMetadata={siteMetadata} />
            <div className=" side-bar text-center pt-4 position-fixed">
                <FontAwesomeIcon size="4x" className="cursor-pointer mx-auto text-white d-block" icon={faHamburger} />
                <h2 className="text-white mt-2">Welcome!</h2>
                <h4 className="the-name">{userData.userData}</h4>
                {switchPage === 0 ?
                    <button onClick={() => setSwitchPage(1)} className="btn btn-dark mt-4 rounded add-new-btn row"> <FontAwesomeIcon size="1x" className="cursor-pointer text-white d-inline mr-1" icon={faTable} /><div className="d-inline font-weight-bold">My Orders</div></button>
                    : <button onClick={() => setSwitchPage(0)} className="btn btn-dark mt-4 rounded add-new-btn row"> <FontAwesomeIcon size="1x" className="cursor-pointer text-white d-inline mr-1" icon={faChevronLeft} /><div className="d-inline font-weight-bold">Go Back</div></button>
                }
                <button onClick={() => SignOut()} className="btn btn-warning rounded-0 text-blue position-absolute fixed-bottom font-weight-bold  w-100">Sign Out</button>
            </div>
            {switchPage === 1 ?
                <Orders id={userData.id} userData={userData} /> :
                <Records id={userData.id} userData={userData} />
            }

        </div>
    );
}

export default DashBoard;
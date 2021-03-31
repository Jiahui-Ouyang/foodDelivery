import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import firebase from "firebase";
const Orders = ({ id, userData }) => {
    console.log(userData)
    let [allRecords, setAllRecords] = useState({});
    useEffect(() => {
        const userRef = firebase.database().ref('orders').child(userData);
        userRef.on('value', (snapshot) => {
            console.log("hi")
            console.log(snapshot.val())
            if (snapshot.val() !== null) {
                let m = 0;
                setAllRecords(snapshot.val());
            }

        })
    }, [])



    return (<div className="outer-add-new mb-4 px-2 ml-auto" >
        <div>
            <h2 className="mt-4 ml-3 text-info title mb-4">Orders</h2>

            <TableContainer component={Paper} className="w-100 ">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Order At</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(allRecords)?.length > 0 ? Object.keys(allRecords).map(records => {

                            return <TableRow >
                                <TableCell component="th" scope="row">{records}</TableCell>
                                <TableCell align="right">{allRecords[records]['items']}</TableCell>
                                <TableCell align="right">${allRecords[records]['price']}</TableCell>
                                <TableCell align="right" className="cursor-pointer" >
                                    {allRecords[records]['createdAt']}
                                </TableCell>

                            </TableRow>
                        }) :
                            <TableRow className="text-center">
                                No Records Found!
                        </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    </div>

    )
};

export default Orders;
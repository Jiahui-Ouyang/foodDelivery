import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import links from 'data/links';

import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const Records = ({ id, userData }) => {
    console.log(userData)
    let [allRecords, setAllRecords] = useState({});
    let [foodInCart, addFoodInCart] = useState({});
    let [openCart, setOpenCart] = useState(0);
    let [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const userRef = firebase.database().ref('food');
        userRef.on('value', (snapshot) => {
            console.log("hi")
            console.log(snapshot)
            let m = 0;
            setAllRecords(snapshot.val());
        })
    }, [])

    let totall = 0;
    let items = "";
    const AddtoCart = (food, no) => {
        const foodIs = food;
        addFoodInCart(foodOld => ({
            ...foodOld, [no]: food

        }));
    }

    const confirmOrder = () => {
        firebase.database().ref('orders').child(userData).push().set({
            items: items,
            price: totall,
            createdAt: new Date().toUTCString(),
            user: userData

        }).then(json => {
            alert("Thank you for your order!");
            addFoodInCart({});
            setOpenCart(0);

        })

    }
    return (<div className="outer-add-new mb-4 px-2 ml-auto" >
        {openCart === 0 ?
            <div>
                <h2 className="mt-4 ml-3 text-info title mb-4">Food Menu</h2>

                {Object.keys(foodInCart).length > 0 && <div onClick={() => setOpenCart(1)} className="cursors mr-auto ml-3 mb-2 row justify-content-right cursor-pointer">
                    <h6>Go to Checkout: </h6><FontAwesomeIcon size="2x" className="cursor-pointer text-dark ml-2" icon={faShoppingCart} />
                    <h5 className="text-success ml-2">{Object.keys(foodInCart).length}</h5>
                </div>}

                <TableContainer component={Paper} className="w-100 ">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Order</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(allRecords).length > 0 ? Object.keys(allRecords).map(records => {

                                return <TableRow >
                                    <TableCell component="th" scope="row">{records}</TableCell>
                                    <TableCell align="right">{allRecords[records]['name']}</TableCell>
                                    <TableCell align="right">THB{allRecords[records]['price']}</TableCell>
                                    <TableCell align="right" className="cursor-pointer cursors" onClick={() => AddtoCart(allRecords[records], records)}>
                                        <FontAwesomeIcon size="2x" className="cursor-pointer mx-auto text-dark d-block float-right" icon={faPlusCircle} />
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
            :

            <div>
                <h2 className="mt-4 ml-3 text-info title mb-4">Checkout</h2>

                {/* {Object.keys(foodInCart).length > 0 && <div onClick={(setOpenCart(1))} className="mr-auto ml-3 mb-2 row justify-content-right">
                <FontAwesomeIcon size="2x" className="cursor-pointer text-dark" icon={faShoppingCart} />
                <h1 className="text-success">{Object.keys(foodInCart).length}</h1>
            </div>} */}
                <div><h5 className="mt-4 ml-3 text-info title mb-4">Your address:</h5>

                    <input id="address" name="address" type="text" />
                </div>
                <TableContainer component={Paper} className="w-100 ">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Price</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Object.keys(foodInCart).length > 0 ? Object.keys(foodInCart).map(records => {
                                {
                                    totall = totall + foodInCart[records]['price'];
                                    if (items === "") {
                                        items = foodInCart[records]['name'];

                                    }
                                    else {
                                        items = items + "," + foodInCart[records]['name'];
                                    }

                                }
                                return <TableRow >
                                    <TableCell component="th" scope="row">{records}</TableCell>
                                    <TableCell align="right">{foodInCart[records]['name']}</TableCell>
                                    <TableCell align="right">THB{foodInCart[records]['price']}</TableCell>

                                    {/* <TableCell align="right" onClick={() => AddtoCart(allRecords[records], records)}>
                                    <FontAwesomeIcon size="2x" className="cursor-pointer mx-auto text-dark d-block float-right" icon={faPlusCircle} />
                                </TableCell> */}

                                </TableRow>

                            }) :
                                <TableRow className="text-center">
                                    No Records Found!
                    </TableRow>
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <div align="right" className="mr-3 font-weight-bold">Total = THB{totall}</div>
                <button onClick={() => confirmOrder()} className="btn btn-success mt-3 float-right" align="right">Confirm Order</button>
            </div>}
    </div>

    )
};

export default Records;
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [booking,newBooking] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser.email);
    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                 authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>newBooking(data))

    },[])
    return (
        <div>
            <h1>You Booked: {booking.length} Tickets</h1>
            {
                booking.map(book=><li>{book.name} start :{(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} End :{(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;
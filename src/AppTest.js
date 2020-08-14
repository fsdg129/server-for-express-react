import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserDisplay } from './features/users/UserDisplay'
import { updateUser, fetchUserById, selectUserStatus, selectUserError } from './features/users/usersSlice'

export default function AppTest() {

    const dispatch = useDispatch();
    const status = useSelector(selectUserStatus);
    const error = useSelector(selectUserError);
    let message = '';
    useEffect(
        () => {
            dispatch( fetchUserById(1) );
            if (status==='succeeded' ){
                message = 'Fetched user successfully';
                dispatch(updateUser);
            } else{
                message = error;
            }
        },
        []
    );
    
    return (
        <div>
            <UserDisplay />
            <p>{message}</p>
        </div>
    );
}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile =()=>{
    const auth=localStorage.getItem('user');
    return(
        <div className="profile-table">
            <h3>Profile Details:</h3>
            <ul>
                <li>Name</li>
                <li>Email</li>
                <li>Id</li>
            </ul>
            <ul>
                <li>{JSON.parse(auth).name}</li>
                <li>{JSON.parse(auth).email}</li>
                <li>{JSON.parse(auth)._id}</li>
            </ul>
        </div>
    );
}

export default Profile;
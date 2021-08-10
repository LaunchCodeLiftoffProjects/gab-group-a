import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function Profile() {
    const userPlaceholder = {
        name: "Colyn Gremaud",
        location: "Tower Grove",
        needs: [
            "Windows washed",
            "Hamsters fed",
        ],
        has: [
        {
            name: "school supplies",
            quantity: 20
        },
        {
            name: "diapers",
            quantity: 15
        }
        ],
        can: [
        {
            name: "fix cars",
            hoursWork: 12
        },
        {
            name: "walk dogs",
            hoursWork: 3
        }
]
    }
}
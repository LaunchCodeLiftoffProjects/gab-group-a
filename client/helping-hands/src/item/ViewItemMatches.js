import React, { useState, useEffect } from "react";
import { Paper, Card, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { findItemByCategory, findItemByName } from "../search/search-item";

export default function ViewItemMatches() {
    const [results, setResults] = useState({
        exactMatches: [],
        categoryMatches: []
    });
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState();

    const findExactMatches = async (user) => {
        let result = [];
        for (item in user.needsItems) {
            result.push(await findItemByName(item.name))
        }

    }

    const findCategoryMatches = async (user) => {

    }

    useEffect(user => {

    }, [])

}
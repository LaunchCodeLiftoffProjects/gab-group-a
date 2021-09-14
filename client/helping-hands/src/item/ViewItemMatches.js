import React, { useState, useEffect } from "react";
import { Paper, Card, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { findItemByCategory, findItemByName } from "../search/search-item";

export default function ViewItemMatches() {
    const [results, setResults] = useState({
        exactMatches: [],
        categoryMatches: [],
        usersLocation: [],
        allUsers:[]
    });
    const [loaded, setLoaded] = useState({
        exactResults: false,
        categoryResults: false
    });
    const [error, setError] = useState();
    const [user, setUser] = useState();

    const findExactMatches = async user => {
        let result = [];
        for (item in user.needsItems) {
            result.push(...await findItemByName(item.name))
        }
        setResults(prevResults => ({
            ...prevResults,
            exactMatches: result
        }))
        setLoaded(val => ({
            ...val,
            exactLoaded: true
        }))

    }

    const findCategoryMatches = async user => {
        let result = []
        for (item in user.needsItems) {
            result.push(...await findItemByCategory(item.itemCategory.name))
        }
        setResults(prevResults => ({
            ...prevResults,
            categoryMatches: result
        }))
        setLoaded(val => ({
            ...val,
            categoryResults: true
        }))
    }

    const findCategoryMatches = async (user) => {

    }

    useEffect(user => {

    }, [])

}
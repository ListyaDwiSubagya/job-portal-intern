import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (proops) => {

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setSowRecruiterLogin] = useState(false)

    // function to fetch jobs
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs, showRecruiterLogin,
        setSowRecruiterLogin
    }

    return (<AppContext.Provider value={value}>
        {proops.children}
    </AppContext.Provider>)

}
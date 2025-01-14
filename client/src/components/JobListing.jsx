import React, { useContext, useEffect, useState, useMemo } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filterJobs, setFilterJobs] = useState(jobs)

    // Load saved state from localStorage
    useEffect(() => {
        const savedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || []
        const savedLocations = JSON.parse(localStorage.getItem('selectedLocations')) || []
        const savedSearchFilter = JSON.parse(localStorage.getItem('searchFilter')) || { title: '', location: '' }
        const savedIsSearched = JSON.parse(localStorage.getItem('isSearched')) || false
        const savedPage = localStorage.getItem('currentPage')

        setSelectedCategory(savedCategories)
        setSelectedLocations(savedLocations)
        setSearchFilter(savedSearchFilter)

        // Set initial page from localStorage
        if (savedPage) {
            setCurrentPage(Number(savedPage))
        }
    }, [])

    // Update filtered jobs and localStorage whenever relevant state changes
    useEffect(() => {
        // Filter jobs based on selected criteria
        const matchesCategory = job => selectedCategory.length === 0 || selectedCategory.includes(job.category)
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )

        setFilterJobs(newFilteredJobs)

        // Save to localStorage
        localStorage.setItem('selectedCategories', JSON.stringify(selectedCategory))
        localStorage.setItem('selectedLocations', JSON.stringify(selectedLocations))
        localStorage.setItem('searchFilter', JSON.stringify(searchFilter))
        localStorage.setItem('isSearched', JSON.stringify(isSearched))
    }, [jobs, selectedCategory, selectedLocations, searchFilter, isSearched])

    // Save current page to localStorage
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage)
    }, [currentPage])

    const handleCategoryChange = (category) => {
        setSelectedCategory(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category])
    }

    const handleLocationChange = (location) => {
        setSelectedLocations(prev => prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location])
    }

    // Memoized filtered jobs to optimize re-renders
    const paginatedJobs = useMemo(() => {
        return filterJobs.slice((currentPage - 1) * 6, currentPage * 6)
    }, [filterJobs, currentPage])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* Sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* Display current search */}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-gray-600'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                        {searchFilter.title}
                                        <img onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="clear title filter" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                        {searchFilter.location}
                                        <img onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="clear location filter" />
                                    </span>
                                )}
                            </div>
                        </>
                    )
                }
                <button onClick={() => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                    {showFilter ? "Close" : "Filters"}
                </button>

                {/* Category Filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobCategories.map((category, index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input onChange={() => handleCategoryChange(category)} checked={selectedCategory.includes(category)} className='scale-125' type="checkbox" />
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={showFilter ? "" : "max-lg:hidden"}>
                    <h4 className='font-medium text-lg py-4 pt-14'>Search by Locations</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobLocations.map((location, index) => (
                            <li className='flex gap-3 items-center' key={index}>
                                <input onChange={() => handleLocationChange(location)} checked={selectedLocations.includes(location)} className='scale-125' type="checkbox" />
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Job Listings */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {paginatedJobs.length > 0 ? (
                        paginatedJobs.map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    ) : (
                        <p>No jobs found matching your criteria.</p>
                    )}
                </div>

                {/* Pagination */}
                {filterJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} className='p-2'>
                            <img src={assets.left_arrow_icon} alt="Previous" />
                        </button>
                        {Array.from({ length: Math.ceil(filterJobs.length / 6) }).map((_, index) => (
                            <button 
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filterJobs.length / 6)))} className='p-2'>
                            <img src={assets.right_arrow_icon} alt="Next" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing

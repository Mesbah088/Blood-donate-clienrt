import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Filter, User, Phone, Mail, Heart } from 'lucide-react'
import { usersAPI } from '../Utils/api'
 import { useQuery } from "@tanstack/react-query";
import Button from '../UI/Button'
import LoadingSpinner from '../UI/LoadingSpinner'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState({
    bloodType: '',
    location: '',
    availability: 'available'
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data: donors, isLoading, refetch } = useQuery(
    ['donors', searchParams],
    () => usersAPI.search(searchParams),
    {
      enabled: false,
      select: (data) => data.data
    }
  )

  useEffect(() => {
    // Perform search when params change
    if (searchParams.bloodType || searchParams.location) {
      refetch()
    }
  }, [searchParams, refetch])

  const handleSearch = (e) => {
    e.preventDefault()
    refetch()
  }

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
            Find Blood Donors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified blood donors in your area. Save a life today.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card mb-8"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </label>
                <select
                  value={searchParams.bloodType}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, bloodType: e.target.value }))}
                  className="input"
                >
                  <option value="">All Blood Types</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchParams.location}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                    className="input pl-10"
                    placeholder="Enter city or area"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={searchParams.availability}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, availability: e.target.value }))}
                  className="input"
                >
                  <option value="available">Available Now</option>
                  <option value="all">All Donors</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-ghost"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </button>
              
              <Button type="submit" loading={isLoading}>
                <Search className="w-4 h-4 mr-2" />
                Search Donors
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 pt-4 mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age Range
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min age"
                        className="input"
                        min="18"
                        max="65"
                      />
                      <input
                        type="number"
                        placeholder="Max age"
                        className="input"
                        min="18"
                        max="65"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Donation
                    </label>
                    <select className="input">
                      <option value="">Any time</option>
                      <option value="3months">Available (3+ months ago)</option>
                      <option value="6months">6+ months ago</option>
                      <option value="1year">1+ year ago</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="text-center py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Searching for donors...</p>
            </div>
          ) : donors && donors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor) => (
                <div key={donor.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{donor.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="badge badge-error text-white bg-primary-600">
                          {donor.bloodType}
                        </span>
                        <span className="badge badge-success">
                          Available
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{donor.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Heart className="w-4 h-4" />
                      <span>{donor.donationCount || 0} donations</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <a href={`tel:${donor.phone}`} className="btn-primary flex-1 text-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </a>
                    <a href={`mailto:${donor.email}`} className="btn-outline flex-1 text-center">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No donors found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or expanding your location range.
              </p>
              <Button onClick={() => setSearchParams({ bloodType: '', location: '', availability: 'available' })}>
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
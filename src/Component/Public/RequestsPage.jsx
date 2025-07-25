import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { 
  Heart, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Filter,
  Plus,
  Phone,
  Mail,
  User
} from 'lucide-react'
import { requestsAPI } from '../utils/api'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { format } from 'date-fns'

export default function RequestsPage() {
  const { user } = useAuth()
  const [filters, setFilters] = useState({
    bloodType: '',
    urgency: '',
    location: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data: requests, isLoading, refetch } = useQuery(
    ['requests', filters],
    () => requestsAPI.getAll(filters),
    {
      select: (data) => data.data
    }
  )

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const urgencyLevels = ['normal', 'urgent', 'critical']

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'badge-error'
      case 'urgent': return 'badge-warning'
      default: return 'badge-info'
    }
  }

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
            Blood Requests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help save lives by responding to urgent blood requests in your community.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter Requests</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-ghost"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              {user && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Request
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </label>
                <select
                  value={filters.bloodType}
                  onChange={(e) => setFilters(prev => ({ ...prev, bloodType: e.target.value }))}
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
                  Urgency
                </label>
                <select
                  value={filters.urgency}
                  onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.value }))}
                  className="input"
                >
                  <option value="">All Urgency Levels</option>
                  {urgencyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="input"
                  placeholder="Enter city or hospital"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="text-center py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Loading blood requests...</p>
            </div>
          ) : requests && requests.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {requests.map((request) => (
                <div key={request.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="badge badge-error text-white bg-primary-600">
                          {request.bloodType}
                        </span>
                        <span className={`badge ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Patient: {request.patientName}
                      </h3>
                      <p className="text-gray-600 mb-3">{request.description}</p>
                    </div>
                    {request.urgency === 'critical' && (
                      <AlertTriangle className="w-6 h-6 text-error-500 animate-pulse" />
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{request.hospital}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Needed by {format(new Date(request.neededBy), 'MMM dd, yyyy HH:mm')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>Contact: {request.contactPerson}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Posted {format(new Date(request.createdAt), 'MMM dd, HH:mm')}
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${request.contactPhone}`}
                        className="btn-outline btn text-xs"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </a>
                      <a
                        href={`mailto:${request.contactEmail}`}
                        className="btn-outline btn text-xs"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </a>
                      <Button size="sm">
                        <Heart className="w-4 h-4 mr-1" />
                        I Can Help
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600 mb-6">
                There are currently no blood requests matching your criteria.
              </p>
              <Button onClick={() => setFilters({ bloodType: '', urgency: '', location: '' })}>
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
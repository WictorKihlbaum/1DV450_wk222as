class Position < ActiveRecord::Base

  #attr_accessor :address, :latitude, :longitude

  has_many :events

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  # Presence doesn't need to be present.
  # User may choose by which method he/she wants to save an event.

  #validates :address, presence: true
  #validates :latitude, presence: true
  #validates :longitude, presence: true

end

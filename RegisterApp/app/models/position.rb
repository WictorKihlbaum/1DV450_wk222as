class Position < ActiveRecord::Base

  #attr_accessor :address, :latitude, :longitude

  has_many :events, dependent: :destroy

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

  # User may choose by which method he/she wants to save an event.

  #validates :address, presence: true
  #validates :latitude, presence: true
  #validates :longitude, presence: true

end

class Position < ActiveRecord::Base

  #attr_accessor :address, :latitude, :longitude

  has_many :events, dependent: :destroy

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  before_validation :geocode, :reverse_geocode

  validates :address, uniqueness: true

end

class Position < ActiveRecord::Base

  #has_and_belongs_to_many :events
  has_one :event

  reverse_geocoded_by :longitude, :latitude
  after_validation :reverse_geocode

  validates :longitude, presence: true
  validates :latitude, presence: true
end

class Position < ActiveRecord::Base
  has_and_belongs_to_many :events

  validates :longitude, presence: true
  validates :latitude, presence: true
end

class Event < ActiveRecord::Base
  has_one :position
  has_many :tags
  belongs_to :creator
end

class Event < ActiveRecord::Base
  has_one :position
  has_one :creator
  has_and_belongs_to_many :tags
end

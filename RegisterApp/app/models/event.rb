class Event < ActiveRecord::Base
  
  include Filterable

  belongs_to :creator
  belongs_to :position
  #has_one :position
  has_many :tags

  validates :category, presence: true
  validates :description, presence: true

  default_scope -> { order(created_at: :desc) }
  scope :category, -> (category) { where category: category }
  scope :desc_starts_with, -> (description) { where("description like ?", "#{description}%") }
  scope :creator, -> (creator_id) { where creator_id: creator_id }
  scope :position, -> (position_id) { where position_id: position_id }

end

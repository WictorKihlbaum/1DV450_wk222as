class Event < ActiveRecord::Base
  include Filterable

  has_one :position
  has_many :tags
  belongs_to :creator

  validates :category, presence: true, length: { minimum: 10 }
  validates :description, presence: true
  default_scope -> { order(created_at: :desc) }
  before_save { self.creator_id = 1 }
  before_save { self.position_id = 1 }
  before_save { self.tag_id = 1 }
end

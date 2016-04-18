class Tag < ActiveRecord::Base
  has_many :events
  validates :name, presence: true, length: { maximum: 50 }
end

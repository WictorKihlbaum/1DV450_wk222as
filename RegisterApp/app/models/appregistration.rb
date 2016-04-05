class Appregistration < ActiveRecord::Base
  belongs_to :user

  before_create { self.apikey = self.generate_apikey }
  #default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 50 }

  def generate_apikey
    self.apikey = SecureRandom.hex
  end

end

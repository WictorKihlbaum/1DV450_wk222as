class Appregistration < ActiveRecord::Base

  belongs_to :user
  before_save { self.apikey = self.setApiKey }
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 50 }

  def setApiKey
    self.apikey = "api_key_" + SecureRandom.hex(32)
  end

end

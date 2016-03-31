class Appregistration < ActiveRecord::Base
  belongs_to :user

  before_create { self.apikey = self.generateApiKey }
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 50 }

  private

  def generateApiKey
    begin
      self.apikey = SecureRandom.hex
    end while self.class.exists?(apikey: apikey)
  end

end

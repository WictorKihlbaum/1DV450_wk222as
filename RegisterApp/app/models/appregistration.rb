class Appregistration < ActiveRecord::Base
  belongs_to :user

  before_create { self.apikey = self.generate_apikey }
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 50 }

  def generate_apikey
    begin
      self.apikey = SecureRandom.hex
    end while self.class.exists?(apikey: apikey)
  end

end

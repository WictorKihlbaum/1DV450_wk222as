class EventSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers
  attributes :id, :category, :description, :created_at, :updated_at, :links

  has_one :creator
  has_one :position
  has_many :tags

  def links
    {
        self: api_v1_event_path(object.id),
        creator: api_v1_creator_path(object.creator.id),
        position: api_v1_position_path(object.position.id),
        tags: api_v1_event_tags_path(object.id)
    }
  end

end

class EventSerializer < ActiveModel::Serializer

  attributes :id, :category, :description, :links

  belongs_to :creator
  belongs_to :position
  #has_one :position
  has_and_belongs_to_many :tags

  def links
    {
        self: api_event_path(object.id),
        creator: api_creator_path(object.creator.id),
        position: api_position_path(object.position.id),
        tag: api_event_tags_path(object.id)
    }
  end

end

class EventSerializer < ActiveModel::Serializer

  attributes :id, :category, :description, :links

  has_one :creator
  has_one :position
  #has_many :tags

  def links
    {
        self: api_v1_event_path(object.id),
        creator: api_v1_creator_path(object.creator.id),
        position: api_v1_position_path(object.position.id)#,
        #tag: api_v1_event_tags_path(object.id)
    }
  end

end

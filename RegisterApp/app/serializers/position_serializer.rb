class PositionSerializer < ActiveModel::Serializer

  attributes :id, :address, :latitude, :longitude, :links

  def links
    {
        self: api_v1_position_path(object.id)#,
        #events: api_position_events_path(object.id)
    }
  end

end

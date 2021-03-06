class PositionSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers
  attributes :id, :address, :latitude, :longitude, :links

  def links
    {
        self: api_v1_position_path(object.id),
        events: api_v1_position_events_path(object.id)
    }
  end

end

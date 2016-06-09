class CreatorSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers
  attributes :id, :name, :email, :links

  def links
    {
        self: api_v1_creator_path(object.id),
        events: api_v1_creator_events_path(object.id)
    }
  end

end

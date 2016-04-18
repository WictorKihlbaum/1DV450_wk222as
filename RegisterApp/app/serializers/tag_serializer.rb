class TagSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers
  attributes :id, :name, :links

  def links
    {
        self: api_v1_tag_path(object.id)#,
        #events: api_tag_events_path(object.id)
    }
  end

end

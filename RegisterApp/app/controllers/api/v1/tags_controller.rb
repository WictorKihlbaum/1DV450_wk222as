class API::V1::TagsController < API::APIController

  before_action :set_tag, only: [:show]


  def index
    tags = Tag.limit(@limit).offset(@offset)
    render_response(tags, :ok)
  end

  def show
    render_response(@tag, :ok)
  end

  def set_tag
    @tag = Tag.find(params[:id])
  end

end

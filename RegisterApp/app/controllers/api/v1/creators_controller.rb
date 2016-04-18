class API::V1::CreatorsController < API::APIController

  before_action :set_creator, only: [:show]


  def index
    creators = Creator.limit(@limit).offset(@offset)
    render_response(creators, :ok)
  end

  def show
    render_response(@creator, :ok)
  end

  def set_creator
    @creator = Creator.find(params[:id])
  end

end

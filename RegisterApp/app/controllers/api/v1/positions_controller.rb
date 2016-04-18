class API::V1::PositionsController < API::APIController

  before_action :set_position, only: [:show]


  def index
    positions = Position.limit(@limit).offset(@offset)
    render_response(positions, :ok)
  end

  def show
    render_response(@position, :ok)
  end

  def set_position
    @position = Position.find(params[:id])
  end

end

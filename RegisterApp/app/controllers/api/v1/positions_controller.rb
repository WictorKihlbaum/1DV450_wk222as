class API::V1::PositionsController < API::APIController

  before_action :set_position, only: [:show]


  def index
    positions = Position.limit(@limit).offset(@offset)
    render_response(positions, :ok)
  end

  def show
    render_response(@position, :ok)
  end

  def create
    position = Position.new(position_params)

    if position.save
      render_response(position, :created)
    else
      error = { message: 'Position was not created.', errors: position.errors }
      render_response(error, :unprocessable_entity)
    end
  end

  def set_position
    @position = Position.find(params[:id])
  end

  def position_params
    params.require(:position).permit(:address, :latitude, :longitude)
  end

end

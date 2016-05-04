class API::V1::PositionsController < API::APIController

  before_action :set_position, only: [:show]

  # Messages
  ALREADY_EXIST = 'Position already exist in database.'
  NOT_CREATED = 'Position was not created.'


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
      oldPosition = Position.find_by_address(position.address)

      if oldPosition
        message = { message: ALREADY_EXIST, position: oldPosition }
        render_response(message, :ok)
      else
        error = { message: NOT_CREATED, errors: position.errors }
        render_response(error, :unprocessable_entity)
      end
    end
  end

  def set_position
    @position = Position.find(params[:id])
  end

  def position_params
    params.require(:position).permit(:address, :latitude, :longitude)
  end

end

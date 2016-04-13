class API::V1::EventsController < API::APIController

  # Error messages.
  UNSUPPORTED_FORMAT = 'The API does not support the requested format, please use JSON or XML.'
  RESOURCES_NOT_FOUND = 'Could not find any resources. Try changing the filters if you used any.'
  RESOURCE_NOT_FOUND = 'Could not find the requested resource, please be sure to use a valid ID.'
  RESOURCE_NOT_CREATED = 'Resource could not be created.'

  # Error handling.
  rescue_from ActionController::UnknownFormat, with: :unsupported_format
  rescue_from ActiveRecord::RecordNotFound, with: :resource_not_found

  before_action :set_event, only: [:show, :update, :destroy]
  before_action :offset_params, only: [:index]


  # GET api/v1/events
  def index
    events = Event.filter(
        params.slice(
            :category,
            :desc_starts_with,
            :creator,
            :position
        )
    )

    if events.count > 0

=begin
      if params[:long].present? && params[:lat].present?
        events = get_nearby_events_based_on_position
        render_response(events, :ok)
      end
=end

      events = events.limit(@limit).offset(@offset)
      render_response(events, :ok)
    else
      error = ErrorMessage.new(RESOURCES_NOT_FOUND)
      render_response(error, :not_found)
    end
  end

  def get_nearby_events_based_on_position
    events = []
    positions = Position.near([params[:long].to_f, params[:lat].to_f], 20)

    positions.each do |position|
      events << position.event
    end
    events
  end

  # GET api/v1/events/id
  def show
    render_response(@event, :ok)
  end

  # POST api/v1/events
  def create
    event = Event.new(event_params)

    if event.save
      render_response(event, :created)
    else
      error = { message: RESOURCE_NOT_CREATED, reasons: event.errors }
      render_response(error, :unprocessable_entity)
    end
  end

  # PATCH/PUT api/v1/events/id
  def update
    if @event.update(event_params)
      render_response(@event, :ok)
    else
      render_response(@event.errors, :unprocessable_entity)
    end
  end

  # DELETE api/v1/events/id
  def destroy
    @event.destroy
    head :no_content
  end


  private

    # A list of the param names that can be used for filtering the Events list.
    def filtering_params(params)
      params.slice(:category, :desc_starts_with, :creator, :position)
    end

    def unsupported_format
      error = ErrorMessage.new(UNSUPPORTED_FORMAT)
      render_response(error, :bad_request)
    end

    def resource_not_found
      error = ErrorMessage.new(RESOURCE_NOT_FOUND)
      render_response(error, :not_found)
    end

    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:category, :description)
    end

end

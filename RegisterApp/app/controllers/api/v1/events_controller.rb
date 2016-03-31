module API
  module V1
    class EventsController < APIController

      require 'ErrorMessage'
      UNSUPPORTED_FORMAT = 'The API does not support the requested format, please use JSON or XML.'
      RESOURCE_NOT_FOUND = 'Could not find the requested resource, please use a valid ID.'

      # Error handling.
      rescue_from ActionController::UnknownFormat, with: :raise_bad_format
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      before_action :set_event, only: [:show, :update, :destroy]
      before_action :api_key, only: [:create]
      # Check if user has set custom limit/offset.
      before_action :offset_params, only: [:index]
      # Render resource(s) in JSON by default if format is not set by user.
      before_filter :default_format_json


      # GET api/v1/events
      def index
        @events = Event.limit(@limit).offset(@offset)
        #@events = Event.filter(params.slice(:category))

        # Adding "category"-filtering.
        if @category = params[:category]
          @events = @events.where(category: @category)
        end

        respond_to do |format|
          format.json { render json: @events, status: :ok }
          format.xml { render xml: @events, status: :ok }
        end
      end

      # GET api/v1/events/id
      def show
        @event = Event.find(params[:id])

        respond_to do |format|
          format.json { render json: @event, status: :ok }
          format.xml { render xml: @event, status: :ok }
        end
      end

      # POST api/v1/events
      def create
        @event = Event.new(event_params)

        if @event.save
          render json: @event, status: :created#, location: @event
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT api/v1/events/id
      def update
        @event = Event.find(params[:id])

        if @event.update(event_params)
          render json: @event, status: :ok
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      # DELETE api/v1/events/id
      def destroy
        @event = Event.find(params[:id])
        @event.destroy
        head :no_content
      end

      def default_format_json
        request.format = 'json' unless params[:format]
      end


      private

      def raise_bad_format
        @error = ErrorMessage.new(UNSUPPORTED_FORMAT)
        render json: @error, status: :bad_request
      end

      def record_not_found
        @error = ErrorMessage.new(RESOURCE_NOT_FOUND)
        render json: @error, status: :not_found
      end

      def set_event
        @event = Event.find(params[:id])
      end

      def event_params
        params.require(:event).permit(:category, :description)
      end

    end
  end
end

module V1
  class EventsController < ApplicationController
    require 'ErrorMessage'

    rescue_from ActionController::UnknownFormat, with: :raise_bad_format
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    before_action :set_event, only: [:show, :update, :destroy]
    before_action :offset_params, only: [:index]


    # GET /events
    def index
      @events = Event.limit(@limit).offset(@offset)

      if @category = params[:category]
        @events = @events.where(category: @category)
      end

      respond_to do |format|
        format.json { render json: @events, status: :ok }
        format.xml { render xml: @events, status: :ok }
      end
    end

    # GET /events/id
    def show
      @event = Event.find(params[:id])

      respond_to do |format|
        format.json { render json: @event, status: :ok }
        format.xml { render xml: @event, status: :ok }
      end
    end

    # POST /events
    def create
      @event = Event.new(event_params)

      if @event.save
        render json: @event, status: :created, location: @event
      else
        render json: @event.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /events/1
    def update
      @event = Event.find(params[:id])

      if @event.update(event_params)
        head :no_content
      else
        render json: @event.errors, status: :unprocessable_entity
      end
    end

    # DELETE /events/1
    def destroy
      @event.destroy

      head :no_content
    end

    private
      def raise_bad_format
        @error = ErrorMessage.new('The API does not support the requested format, please use JSON or XML.')
        render json: @error, status: :bad_request
      end

      def record_not_found
        @error = ErrorMessage.new('Could not find the requested resource, please use a valid ID.')
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

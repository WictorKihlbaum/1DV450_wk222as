class EventsController < ApplicationController
  #before_action :set_event, only: [:show, :update, :destroy]

  # GET /events
  def index
    @events = Event.all

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
  # POST /events.json
  def create
    @event = Event.new(event_params)

    if @event.save
      render json: @event, status: :created, location: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @event = Event.find(params[:id])

    if @event.update(event_params)
      head :no_content
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy

    head :no_content
  end

  private

    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:category, :description)
    end
end

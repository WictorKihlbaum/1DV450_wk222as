require 'test_helper'

class EventsControllerTest < ActionController::TestCase

  # GET

  setup { host! 'localhost:3000/api/v1' }

  test 'returns list of all events' do
    get '/events'
    assert_equal 200, response.status
    refute_empty response.body
  end

  test 'returns events filtered by category' do
    event1 = Event.create!(category: 'Paintball', description: 'It will be fun!')
    event2 = Event.create!(category: 'Winetasting', description: 'It will be great!')

    get '/events?category=Paintball'
    assert_equal 200, response.status

    events = json(response.body) # Helper method.
    categories = events.collect { |c| c[:category] }
    assert_includes categories, 'Paintball'
    refute_includes categories, 'Winetasting'
  end

  test 'returns event by id' do
    event = Event.create!(category: 'Laserdoom', description: 'It will be awesome!')

    get '/events/#{event.id}'
    assert_equal 200, response.status

    event_response = json(response.body) # Helper method.
    assert_equal event.category, event_response[:category]
  end


  # POST

  test 'creates events' do
    post '/events',
         { event:
             { category: 'My Test Category', description: 'My Test Description.' }
         }.to_json,
         { 'Accept' => Mime::JSON, 'Content-Type' => Mime::JSON.to_s }

    assert_equal 201, response.status
    assert_equal Mime::JSON, response.content_type

    event = json(response.body)
    assert_equal event_url(event[:id]), response.location
  end

  test 'does not create events with category nil' do
    post '/events',
         { event:
               { category: nil, description: 'My Test Description.' }
         }.to_json,
         { 'Accept' => Mime::JSON, 'Content-Type' => Mime::JSON.to_s }

    assert_equal 422, response.status
    assert_equal Mime::JSON, response.content_type
  end


  # UPDATE

  setup { @event = Event.create!(category: 'My Category') }

  test 'successful update' do
    patch "/events/#{@event.id}",
          { event: { category: 'My Category Edit' } }.to_json,
          { 'Accept' => Mime::JSON, 'Content-Type' => Mime::JSON.to_s }

    assert_equal 200, response.status
    assert_equal 'My Category Edit', @event.reload.category
  end

  test 'unsuccessful update on short category' do
    patch "/events/#{@event.id}",
          { event: { category: 'short' } }.to_json,
          { 'Accept' => Mime::JSON, 'Content-Type' => Mime::JSON.to_s }

    assert_equal 422, response.status
  end


  # DELETE

  setup { @event = Event.create(category: 'I am going to be deleted') }

  test 'deletes existing event' do
    delete "/events/#{@event.id}"
    assert_equal 204, response.status
  end

end

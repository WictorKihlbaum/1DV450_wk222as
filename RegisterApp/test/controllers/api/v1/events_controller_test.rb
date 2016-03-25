require 'test_helper'

class EventsControllerTest < ActionController::TestCase

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

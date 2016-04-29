# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Create Admin user.
User.create!(
    name: "Admin",
    email: "admin@user.com",
    password: "Password",
    password_confirmation: "Password",
    admin: true
)

# Me.
User.create!(
    name: "Wictor",
    email: "wk222as@student.lnu.se",
    password: "111111",
    password_confirmation: "111111"
)

# Create 24 example users.
24.times do |n|

  name = Faker::Name.name # Get random name with help from Faker Gem.
  email = "example-#{n+1}@user.com"
  password = "password"

  User.create!(
      name: name,
      email: email,
      password: password,
      password_confirmation: password
  )

end

# Create 10 example apps for each user.
@users = User.all
@users.each do |user|
  10.times do |n|
    Appregistration.create!(
        content: "ExampleApp#{n+1}",
        user_id: user.id
    )
  end
end

#-----------------------
# Backend API Seeds
#-----------------------

# Positions
@position1 = Position.create!(latitude: 56.6666667, longitude: 16.3666667)
@position2 = Position.create!(latitude: 56.668213, longitude: 16.356047)
@position3 = Position.create!(latitude: 56.665100, longitude: 16.319741)

# Tags
@tag1 = Tag.create!(name: 'Fun')
@tag2 = Tag.create!(name: 'Great')
@tag3 = Tag.create!(name: 'Meh')

# Creators
@creator1 = Creator.create!(
    name: 'Wicce',
    email: 'wictor@gmail.com',
    password: 'password'
)

# Events
@event1 = Event.create!(
    category: 'Paintball',
    description: 'Paintball desc',
    creator: @creator1,
    position: @position1
)

@event2 = Event.create!(
    category: 'Treasure hunt',
    description: 'Treasure desc',
    creator: @creator1,
    position: @position2
)

@event3 = Event.create!(
    category: 'Horse riding',
    description: 'Horse desc',
    creator: @creator1,
    position: @position3
)

# Add tags to the events.

# Event #1
@event1.tags.push(@tag1)
@event1.tags.push(@tag2)
@event1.tags.push(@tag3)

# Event #2
@event2.tags.push(@tag1)

#Event #3
@event3.tags.push(@tag2)

# Save all events
@event1.save
@event2.save
@event3.save



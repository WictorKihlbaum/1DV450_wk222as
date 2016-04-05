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


Position.create!(
    longitude: 16.3666667,
    latitude: 56.6666667
)

Tag.create!(
    name: 'Paintball',
)

Creator.create!(
    name: 'Wicce',
    email: 'wictor@gmail.com',
    password: 'password'
)

Event.create!(
    category: "Paintball",
    description: 'Test your skills against your friends in Kalmar paintball-arena!',
    creator_id: 1,
    position_id: 1
)

Event.create!(
    category: "Winetasting",
    description: 'Taste all our wines for a cheap price!',
    creator_id: 1,
    position_id: 1
)

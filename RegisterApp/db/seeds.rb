# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Admin user.
User.create!(name: "Admin",
             email: "admin@user.com",
             password: "Password",
             password_confirmation: "Password",
             admin: true)

# Me.
User.create!(name: "Wictor",
             email: "wk222as@student.lnu.se",
             password: "111111",
             password_confirmation: "111111")

# Example users.
24.times do |n|

  name = Faker::Name.name
  email = "example-#{n+1}@user.com"
  password = "password"

  User.create!(
      name: name,
      email: email,
      password: password,
      password_confirmation: password
  )

end

User.each do |n|

  Appregistration.create!(
      content: "ExampleApp-#{n+1}",
      apikey: "api_key_" + SecureRandom.hex(32)
  )

end

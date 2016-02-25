# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Event.create!(
    category: "Paintball",
    description: 'Test your skills against your friends in Kalmar paintball-arena!'
)

Event.create!(
    category: "Winetasting",
    description: 'Taste all our wines for a cheap price!'
)

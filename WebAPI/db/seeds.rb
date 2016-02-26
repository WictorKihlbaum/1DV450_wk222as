# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Position.create!(
    longitude: 16.3666667,
    latitude: 56.6666667
)

Tag.create!(
    name: 'Paintball'
)

Creator.create!(
    first_name: 'Wictor',
    last_name: 'Kihlbaum'
)

Event.create!(
    category: "Paintball",
    description: 'Test your skills against your friends in Kalmar paintball-arena!',
    creator_id: 1,
    position_id: 1,
    tag_id: 1
)

Event.create!(
    category: "Winetasting",
    description: 'Taste all our wines for a cheap price!',
    creator_id: 1,
    position_id: 1,
    tag_id: 1
)

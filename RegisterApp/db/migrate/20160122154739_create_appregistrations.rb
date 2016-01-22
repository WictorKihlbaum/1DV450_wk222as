class CreateAppregistrations < ActiveRecord::Migration
  def change
    create_table :appregistrations do |t|
      t.string :content
      t.string :apikey
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_index :appregistrations, [:user_id, :created_at] # Ta bort eventuellt.
  end
end

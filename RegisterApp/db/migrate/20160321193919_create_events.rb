class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :category
      t.string :description

      t.references :creator, index: true, foreign_key: true
      t.references :position, index: true, foreign_key: true

      t.timestamps null: false
    end
      #add_reference :events, :creator, index: true, foreign_key: true
      #add_reference :events, :position, index: true, foreign_key: true

      add_index :events, [:creator_id, :created_at]
      add_index :events, [:position_id, :created_at]
  end
end

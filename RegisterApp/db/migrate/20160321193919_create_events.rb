class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :category
      t.string :description

      t.timestamps null: false
    end
      add_reference :events, :creator, index: true, foreign_key: true
      add_reference :events, :position, index: true, foreign_key: true
      add_reference :events, :tag, index: true, foreign_key: true
  end
end

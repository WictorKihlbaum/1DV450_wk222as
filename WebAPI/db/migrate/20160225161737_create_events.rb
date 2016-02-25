class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :category
      t.string :description

      t.timestamps null: false
    end
  end
end

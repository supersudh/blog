class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.belongs_to :post, index: true, unique: true, foreign_key: true
      t.attachment :image
      t.timestamps null: false
    end
  end
end

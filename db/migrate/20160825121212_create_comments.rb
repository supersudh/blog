class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :post, index: true, unique: true, foreign_key: true
      t.belongs_to :user, index: true, unique: true, foreign_key: true
      t.text :name, null: false
      t.timestamps null: false
    end
  end
end

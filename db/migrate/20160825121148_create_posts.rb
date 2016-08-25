class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.belongs_to :user, index: true, unique: true, foreign_key: true
      t.text :content, null: false
      t.timestamps null: false
    end
  end
end

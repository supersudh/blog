class Post < ActiveRecord::Base
  belongs_to :user
  has_many :comments
  validates_presence_of :content
  has_many :pictures, :dependent => :destroy
end

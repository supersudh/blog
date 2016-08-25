class Comment < ActiveRecord::Base
	belongs_to :user
	belongs_to :post, dependent: :destroy
	validates_presence_of :name
end

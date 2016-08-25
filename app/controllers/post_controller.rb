class PostController < ApplicationController
	before_action :authenticate_user
	skip_before_action :verify_authenticity_token
	require 'date'
	def index
		top = Post.order(created_at: :desc).limit(25)
		@post = []
		top.each do |t|
			temp_obj = {}
			temp_obj["id"] = t.id
			temp_obj["nickname"] = User.find(t.user_id).nickname
			temp_obj["post"] = t.content
			d = DateTime.parse(t.created_at.to_s)
			temp_obj["time"] = d.strftime('%H:%M:%S %a, %b, %Y')
			comment_arr = []
			comms = Comment.order(created_at: :asc).where(post_id: t.id)
			unless comms.nil?
				comms.each do |c|
					temp_c_obj = {}
					temp_c_obj["nickname"] = User.find(c.user_id).nickname
					temp_c_obj["comment"] = c.name
					d = DateTime.parse(c.created_at.to_s)
					temp_c_obj["time"] = d.strftime('%H:%M:%S %a, %b, %Y')
					comment_arr.push(temp_c_obj)
				end
		  end
			temp_obj["comments"] = comment_arr
			@post.push(temp_obj)
		end
	end

	def new
		@post = @current_user.posts.build
	end

	def create
		@post = @current_user.posts.build(post_params)
		if @post.save
			flash[:notice] = "Post successfully created"
			redirect_to(post_index_path)
		else
			flash[:notice] = "Please Try again"
			redirect_to(post_new_path)
		end
	end
  
  def show
  	top = Post.find(params[:id])
  	@post = []
  	temp_obj = {}
		temp_obj["id"] = top.id
		temp_obj["nickname"] = User.find(top.user_id).nickname
		temp_obj["post"] = top.content
		d = DateTime.parse(top.created_at.to_s)
		temp_obj["time"] = d.strftime('%H:%M:%S %a, %b, %Y')
		comment_arr = []
		comms = Comment.order(created_at: :asc).where(post_id: top.id)
		unless comms.nil?
			comms.each do |c|
				temp_c_obj = {}
				temp_c_obj["nickname"] = User.find(c.user_id).nickname
				temp_c_obj["comment"] = c.name
				d = DateTime.parse(c.created_at.to_s)
				temp_c_obj["time"] = d.strftime('%H:%M:%S %a, %b, %Y')
				comment_arr.push(temp_c_obj)
			end
	  end
		temp_obj["comments"] = comment_arr
		@post.push(temp_obj)
  end

	def edit
	end

	def update
	end

	def delete
	end

	def destroy
	end

	def old
	end

	def comment
		post = Post.find(params["post_id"])
		@comment = post.comments.build(:name => params["comment"], :user_id => @current_user.id)
		if @comment.save
			render json: {"valid":1,"time":DateTime.parse(@comment.created_at.to_s).strftime('%H:%M:%S %a, %b, %Y'), "nickname":@current_user.nickname}
		else
			render json: {"valid":0}
		end
	end

	def search_index
    
	end

	def search_query
		query = params["query"]
		top = Post.where("LOWER(content) like ?","%#{query}%")
		@result = []
		top.each do |t|
			temp_obj = {}
			temp_obj["id"] = t.id
			temp_obj["nickname"] = User.find(t.user_id).nickname
			temp_obj["post"] = t.content
			d = DateTime.parse(t.created_at.to_s)
			temp_obj["time"] = d.strftime('%H:%M:%S %a, %b, %Y')
			@result.push(temp_obj)
		end	
		render json: {"count":@result.length, "results":@result}
  end
	private
	def post_params
		params.require(:post).permit(:content)
	end
end

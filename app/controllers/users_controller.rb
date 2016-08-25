class UsersController < ApplicationController
	def index
		if session[:user_id].nil?
	    render template: "layouts/signTemp"
	  else
	  	redirect_to(post_index_path)
	  end  
	end

	def register
	user = User.new(user_params)
	if user.save
		session[:user_id] = user.id
		redirect_to(post_index_path)
	else
		flash[:notice] = 'Invalid Email/Password'
	  redirect_to(user_index_path)
	end
	end

	def login
	  user = User.find_by_email(params[:email])
	  if user.nil?	
	    flash[:notice] = 'Invalid Email/Password'
      redirect_to(user_index_path)
	  else
	  	authorized_user = User.authenticate(params[:email], params[:password])
	  	if authorized_user
        session[:user_id] = user.id
			  redirect_to(post_index_path)
		  else
		    flash[:notice] = 'Invalid Email/Password'
        redirect_to(user_index_path)
	    end
	  end    
	end

	def logout
	  session[:user_id] = nil
	  redirect_to(user_index_path)
	end
	private
	def user_params
	  params.require(:user).permit(:email, :password, :nickname)
	end
end

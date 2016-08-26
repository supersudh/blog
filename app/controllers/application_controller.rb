class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def authenticate_user
  	unless session[:user_id].nil?
  	  @current_user = User.find(session[:user_id])
  	  return true
  	else
  	  flash[:notice] = "Please Login First"	
  	  redirect_to(user_index_path)
  	end
  end
end

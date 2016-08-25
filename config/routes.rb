Rails.application.routes.draw do
  root to: 'users#index'
  get 'user-index', to: 'users#index', as: 'user_index'
  match 'user-register' => 'users#register', :as => :user_register, via: [:post]
  match 'user-login' => 'users#login', :as => :user_login, via: [:post]

  #get 'home-page', to: 'home#index', as: 'home_index'
  match 'all-posts' => 'post#index', :as => :post_index, via: [:get]
  get 'new-post', to: 'post#new', as: 'post_new'
  get 'search-posts', to: 'post#search_index', as: 'post_search'
  match 'create-post' => 'post#create', :as => :post_create, via: [:post]
  match 'my-posts' => 'post#old', :as => :post_old, via: [:get]
  match 'show-post/:id' => 'post#show' ,:as => :post_show, via: [:get]
  get 'logout', to: 'users#logout', as: 'logout'
  
  post 'post/comment'
  get 'post/search_query'
end

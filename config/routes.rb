Rails.application.routes.draw do
  root :to => 'home#index'
  post '/users' => 'users#create'
  post  '/users/sign_in' => 'sessions#create'
  get  '/users/sign_out' => 'sessions#destroy', as: :logout
  get 'projects/new'
  get '/projects/:id' => 'projects#show', as: :project
  post 'projects' => 'projects#create'
  post 'projects/join' => 'projects#join'
  post 'psbt' => 'projects#psbt'
end

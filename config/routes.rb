Rails.application.routes.draw do
  root 'static_pages#home'
  resource :user, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :teams, only: [:index, :create, :update, :destroy]
    resources :memberships, only: [:create, :destroy]
  end

  get '', to: 'static_pages#home', as: 'home'
end

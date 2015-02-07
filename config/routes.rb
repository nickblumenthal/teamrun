Rails.application.routes.draw do
  root 'static_pages#home'
  resource :session, only: [:new, :create, :destroy]
  resource :user, only: [:new, :create]
  namespace :api, defaults: { format: :json } do
    resources :teams, only: [:index, :create, :show, :update, :destroy]
    resources :memberships, only: [:create, :show, :destroy]
    resources :routes, only: [:create, :show]
    resources :events, only: [:create, :show, :destroy]
  end

  get '', to: 'static_pages#home', as: 'home'
end

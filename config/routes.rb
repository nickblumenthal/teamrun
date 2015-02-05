Rails.application.routes.draw do
  root 'static_pages#home'
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: { format: :json } do
    resource :user, only: [:new, :create]
    resources :teams, only: [:index, :create, :show, :update, :destroy]
    resources :memberships, only: [:create, :destroy]
    resources :routes, only: [:create, :show]
    resources :events, only: [:create, :show, :destroy]
  end

  get '', to: 'static_pages#home', as: 'home'
end

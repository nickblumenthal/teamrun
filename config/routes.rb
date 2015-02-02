Rails.application.routes.draw do
  root 'static_pages#home'
  resource :user, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  get '', to: 'static_pages#home', as: 'home'
end

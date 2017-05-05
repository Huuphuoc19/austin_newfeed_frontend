Rails.application.routes.draw do
  resources :post, only: [:index]
end

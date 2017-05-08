Rails.application.routes.draw do
  devise_for :users
  resources :posts, only: [:index, :create, :destroy] do
    post 'more', on: :collection
  end

  root to: "posts#index"
end

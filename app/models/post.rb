class Post < ApplicationRecord
  validates :content, presence: true
  belongs_to :user, counter_cache: true

  default_scope -> { order(id: :desc) }
end

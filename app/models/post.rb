class Post < ApplicationRecord
  validates :content, presence: true
  belongs_to :user, counter_cache: true

  default_scope -> { order(id: :desc) }

  scope :more_post, -> (last_id, limit = 30) { where('id < ?', last_id).limit(limit) }

end

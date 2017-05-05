class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    @posts = Post.limit(30)
    @post = Post.new
  end

  def create
    @post = current_user.posts.build(post_params)
    flash[:alert] = 'Content is empty !'
    respond_to do |format|
      format.html
      format.js
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end

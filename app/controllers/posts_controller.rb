class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    @posts = Post.limit(10)
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

  def more
    last_id = params[:id]
    @posts = Post.more_post(last_id, 30)
    json_text = { :name => 'Mike', :age => 70 }.to_json
    respond_to do |format|
      format.html
      render json: @posts
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end

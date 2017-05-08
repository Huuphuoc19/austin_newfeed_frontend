class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    @posts = Post.limit(20)
    @post = Post.new
  end

  def create
    @post = current_user.posts.build({
        content: post_params[:content].strip
      })
    flash[:alert] = 'Content is empty !'
    respond_to do |format|
      format.html
      format.js
    end
  end

  def more
    last_id = params[:id]
    @posts = Post.more_post(last_id, 20)
    respond_to do |format|
      format.html
      render json: @posts
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      @flag = true
    else
      @flag = false
      flash[:alert] = 'Error'
    end
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

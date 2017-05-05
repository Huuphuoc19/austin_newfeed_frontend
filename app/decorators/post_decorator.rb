class PostDecorator < Draper::Decorator
  delegate_all

  def days_created
    object.created_at.strftime('%d')
  end

  def month_created
    object.created_at.strftime('%b')
  end
end

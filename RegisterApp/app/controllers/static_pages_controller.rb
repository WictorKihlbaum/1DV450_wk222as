class StaticPagesController < ApplicationController

  def home
    if logged_in?
      @appregistration = current_user.appregistrations.build
      @feed_items = current_user.feed.paginate(page: params[:page])
    end
  end

end

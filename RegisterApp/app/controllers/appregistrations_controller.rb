class AppregistrationsController < ApplicationController

  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: :destroy

  def create
    @appregistration = current_user.appregistrations.build(appregistration_params)
    if @appregistration.save
      flash[:success] = "Your application has been registered!"
      redirect_to root_url
    else
      @feed_items = []
      render 'static_pages/home'
    end
  end

  def destroy
    @appregistration.destroy
    flash[:success] = "Application deleted"
    redirect_to request.referrer || root_url
  end

  private

  def appregistration_params
    params.require(:appregistration).permit(:content)
  end

  def correct_user
    @appregistration = current_user.appregistrations.find_by(id: params[:id])
    redirect_to root_url if @appregistration.nil?
  end

end
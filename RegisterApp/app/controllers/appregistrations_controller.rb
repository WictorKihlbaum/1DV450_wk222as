class AppregistrationsController < ApplicationController

  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: :destroy
  before_action :admin_user,     only: :destroy # ta bort?

  def create
    @appregistration = current_user.appregistrations.build(appregistration_params)
    if @appregistration.save
      flash[:success] = "Application has been registered!"
      redirect_to root_url
    else
      @feed_items = []
      render 'static_pages/home'
    end
  end

  def destroy
    #@appregistration.destroy
    Appregistration.find(params[:id]).destroy
    flash[:success] = "Application has been deleted"
    redirect_to request.referrer || root_url
  end

  private

  def appregistration_params
    params.require(:appregistration).permit(:content)
  end

  # Before filters

  # Confirms the correct user.
  #def correct_user
   #@user = User.find(params[:id])
    #redirect_to(root_url) unless current_user?(@user)
  #end

  def correct_user
    @appregistration = current_user.appregistrations.find_by(id: params[:id])
    #redirect_to root_url if @appregistration.nil?
  end

  # Confirms an admin user.
  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

end
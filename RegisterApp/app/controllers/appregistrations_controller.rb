class AppregistrationsController < ApplicationController

  before_action :logged_in_user, only: [:create, :destroy]
  before_action :valid_user, only: :destroy

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
    Appregistration.find(params[:id]).destroy
    flash[:success] = "Application has been deleted"
    redirect_to request.referrer || root_url
  end


  private

  def appregistration_params
    params.require(:appregistration).permit(:content)
  end

  # Confirms the correct user.
  def valid_user
    @appregistration = current_user.appregistrations.find_by(id: params[:id])
    redirect_to root_url if @appregistration.nil? unless current_user.admin?
  end

end
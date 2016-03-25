class API::APIController < ActionController::Base

  protect_from_forgery with: :null_session

  OFFSET = 0
  LIMIT = 20

  def offset_params
    if params[:offset].present?
      @offset = params[:offset].to_i
    end

    if params[:limit].present?
      @limit = params[:limit].to_i
    end

    @offset ||= OFFSET
    @limit ||= LIMIT
  end

  def api_authenticate
    # TODO: Implement JWT
    return true
  end

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Token realm="Events"'

    respond_to do |format|
      format.json { render json: 'Bad credentials', status: :unauthorized }
      format.xml { render xml: 'Bad credentials', status: :unauthorized }
    end
  end

end

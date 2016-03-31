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

  def api_key
    api_key = request.headers['X-ApiKey']
    if Appregistration.find_by_apikey(api_key)
      return true
    else
      render json: 'No valid API-key has been passed along this request.',
             status: :unauthorized
    end
  end

  def restrict_access
    authenticate_or_request_with_http_token do |token, options|
      Appregistration.exists?(apikey: token)
    end
  end

  def render_unauthorized
    self.headers['WWW-Authenticate'] = 'Token realm="Events"'

    respond_to do |format|
      format.json { render json: 'Bad credentials', status: :unauthorized }
      format.xml { render xml: 'Bad credentials', status: :unauthorized }
    end
  end

end

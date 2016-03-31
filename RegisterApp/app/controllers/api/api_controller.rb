class API::APIController < ActionController::Base

  protect_from_forgery with: :null_session

  # Errormessages
  NO_VALID_APIKEY = 'No valid API-key has been passed along this request.'
  BAD_CREDENTIALS = 'Bad credentials'

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
      render json: NO_VALID_APIKEY, status: :unauthorized
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
      format.json { render json: BAD_CREDENTIALS, status: :unauthorized }
      format.xml { render xml: BAD_CREDENTIALS, status: :unauthorized }
    end
  end

end

class ApplicationController < ActionController::API
  include ActionController::MimeResponds

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
    # Check that API-key is valid.
    return true
  end

end

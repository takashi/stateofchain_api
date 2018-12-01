class SessionsController < ApplicationController
  def create
    # [TODO] NEED TO CHECK SIGNATURE FOR SECURITY.
    user = User.find_by(email: user_params[:email], pubkey: user_params[:pubkey])
    if user
      login(user)
      redirect_to :root, notice: 'You are successfully logged in.'
    end
  end

  def destroy
    logout
    redirect_back(fallback_location: root_path)
  end

  private

  def user_params
    params.require(:user).permit(:email, :pubkey)
  end
end

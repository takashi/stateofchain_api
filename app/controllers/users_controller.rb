class UsersController < ApplicationController
  # skip_before_action :authenticate_user!, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      redirect_to :root, notice: 'You are successfully signed up.'
    else
      redirect_to :root, flash: { error: 'Your Email has already registered. Please try login.' }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :pubkey)
  end
end

class ProjectsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def show
    @project = Project.find(params[:id])
  end

  def new
    @project = Project.new
  end

  def create
    @project = current_user.projects.new(project_params)
    @project.participants = params[:participants]
    if @project.save
      redirect_to :root, notice: 'Your projet has successfully created.'
    end
  end

  def join
    project = Project.find(project_join_params[:project_id])
    project.project_accounts.create({
      pubkey: project_join_params[:pubkey],
      user: current_user
    })
    redirect_to :root, notice: "You have successfully joined to project #{project.title}!"
  end

  def psbt
    project = Project.find(project_join_params[:project_id])
    project.update({ psbt: params[:psbt] })
    project.started!
    redirect_to project_path(project), notice: "Your project successfully started!"
  end

  def fund
    project = Project.find(project_join_params[:project_id])
    if params[:psbt] == project.psbt
      project.finished!
    else
      project.update({ psbt: params[:psbt] })
    end
    redirect_to project_path(project), notice: "Thank you for backing project #{project.title}!"
  end


  private

  def project_params
    params.require(:project).permit(:title, :description, :deadline, :target_amount) # etc...
  end

  def project_join_params
    params.permit(:pubkey, :project_id)
  end
end

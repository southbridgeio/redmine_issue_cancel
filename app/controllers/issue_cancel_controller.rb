class IssueCancelController < ApplicationController
  # unloadable

  def create
    
    current_user = User.current
    @issue = Issue.visible.find(params[:id])

    
    issue_status = Setting.plugin_redmine_issue_cancel['cancel_issue_statuses']

    @issue.status_id = issue_status
    @issue.assigned_to = current_user
    @issue.save


    @last_journal    = @issue.journals.visible.order('created_on').last

    notes = "Параметр Назначена изменился на #{current_user.name}, Параметр Статус изменился на #{@issue.status.name}"
    @issue.init_journal(current_user, notes.html_safe)
    @issue.save

    if @last_journal.nil?
      redirect_to "#{issue_path(@issue)}"
    else
     
      @last_journal = @issue.journals.visible.order('created_on').last    
    redirect_to "#{issue_path(@issue)}#change-#{@last_journal.id}"
    end
  end
  
end

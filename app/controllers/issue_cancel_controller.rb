class IssueCancelController < ApplicationController
  # unloadable

  def create

    current_user = User.current
    @issue = Issue.visible.find(params[:id])
    issue_old_status = @issue.status.name
    old_user         = @issue.assigned_to


    issue_status = Setting.plugin_redmine_issue_cancel['cancel_issue_statuses']

    @issue.status_id = issue_status
    @issue.assigned_to = current_user if current_user
    @issue.save

    
    @new_journal = @issue.init_journal(current_user)
    @new_journal.save!

    @last_journal    = @issue.journals.visible.order('created_on').last

    JournalDetail.new({
      :property  => 'attr',
      :prop_key  => 'status',
      :old_value => issue_old_status,
      :value     => @issue.status.name,
      :journal   => @new_journal
    }).save!

    JournalDetail.new({
      :property  => 'attr',
      :prop_key  => 'user',
      :old_value => old_user,
      :value     => current_user.name,
      :journal   => @new_journal
    }).save!

    if @last_journal.nil?
      redirect_to "#{issue_path(@issue)}"
    else

      @last_journal = @issue.journals.visible.order('created_on').last
    redirect_to "#{issue_path(@issue)}#change-#{@last_journal.id}"
    end
  end

end

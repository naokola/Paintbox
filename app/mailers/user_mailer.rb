class UserMailer < ApplicationMailer
    def send_mail(name, message_body, recipient, url)
        @user_picture = UserPicture.last
        @message_body = message_body
        @url = url
        if name then
            subj = "#{name} has send you a message through PaintBox!"
        else
            subj = "You've received a message through PaintBox!"
        end
        mail(
            subject: subj,
            to: recipient,
            from: 'no-reply@concrawler.com',
        )
    end

end

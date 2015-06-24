class UserMailer < ApplicationMailer
    def send_mail(message_body, recipient)
        @user_picture = UserPicture.last
        @message_body = message_body
        mail(
            subject: 'Postmark works',
            to: recipient,
            from: 'no-reply@concrawler.com',
            html_body: 'this is the body')
    end

end

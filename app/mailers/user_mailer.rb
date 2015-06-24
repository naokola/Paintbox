class UserMailer < ApplicationMailer
    def send_mail(message_body)
        @user_picture = UserPicture.last
        @message_body = message_body
        mail(
            subject: 'Postmark works',
            to: 'wakelank@gmail.com',
            from: 'no-reply@concrawler.com',
            html_body: 'this is the body')
    end

end

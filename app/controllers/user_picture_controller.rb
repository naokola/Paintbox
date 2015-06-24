require 'base64'

class UserPictureController < ApplicationController
    skip_before_action :verify_authenticity_token

    def save_image
        image = Paperclip.io_adapters.for(params[:image])
        image.original_filename = "user_image#{Time.now.strftime('%Y%m%d-%H%M%S')}.png"
        UserPicture.create(image: image)
        respond_to do |format|
          format.html
          format.json { head :no_content }  
        end

    end

    def mail_form
    end

    def send_mail
        message_body = params[:message_body]
        recipient = params[:email_address]
        UserMailer.send_mail(message_body, recipient).deliver_now

        redirect_to root_url
    end
end

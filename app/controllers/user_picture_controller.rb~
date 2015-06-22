require 'base64'

class UserPictureController < ApplicationController
    skip_before_action :verify_authenticity_token
    def save_image
        #data = params[:data_uri]
        #puts Dir.pwd
        #image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])

        #File.open("/public/images/user_images/userimage.png", 'wb') do |f|
        #    f.write image_data
        #end
        image = Paperclip.io_adapters.for(params[:image])
        image.original_filename = "something.png"
        UserPicture.create(image: image)
        
        redirect_to root_url
    end

    def send_mail
        UserMailer.send_mail.deliver_now

        redirect_to root_url
    end
end

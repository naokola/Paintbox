require 'base64'

class UserPictureController < ApplicationController
    skip_before_action :verify_authenticity_token
    def save_image
        data = params[:data_uri]
        puts Dir.pwd
        image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])

        File.open("/public/images/user_images/userimage.png", 'wb') do |f|
            f.write image_data
        end

    end
end

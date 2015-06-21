class AddAttachmentImageToUserPictures < ActiveRecord::Migration
  def self.up
    change_table :user_pictures do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :user_pictures, :image
  end
end

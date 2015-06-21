class CreateUserPictures < ActiveRecord::Migration
  def change
    create_table :user_pictures do |t|

      t.timestamps null: false
    end
  end
end

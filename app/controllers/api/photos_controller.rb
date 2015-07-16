module Api
  class PhotosController < ApiController
    def new
      @photo = Photo.new
    end

    def index
      @photos = Photo.where(user_id: current_user.id)
    end

    def create
      @photo = current_user.photos.new(photo_params)
      if @photo.save
        render :show
      else
        render json: @photo.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show

    end

    private

    def photo_params
      params.require(:photo).permit(:user_id, :album_id, :description, :title, :image_url)
    end
  end
end
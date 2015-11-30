class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  process resize_to_fit: [100, 100]

  version :small do
    process resize_to_fit: [60, 60]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
    "avatar#{model.id}.#{file.extension}" if original_filename.present?
  end
end

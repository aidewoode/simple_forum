Backend::App.helpers do
  def create_source(type)
    request.body.rewind
    data = JSON.parse request.body.read
    # Use Kernel.const_get to get the specific Const
    Kernel.const_get(type.capitalize).create(data['data']['attributes'])
  end

  def update_source(item)
    request.body.rewind
    data = JSON.parse request.body.read
    item.update(data['data']['attributes'])
  end
end

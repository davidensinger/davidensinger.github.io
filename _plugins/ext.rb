module Jekyll
  # Makes the blog tag urls "pretty" instead of /tag.html its just /tag/
  # This allows me to keep a custom permalink setting for blog posts
  Filters::PRETTY_URL = true
  class TagPage; def template; '/:basename/' end end
end
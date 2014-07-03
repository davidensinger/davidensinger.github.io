module Jekyll

  class CategoryPage < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'group_index.html')
      self.data['category'] = category

      self.data['title'] = "#{category}"
      self.data['grouptype'] = 'category'
    end
  end

  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'group_index'
        dir = 'category'
        site.categories.keys.each do |category|
          site.pages << CategoryPage.new(site, site.source, File.join(dir, category.gsub(/\s+/, '-')), category)
        end
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'group_index.html')
      self.data['tag'] = tag

      self.data['title'] = "#{tag}"
      self.data['grouptype'] = 'tag'
    end
  end

  class TagPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'group_index'
        dir = 'tag'
        site.tags.keys.each do |tag|
          site.pages << TagPage.new(site, site.source, File.join(dir, tag.gsub(/\s+/, '-')), tag)
        end
      end
    end
  end

end
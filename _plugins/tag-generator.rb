module Jekyll

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

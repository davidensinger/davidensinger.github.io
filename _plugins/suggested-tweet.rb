# Suggested Tweet Tag
#
# A Liquid tag for Jekyll that allows for the embedding of suggested tweets,
# via Twitter’s Web Intents API and @richhollis’s Twitter Web Intents Ruby Gem.
#
# Author: David Ensinger
# Site: http://davidensinger.com
# Twitter: @DavidEnsinger
# Email: hello@davidensinger.com
# Source: Forthcoming
#
# A big thanks to Rich Hollis’s Twitter Web Intents Ruby Gem upon which this plugin is based.
# Source: https://github.com/richhollis/twitter_web_intents
#
# Default Configuration:
# The following parameters may be set globally in _config.yml or on a per page basis in the YAML front-matter.
# Parameters set in the YAML front-matter take precedence over those set in _config.yml. Note that all parameters
# are optional. By default, the inheritance of global parameters (default_inheritance in _config.yml) is set to true.
#
#   suggested_tweet:
#     url:                  'http://davidensinger.com/'
#     via:                  'davidensinger'
#     text:                 'Hello world'
#     in_reply_to:          331434728957833218
#     hashtags:             ['Jekyll', 'Twitter']
#     related:              ['davidensinger', 'richhollis']
#     container_tag:        'span'
#     container_class:      'tweet-container'
#     anchor_class:         'tweet-link'
#     default_inheritance:  true
#     inline_inheritance:   false
#
# Default Usage:
#   {% suggested_tweet %}
#
# Default Output:
#   <span class="tweet-container"><a href="https://twitter.com/intent/tweet?hashtags=Jekyll,Twitter&in_reply_to=331434728957833218&related=davidensinger,richhollis&text=Hello+world&url=http%3A%2F%2Fdavidensinger.com&via=davidensinger" class="suggested-tweet">Hello world</a></span>
#
# Inline Configuration:
# The tag also accepts inline parameters. By default, the inheritance of global parameters (inline_inheritance in _config.yml) is set to false.
# Note that tags that include parameters inline inherit nothing from parameters set in the YAML front-matter of the page.
#
# Inline Usage:
#   {% suggested_tweet container_tag:'span' container_class:'tweet-container' anchor_class:'tweet-link' url:'http://davidensinger.com/' via:'davidensinger' text:'Hello world' in_reply_to:331434728957833218 hashtags:['Jekyll', 'Twitter'] related:['davidensinger', 'richhollis'] %}
#
# Inline Output:
#   <span class="tweet-container"><a href="https://twitter.com/intent/tweet?hashtags=Jekyll,Twitter&in_reply_to=331434728957833218&related=davidensinger,richhollis&text=Hello+world&url=http%3A%2F%2Fdavidensinger.com&via=davidensinger" class="suggested-tweet">Hello world</a></span>

# https://dev.twitter.com/docs/intents
# http://jekyllrb.com/docs/plugins/#tags
# https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
# https://github.com/ericdfields/Jekyll-Dribbble-Set-Tag/blob/master/_plugins/dribbble_set.rb (for _config.yml stuff)
# https://github.com/nicolashery/nicolashery.com/blob/master/_plugins/image_tag.rb
# https://github.com/richhollis/twitter_web_intents

require 'twitter_web_intents'

module Jekyll #maybe don't include this in Jekyll module? http://blog.darkrefraction.com/2012/jekyll-excerpt-plugin.html

  class SuggestedTweet < Liquid::Tag

    def initialize(tag_name, config, tokens)
      super

      # http://stackoverflow.com/questions/11410611/get-jekyll-configuration-inside-plugin#answer-11448879
      @config = Jekyll.configuration({})['suggested_tweet'] || {}

      # Maybe helps with getting parameters from YAML front-matter: page.data['']
      # https://github.com/vimberlin/vimberlin.de/blob/master/_plugins/location_tag.rb
      # https://github.com/stroan/Website/blob/273a55d998e0b656a3dedce85cad04b46e26d108/_plugins/projects.rb
      # http://realjenius.com/2012/11/04/jekyll-series-list-2/
      # http://simon.heimlicher.com/articles/2012/02/01/jekyll-directory-listing

      @url                       ||= @config['url']
      @via                       ||= @config['via']
      @text                      ||= @config['text']
      @in_reply_to               ||= @config['in_reply_to']
      @hashtags                  ||= @config['hashtags']
      @related                   ||= @config['related']
      @container_tag             ||= @config['container_tag']
      @container_class           ||= @config['container_class']
      @anchor_class              ||= @config['anchor_class']

      @default_inheritance       ||= @config['default_inheritance']
      @default_inheritance       ||= true

      @inline_inheritance        ||= @config['inline_inheritance']
      @inline_inheritance        ||= false

    end

    def render(context)

    end
  end

end

Liquid::Template.register_tag('suggested_tweet', Jekyll::SuggestedTweet)

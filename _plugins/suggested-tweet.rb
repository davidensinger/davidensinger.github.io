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
# https://github.com/richhollis/twitter_web_intents

require 'twitter_web_intents'

module Jekyll

  class SuggestedTweet < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      "#{@text}"
    end
  end

end

Liquid::Template.register_tag('suggested_tweet', Jekyll::SuggestedTweet)

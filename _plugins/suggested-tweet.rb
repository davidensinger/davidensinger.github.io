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
# Configuration:
# The following parameters may be set globally in _config.yml or on a per page basis in the YAML front-matter.
# All are optional. Parameters set in the YAML front-matter take precedence over those set in _config.yml.
#
#   suggested_tweet:
#     url:                 'http://davidensinger.com/'
#     via:                 'davidensinger'
#     text:                'Hello world'
#     in_reply_to:         331434728957833218
#     hashtags:            ['Jekyll', 'Twitter']
#     related:             ['davidensinger', 'richhollis']
#     inline_inheritance:  false
#
# Default usage:
#   {% suggested_tweet %}
#
# Inline configuration:
# The tag also accepts inline parameters. The inheritance of global variables (inline_inheritance) is set to false by default.
#
# Inline usage:
#   {% suggested_tweet url:'http://davidensinger.com/' via:'davidensinger' text:'Hello world' in_reply_to:331434728957833218 hashtags:['Jekyll', 'Twitter'] related:['davidensinger', 'richhollis'] %}
#

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

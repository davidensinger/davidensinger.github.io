# Suggested Tweet Tag
#
# A Liquid tag for Jekyll that allows for the embedding of suggested tweets,
# via Twitter’s Web Intents API and @richhollis’s Twitter Web Intents Ruby Gem.
#
# Authors: David Ensinger and John Colvin
# Site: http://davidensinger.com/ and http://2john4tv.biz/
# Twitter: @DavidEnsinger and @2john4tv
# Email: hello@davidensinger.com and 2john4tv@gmail.com
# Source: https://github.com/davidensinger/suggested-tweet
#
# Really John did all the Ruby work. I just bought him pizza and told him what I wanted :)
#
# A big thanks to Rich Hollis’s Twitter Web Intents Ruby Gem upon which this plugin is based.
# Source: https://github.com/richhollis/twitter_web_intents
#
# Please note that you’ll need to install the Twitter Web Intents gem as it’s required.
#
# Configuration:
#
# The following parameters may be set globally in _config.yml or on a per page basis in the YAML front-matter.
# Parameters set in the YAML front-matter take precedence over those set in _config.yml. Note that all parameters
# are optional.
#
#   suggested_tweet:
#     url:                  'http://davidensinger.com/'
#     via:                  'davidensinger'
#     text:                 'Hello world'
#     in_reply_to:          331434728957833218
#     hashtags:             ['Jekyll', 'Twitter']
#     related:              ['davidensinger', 'richhollis', '2john4tv']
#
# Usage:
#   {% suggested_tweet %}
#
# Output:
#   https://twitter.com/intent/tweet?hashtags=Jekyll,Twitter&in_reply_to=331434728957833218&related=davidensinger,richhollis,2john4tv&text=Hello+world&url=http%3A%2F%2Fdavidensinger.com&via=davidensinger
#
# Liquid Output for Parameters (with the text parameter as an example):
#    _config.yml: {{ site.suggested_tweet.text }}
#    YAML front matter: {{ page.suggested_tweet.text }}
#

require 'twitter_web_intents'

module Jekyll

  class SuggestedTweet < Liquid::Tag

    def render(context)
      # twitter_param_keys = %w{ url via text in_reply_to hashtags related }
      # twitter_params = config(context).select{ |key, value| twitter_param_keys.include?(key) }
      twitter_params = config(context)

      # convert keys from strings to symbols....grrrr
      twitter_params = twitter_params.inject({}){|p,(k,v)| p[k.to_sym] = v; p}

      TwitterWebIntents.get_tweet_url(twitter_params)
    end

    private

    def frontmatter_config(context)
      context.environments.first['page']['suggested_tweet'] || {}
    end

    def config(context)
      global = Jekyll.configuration({ 'suggested_tweet' => frontmatter_config(context) })
      global['suggested_tweet'] || {}
    end
  end

end

Liquid::Template.register_tag('suggested_tweet', Jekyll::SuggestedTweet)

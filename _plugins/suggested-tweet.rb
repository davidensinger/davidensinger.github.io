# A Liquid tag for Jekyll that allows for the embedding of suggested tweets.
#
# Author: David Ensinger
# Source URL: Forthcoming
#
# Example usage:
#   {% suggested_tweet %}
#
# Documentation:
#   Forthcoming
#

# Functionality
# • Only Tweet or Reply to a Tweet (see Intents docs)
# • Appends supported parameters (url, via, text, in_reply_to, hashtags, and related)
# • Global variables for supported parameters are found in _config.yml, but per post variables may be defined in post's YAML front matter.
# • JavaScript is optional
# • Count characters to stay under 140 character limit? Not sure how.

# https://dev.twitter.com/docs/intents
# http://jekyllrb.com/docs/plugins/#tags
# http://jekyllrb.com/docs/templates/#filters
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

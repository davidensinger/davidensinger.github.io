module MyFilters
	def expand_urls(input, url='')
		url ||= '/'
		input.gsub /(\s+(href|src)\s*=\s*["|']{1})(\/[^\"'>]*)/ do
			$1+url+$3
		end
	end

  # Returns a title cased string based on John Gruber's title case http://daringfireball.net/2008/08/title_case_update
   def titlecase(input)
     input.titlecase
   end
end
Liquid::Template.register_filter MyFilters
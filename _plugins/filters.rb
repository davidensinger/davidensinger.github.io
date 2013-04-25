module MyFilters
	def expand_urls(input, url='')
		url ||= '/'
		input.gsub /(\s+(href|src)\s*=\s*["|']{1})(\/[^\"'>]*)/ do
			$1+url+$3
		end
	end
end

Liquid::Template.register_filter MyFilters
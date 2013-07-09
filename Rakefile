desc "Deploy website to davidensinger.github.io"
task :deploy do
  system "git branch -D master"
  system "git checkout -b master"
  system "git filter-branch --subdirectory-filter _site/ -f"
  system "git checkout source"
  system "git push --all origin"
end

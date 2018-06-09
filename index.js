function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(this.responseText)

  // let repoList = '<ul>'
  // for(var i=0; i < repos.length; i++) {
  //   repoList += "<li>" + repos[i]["name"] + "</li>"
  // }
  // repoList += "</ul>"

  const repoList = `<ul>${repos.map(r=> '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`

  document.getElementById('repositories').innerHTML = repoList
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}


function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener('load', showRepositories)
  req.open('GET', 'https://api.github.com/users/blevm/repos')
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener('load', showCommits)
  req.open('GET', 'https://api.github.com/repos/blevm/' + name + '/commits')
  req.send()
}

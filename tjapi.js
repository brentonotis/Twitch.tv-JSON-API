let streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let urlStreams = "https://wind-bow.gomix.me/twitch-api/streams/";
let urlUsers = "https://wind-bow.gomix.me/twitch-api/users/";
let onlineWindow = document.getElementById('online');
let offlineWindow = document.getElementById('offline');
let onlineBtn = document.getElementById('onBtn');
let offlineBtn = document.getElementById('offBtn');
let allBtn = document.getElementById('all-btn');
let streamersOffline = [];

/* Make Get Requests */
getData = function (url, callback) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      callback(response);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

/* Make URLs to get streaming data */
function getStreams() {
  let stream = '';
  for (var i = 0; i < streamers.length; i++) {
    stream = urlStreams + streamers[i];
    getData(stream, checkOnline);
  }
}

function checkOnline(data) {
  if (data.stream == null) {
    /* If the user is offline push user name to offlineChannels array*/
    streamersOffline.push(data._links.self.slice(37 - self.length));
    getUsers();
  } else {
    onlineWindow.innerHTML += '<div class="online-box"><div class="box-text"><div><a href="' + data.stream.channel.url + '" target="_blank" ><img src="' + data.stream.channel.logo + '" alt="Channel Logo"></a><div class="status-circle online-color"></div></div><div><h3>' + data.stream.channel.display_name + '</h3><p>Streaming: ' + data.stream.game + '</p></div></div></div>';
  }
}
getStreams();

/* Use URLs to get which users that are online */
function getUsers() {
  let users = '';
  /* With new array make URLs to get offline user's data */
  users = urlUsers + streamersOffline.pop();
  getData(users, showUsers);
}

function showUsers(data) {
  offlineWindow.innerHTML += '<div class="offline-box"><div class="box-text"><div><a href="https://www.twitch.tv/' + data.display_name + '" target="_blank"><img src="' + data.logo + '"></a><div class="status-circle offline-color"></div></div><div><h3>' + data.display_name + '</h3><p>Currently Offline.</p></div></div>';
}

/* Hide offline channels when online button is clicked */
onlineBtn.addEventListener("click", hideOffline);
function hideOffline() {
  offlineWindow.classList.add("hidden");
  onlineBtn.classList.add("active");
  onlineWindow.classList.remove("hidden");
  allBtn.classList.remove("active");
  offlineBtn.classList.remove("active");
}
/* Hide online channels when offline button is clicked */
offlineBtn.addEventListener("click", hideOnline);
function hideOnline() {
  offlineBtn.classList.add("active");
  onlineWindow.classList.add("hidden");
  offlineWindow.classList.remove("hidden");
  allBtn.classList.remove("active");
  onlineBtn.classList.remove("active");
}
/* Display All Channels */
allBtn.addEventListener("click", showAll);
function showAll(){
  allBtn.classList.add("active");
  onlineWindow.classList.remove("hidden");
  offlineWindow.classList.remove("hidden");
  offlineBtn.classList.remove("active");
  onlineBtn.classList.remove("active");
}

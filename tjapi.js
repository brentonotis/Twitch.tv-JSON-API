let onlineWindow = document.getElementById('online');
let offlineWindow = document.getElementById('offline');
let onlineBtn = document.getElementById('onBtn');
let offlineBtn = document.getElementById('offBtn');
let allBtn = document.getElementById('all-btn');
let streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let urlStreams = "https://wind-bow.gomix.me/twitch-api/streams/";
let urlUsers = "https://wind-bow.gomix.me/twitch-api/users/";
let streamersOffline = [];

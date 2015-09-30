module.exports = function(event, done) {

  return Hoist.bucket.set('default').then(function() {
  
    var slack = Hoist.connector('slack');

    var message = {
      channel: "#tweets",
      username: 'twitter',
      icon_url: 'https://slack.global.ssl.fastly.net/66f9/img/services/twitter_48.png',
      message: "https://twitter.com/" + event.payload.user.screen_name + "/status/" + event.payload.id_str,
      attachments: []
    };
    message.attachments.push(twitterAttachment(event.payload));
    message.attachments.push(tweeterAttachment(event.payload.user));

    /* slack api requires attachments to be stringified */
    message.attachments = JSON.stringify(message.attachments);
    
    Hoist.log(message);

    return slack.get('/chat.postMessage', message);
    

  })
  .catch(function(err) {

    return Hoist.log(err.message);

  });

};

var twitterAttachment = function(tweet) {

  var attachment = {
    author_name: tweet.user.name,
    author_subname: "@" + tweet.user.screen_name,
    author_link: "https://twitter.com/" + tweet.user.screen_name,
    author_icon: tweet.user.profile_image_url_https,
    text: tweet.text,
    color: "#0096EE",
    fallback: "New tweet from @" + tweet.user.name
  };
  return attachment;

};

var tweeterAttachment = function(tweeter) {

  var attachment = {
    color: "#e3e4e6",
    text: "User info for " + tweeter.name,
    fields: [
      {
        title: "Description",
        value: tweeter.description,
        short: false
      },
      {
        title: 'Followers',
        value: tweeter.followers_count,
        short: true
      },
      {
        title: 'Following You',
        value: tweeter.following ? "Yes" : "No",
        short: true
      }
    ]
  };
  return attachment;

};